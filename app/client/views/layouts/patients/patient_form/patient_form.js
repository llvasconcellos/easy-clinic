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
	$('input[name=createdAt], input[name=dateOfBirth]').datepicker({
		format: "dd/mm/yyyy",
		language: TAPi18n.getLanguage()
	});


/*
<div class="input-group date">
  <input type="text" class="form-control"><span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span>
</div>
$('#sandbox-container .input-group.date').datepicker({
    format: "dd/mm/yyyy",
    language: "pt-BR"
});*/



});

Template.patientForm.onDestroyed(function () {
});
