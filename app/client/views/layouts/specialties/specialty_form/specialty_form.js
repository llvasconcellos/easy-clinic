/*****************************************************************************/
/* SpecialtyForm: Event Handlers */
/*****************************************************************************/
Template.specialtyForm.events({
	'click .new-user': function (event, template) {
		FlowRouter.go('createSpecialty');
	}
});

/*****************************************************************************/
/* SpecialtyForm: Helpers */
/*****************************************************************************/
Template.specialtyForm.helpers({
	saveButton: function () {
		return Spacebars.SafeString('<i class="fa fa-floppy-o" aria-hidden="true"></i> ' + TAPi18n.__('common_save'));
	},
	isEditForm: function() {
		return (FlowRouter.getParam('_id')) ? true : false;
	},
	specialty: function() {
		Template.specialtyForm.data = Specialties.findOne({_id: FlowRouter.getParam('_id')}); 
		return Template.specialtyForm.data;
	},
});

/*****************************************************************************/
/* SpecialtyForm: Lifecycle Hooks */
/*****************************************************************************/
Template.specialtyForm.onCreated(function () {
	// var self = this;
	// self.autorun(function() {
	// 	self.subscribe('singleSpecialty', FlowRouter.getParam('_id'));
	// });
});

Template.specialtyForm.onRendered(function () {
	var submitParent = $('.specialty-form button[type=submit]').parent();
	if(Template.specialtyForm.data._id) {
		var deleteBtn = $.parseHTML('<button class="btn btn-danger delete-btn" type="button"><i class="fa fa-trash" aria-hidden="true"></i></button>');
		$(deleteBtn).prependTo(submitParent);

		$(deleteBtn).click(function(event){
			var specialty = Specialties.findOne(Template.specialtyForm.data._id);
			swal({
				title: TAPi18n.__('common_areYouSure'),
				text: TAPi18n.__('patients_deleteConfirmation', specialty.name),
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#ed5565",
				confirmButtonText: TAPi18n.__('common_confirm')
			}, function(){
				Specialties.remove(Template.specialtyForm.data._id, function (error, result) {
					if (error) {
						toastr['error'](error.message, TAPi18n.__('common_error'));
					} 
					else {
						toastr['success'](TAPi18n.__('common_deleteSuccess'), TAPi18n.__('common_success'));
					}
				});
				FlowRouter.go('listSpecialty');
			});
		});
	}
});

Template.specialtyForm.onDestroyed(function () {
});
