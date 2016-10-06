import '/imports/client/datepicker/bootstrap-datepicker.js';
import '/imports/client/datepicker/bootstrap-datepicker.pt-BR.min.js';
import '/imports/client/datepicker/bootstrap-datepicker.es.min.js';
import '/imports/client/datepicker/datepicker3.css';

/*****************************************************************************/
/* PatientForm: Event Handlers */
/*****************************************************************************/
Template.patientForm.events({
});

/*****************************************************************************/
/* PatientForm: Helpers */
/*****************************************************************************/
Template.patientForm.helpers({
});

/*****************************************************************************/
/* PatientForm: Lifecycle Hooks */
/*****************************************************************************/
Template.patientForm.onCreated(function () {
});

Template.patientForm.onRendered(function () {
	$('input[name=createdAt], input[name=dateOfBirth]')
		.wrap('<div class="input-group date"></div>')
		.after('<span class="input-group-addon"><i class="fa fa-calendar"></i></span>');

	$('.input-group.date').datepicker({
		format: "dd/mm/yyyy",
		language: TAPi18n.getLanguage(),
		autoclose: true,
		todayHighlight: true
	});
});

Template.patientForm.onDestroyed(function () {
});
