import '/imports/client/datepicker/bootstrap-datepicker.js';
import '/imports/client/datepicker/bootstrap-datepicker.pt-BR.min.js';
import '/imports/client/datepicker/bootstrap-datepicker.es.min.js';
import '/imports/client/datepicker/datepicker3.css';


Template['datePickerOverride'].replaces('afBootstrapDatepicker');

/*****************************************************************************/
/* PatientForm: Event Handlers */
/*****************************************************************************/
Template.patientForm.events({
	'click .new-user': (event, template) => {
		FlowRouter.go('createPatient');
	}
});

window.gambiarra_scope = null;

/*****************************************************************************/
/* PatientForm: Helpers */
/*****************************************************************************/
Template.patientForm.helpers({
	saveButton: function () {
		return Spacebars.SafeString('<i class="fa fa-floppy-o" aria-hidden="true"></i> ' + TAPi18n.__('common_save'));
	},
	isEditForm: function() {
		return (FlowRouter.getParam('_id')) ? true : false;
	},
	patient: function() {
		Template.patientForm.data = Patients.findOne({_id: FlowRouter.getParam('_id')}); 
		return Template.patientForm.data;
	},
	runUxAdjustments: function(){
		gambiarra_scope = Template.patientForm.data; //#TODO: arrumar isso urgente!!!!!
		setTimeout( 'uxAdjustments.call(gambiarra_scope)', 500 );
	}
});

/*****************************************************************************/
/* PatientForm: Lifecycle Hooks */
/*****************************************************************************/
Template.patientForm.onCreated(function () {
	AutoForm.addHooks('insertPatientForm', {
		onSuccess: function(formType, result) {
			toastr['success'](TAPi18n.__('common_save-success'), TAPi18n.__('common_success'));
			FlowRouter.go('listPatients');
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
	//uxAdjustments.call(this);  //#TODO: arrumar isso urgente!!!!!
});

Template.patientForm.onDestroyed(function () {
});


uxAdjustments = function(){
	$('input[name=zip]').parent().before('<div class="hr-line-dashed"></div>');
	$('textarea[name=obs]').parent().before('<div class="hr-line-dashed"></div>');


	var submitParent = $('.patient-form button[type=submit]').parent();
	submitParent.addClass('text-right');
	if(this._id) {
		var deleteBtn = $.parseHTML('<button class="btn btn-danger delete-btn" type="button"><i class="fa fa-trash" aria-hidden="true"></i></button>');
		$(deleteBtn).prependTo(submitParent);
		
		var self = this;
		$(deleteBtn).click(function(event){
			var patient = Patients.findOne(self._id);
			swal({
				title: TAPi18n.__('common_areYouSure'),
				text: TAPi18n.__('patients_deleteConfirmation', patient.name),
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#ed5565",
				confirmButtonText: TAPi18n.__('common_confirm')
			}, function(){
				Patients.remove(self._id, function (error, result) {
					if (error) {
						toastr['error'](error.message, TAPi18n.__('common_error'));
					} 
					else {
						toastr['success'](TAPi18n.__('common_deleteSuccess'), TAPi18n.__('common_success'));
					}
				});
				FlowRouter.go('listPatients');
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
};