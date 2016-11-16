import '/imports/client/datepicker/bootstrap-datepicker.js';
import '/imports/client/datepicker/bootstrap-datepicker.pt-BR.min.js';
import '/imports/client/datepicker/bootstrap-datepicker.es.min.js';
import '/imports/client/datepicker/datepicker3.css';

Template['datePickerOverride'].replaces('afBootstrapDatepicker');

var eventId = null;
var encounter = null;

var toggleStartBtnState = function(){
	var btn = $('.start-appointment');
	btn.toggleClass('btn-success btn-danger');
	btn.find('i').toggleClass('fa-play fa-stop');
	var text = btn.find('strong').text();
	var html = btn.find('strong').html();
	if(text.trim() == TAPi18n.__('patients_start-appointment')){
		html = html.replace(TAPi18n.__('patients_start-appointment'), TAPi18n.__('patients_finish-appointment'));
	} else {
		html = html.replace(TAPi18n.__('patients_finish-appointment'), TAPi18n.__('patients_start-appointment'));
	}
	btn.find('strong').html(html);
};

Template.patientForm.events({
	'click .new-record': (event, template) => {
		FlowRouter.go('patientCreate');
	},
	'click .start-appointment': (event, template) => {
		var btn = $(event.currentTarget);
		var text = btn.find('strong').text();
		if(text.trim() == TAPi18n.__('patients_start-appointment')){
			startEncounter(template);
		} else {
			stopEncounter(template);
		}
		toggleStartBtnState();
	}
});

Template.patientForm.helpers({
	saveButton: function () {
		return Spacebars.SafeString('<i class="fa fa-floppy-o" aria-hidden="true"></i> ' + TAPi18n.__('common_save'));
	},
	isEditForm: function() {
		Template.instance().data.isEditForm = (FlowRouter.getParam('_id')) ? true : false;
		return Template.instance().data.isEditForm;
	},
	patient: function() {
		var record = Patients.findOne({_id: FlowRouter.getParam('_id')});
		Template.instance().data.patient = record;
		return record;
	}
});

var setAlertBeforeLeavePage = function(){
	$(window).on('beforeunload', function(){
	  return TAPi18n.__('patient_encounter-leave-confirmation');
	});

	Session.set('unsavedChanges', true);
	preventRouteChange = function(targetContext) {
		if (Session.get('unsavedChanges')) {
			alert(TAPi18n.__('patient_encounter-leave-confirmation'));
			return true;
		}
		return false;
	}
};

var data = {};

var startEncounter = function(){
	eventId = FlowRouter.current().queryParams.eventId;

	Encounters.insert({
		patient: {
			_id: data.patient._id,
			name: data.patient.name
		},
		start: new Date(),
		user: {
			_id: Meteor.userId(),
			name: Meteor.user().profile.firstName + ' ' + Meteor.user().profile.lastName
		}
	}, function(error, result){
		if (error) {
			toastr['error'](error.message, TAPi18n.__('common_error'));
		}
		if(result){
			encounter = result;
			var btn = $('.start-appointment');
			var text = btn.find('strong').text();
			if(text.trim() == TAPi18n.__('patients_start-appointment')){
				toggleStartBtnState();
			}
			Schedule.update(eventId, 
				{$set:{status: 'attending'}}, function(error, result){
				if (error) {
					toastr['error'](error.message, TAPi18n.__('common_error'));
				}
				if(result){
					FlowRouter.setQueryParams({start_encounter: null, eventId: null});
					setAlertBeforeLeavePage();
				}
			});
		}
	});
};

var stopEncounter = function(){
	Encounters.update(encounter, {$set: {
		end: new Date(),
	}}, function(error, result){
		if (error) {
			toastr['error'](error.message, TAPi18n.__('common_error'));
		}
		if(result){
			Schedule.update(eventId, 
				{$set:{status: 'finished'}}, function(error, result){
				if (error) {
					toastr['error'](error.message, TAPi18n.__('common_error'));
				}
			});
			Session.set('unsavedChanges', false);
			$(window).off('beforeunload');
		}
	});
};

Template.patientForm.onCreated(function () {
	var self = this;
	this.autorun(function() {
		var record = Patients.findOne({_id: FlowRouter.getParam('_id')});
		data.patient = record;
		setTimeout(function(){
			if(data.patient) {
				var createdAt = $('.createdAt');
				if(createdAt.length == 0){
					$('input[data-id=picture-form-group]').parent()
						.append(`<div class="createdAt">
							${TAPi18n.__('schemas.patients.createdAt.label')}: ${moment(data.patient.createdAt).format('DD/MM/YYYY')}
						</div>`);
				}
				else {
					createdAt.html(`${TAPi18n.__('schemas.patients.createdAt.label')}: ${moment(data.patient.createdAt).format('DD/MM/YYYY')}`);
				}
			}
			if(FlowRouter.current().queryParams.start_encounter){
				startEncounter(this);
			}
		}, 1000);
	});

	AutoForm.addHooks('insertPatientForm', {
		onSuccess: function(formType, result) {
			toastr['success'](TAPi18n.__('common_save-success'), TAPi18n.__('common_success'));
			FlowRouter.go('patientList');
		},
		onError: function(formType, error) {
			toastr['error'](error.message, TAPi18n.__('common_error'));
		}
	});
});

Template.patientForm.onRendered(function () {
	$(document).ready(function(){		
		$('input[name=zip]').parent().before('<div class="hr-line-dashed"></div>');
		$('textarea[name=obs]').parent().before('<div class="hr-line-dashed"></div>');

		var submitParent = $('.patient-form button[type=submit]').parent();
		submitParent.addClass('text-right').css('display', 'block');

		var cancelBtn = $.parseHTML(`<button type="button" class="btn btn-white cancel" data-dismiss="modal">
										<i class="fa fa-ban" aria-hidden="true"></i> ${TAPi18n.__('common_cancel')}
									</button>`);
		$(cancelBtn).prependTo(submitParent);

		$(cancelBtn).click(function(){
			FlowRouter.go('patientList');
		});

		if(FlowRouter.getParam('_id')) {
			var deleteBtn = $.parseHTML(`<button class="btn btn-danger delete-btn" type="button">
											<i class="fa fa-trash" aria-hidden="true"></i>
										</button>`);

			$(deleteBtn).prependTo(submitParent);

			$(deleteBtn).click(function(event) {
				var patient = Patients.findOne(data.patient._id);
				swal({
					title: TAPi18n.__('common_areYouSure'),
					text: TAPi18n.__('common_deleteConfirmation', data.patient.name),
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#ed5565",
					confirmButtonText: TAPi18n.__('common_confirm')
				}, function(){
					Patients.remove(data.patient._id, function (error, result) {
						if (error) {
							toastr['error'](error.message, TAPi18n.__('common_error'));
						} 
						else {
							toastr['success'](TAPi18n.__('common_deleteSuccess'), TAPi18n.__('common_success'));
							FlowRouter.go('patientList');
						}
					});
				});
			});
		}

		// $('.input-group.date').datepicker({
		// 	format: "dd/mm/yyyy",
		// 	//format: "mm/dd/yyyy",
		// 	language: TAPi18n.getLanguage(),
		// 	autoclose: true,
		// 	todayHighlight: true
		// });

		// #TODO: make this international
		$('.input-group.date input').mask('00/00/0000');

		$('textarea[name=obs]')
			.css('display', 'block')
			.css('width', '100%')
			.parent()
				.css('display', 'block')
			.find('label')
				.css('display', 'inline-block')
				.css('max-width', '100%')
				.css('margin-bottom', '5px');

		$('input[type=checkbox]').addClass('i-checks').iCheck({
			checkboxClass: 'icheckbox_square-green'
		});

		$('input[name=zip]').blur(function(event){
			$.ajax({
				url: "https://viacep.com.br/ws/" + event.target.value + "/json/unicode/",
			})
			.done(function( data ) {
				$('input[name=streetAddress_1]').val(data.logradouro);
				$('input[name=streetAddress_2]').val(data.complemento);
				$('input[name=bairro]').val(data.bairro);
				$('input[name=city]').val(data.localidade);
				$('input[name=state]').val(data.uf);
			});
		});
	});
});

Template.patientForm.onDestroyed(function () {
	AutoForm.resetForm('insertPatientForm');
});