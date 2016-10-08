import '/imports/client/datepicker/bootstrap-datepicker.js';
import '/imports/client/datepicker/bootstrap-datepicker.pt-BR.min.js';
import '/imports/client/datepicker/bootstrap-datepicker.es.min.js';
import '/imports/client/datepicker/datepicker3.css';

/*****************************************************************************/
/* PatientForm: Event Handlers */
/*****************************************************************************/
Template.patientForm.events({
	'click .new-user': function (event, template) {
		Router.go('createPatient');
	}
});

window.gambiarra_scope = null;

/*****************************************************************************/
/* PatientForm: Helpers */
/*****************************************************************************/
Template.patientForm.helpers({
	saveButton: function () {
		return TAPi18n.__('common_save');
	},
	isEditForm: function() {
		return (this._id) ? true : false;
	},
	runUxAdjustments: function(){
		gambiarra_scope = this; //#TODO: arrumar isso urgente!!!!!
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
			Router.go('listPatients');
		},
		onError: function(formType, error) {
			toastr['error'](error.message, TAPi18n.__('common_error'));
		}
	});
});

Template.patientForm.onRendered(function () {
	//uxAdjustments.call(this);  //#TODO: arrumar isso urgente!!!!!
});

Template.patientForm.onDestroyed(function () {
});


uxAdjustments = function(){
	console.log(this);
	var submitParent = $('.patient-form button[type=submit]').parent();
	submitParent.css('float', 'right');
	console.log(submitParent);
	if(this._id) {
		var deleteBtn = $.parseHTML('<button class="btn btn-danger delete-btn" type="button"><i class="fa fa-trash" aria-hidden="true"></i></button>');
		$(deleteBtn).prependTo(submitParent);
		
		var self = this;
		$(deleteBtn).click(function(event){
			var patient = Patients.findOne(self.data._id);
			swal({
				title: TAPi18n.__('common_areYouSure'),
				text: TAPi18n.__('patients_deleteConfirmation', patient.name),
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#ed5565",
				confirmButtonText: "Yes, delete it!",
				closeOnConfirm: false
			}, function(){
				Patients.remove(self.data._id, function (error, result) {
					if (error) {
						console.log(error);
						toastr['error'](error.message, TAPi18n.__('common_error'));
					} 
					else {
						console.log(result);
						toastr['success'](result, TAPi18n.__('common_success'));
					}
				});
				Router.go('listPatients');
			});
		});
	}
	

	$('input[name=createdAt], input[name=dateOfBirth]')
		.wrap('<div class="input-group date"></div>')
		.after('<span class="input-group-addon"><i class="fa fa-calendar"></i></span>');

	$('.input-group.date').datepicker({
		format: "dd/mm/yyyy",
		//format: "mm/dd/yyyy",
		language: TAPi18n.getLanguage(),
		autoclose: true,
		todayHighlight: true
	});

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
};