import '/imports/client/datepicker/bootstrap-datepicker.js';
import '/imports/client/datepicker/bootstrap-datepicker.pt-BR.min.js';
import '/imports/client/datepicker/bootstrap-datepicker.es.min.js';
import '/imports/client/datepicker/datepicker3.css';

Template['datePickerOverride'].replaces('afBootstrapDatepicker');

Template.patientForm.events({
	'click .new-record': (event, template) => {
		FlowRouter.go('patientCreate');
	}
});

Template.patientForm.helpers({
	saveButton: function () {
		return Spacebars.SafeString('<i class="fa fa-floppy-o" aria-hidden="true"></i> ' + TAPi18n.__('common_save'));
	},
	isEditForm: function() {
		return (FlowRouter.getParam('_id')) ? true : false;
	},
	patient: function() {
		var record = Patients.findOne({_id: FlowRouter.getParam('_id')});
		Template.instance().data.patient = record;
		return record;
	}
});

Template.patientForm.onCreated(function () {
	AutoForm.addHooks('insertPatientForm', {
		onSuccess: function(formType, result) {
			toastr['success'](TAPi18n.__('common_save-success'), TAPi18n.__('common_success'));
			FlowRouter.go('patientList');
		},
		onError: function(formType, error) {
			toastr['error'](error.message, TAPi18n.__('common_error'));
		},
		// docToForm: function(doc) {
		// 	doc.createdAt = moment(doc.createdAt).format('DD/MM/YYYY');
		// 	return doc;
		// },
		// formToDoc: function(doc) {
		// 	doc.createdAt = moment(doc.createdAt, "DD-MM-YYYY");
		// 	return doc;
		// }
	});
});

Template.patientForm.onRendered(function () {
	var self = this;
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
				var patient = Patients.findOne(self.data.patient._id);
				swal({
					title: TAPi18n.__('common_areYouSure'),
					text: TAPi18n.__('common_deleteConfirmation', self.data.patient.name),
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#ed5565",
					confirmButtonText: TAPi18n.__('common_confirm')
				}, function(){
					Patients.remove(self.data.patient._id, function (error, result) {
						if (error) {
							toastr['error'](error.message, TAPi18n.__('common_error'));
						} 
						else {
							toastr['success'](TAPi18n.__('common_deleteSuccess'), TAPi18n.__('common_success'));
						}
					});
					FlowRouter.go('patientList');
				});
			});
		}
		

		// $('input[name=createdAt], input[name=dateOfBirth]')
		// 	.wrap('<div class="input-group date"></div>')
		// 	.after('<span class="input-group-addon"><i class="fa fa-calendar"></i></span>');

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

Template.patientForm.onDestroyed(function () {});