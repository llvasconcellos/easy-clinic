Template.specialtyForm.events({
	'click .new-record': function (event, template) {
		FlowRouter.go('specialtyCreate');
	}
});

Template.specialtyForm.helpers({
	saveButton: function () {
		return Spacebars.SafeString('<i class="fa fa-floppy-o" aria-hidden="true"></i> ' + TAPi18n.__('common_save'));
	},
	isEditForm: function() {
		return (FlowRouter.getParam('_id')) ? true : false;
	},
	record: function() {
		var record = Specialties.findOne({_id: FlowRouter.getParam('_id')});
		Template.instance().data.specialty = record;
		return record;
	},
});

Template.specialtyForm.onCreated(function () {
	AutoForm.addHooks('specialtyForm', {
		onSuccess: function(formType, result) {
			toastr['success'](TAPi18n.__('common_save-success'), TAPi18n.__('common_success'));
			FlowRouter.go('specialtyList');
		},
		onError: function(formType, error) {
			toastr['error'](error.message, TAPi18n.__('common_error'));
		}
	});
});

Template.specialtyForm.onRendered(function () {

	var data = this.data;

	$(document).ready(function(){
		var submitParent = $('.specialty-form button[type=submit]').parent();
		submitParent.addClass('text-right');
		if (data.specialty) {
			var deleteBtn = $.parseHTML('<button class="btn btn-danger delete-btn" type="button"><i class="fa fa-trash" aria-hidden="true"></i></button>');
			$(deleteBtn).prependTo(submitParent);
			$(deleteBtn).click(function(event){
				swal({
					title: TAPi18n.__('common_areYouSure'),
					text: TAPi18n.__('common_deleteConfirmation', data.specialty.name),
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#ed5565",
					confirmButtonText: TAPi18n.__('common_confirm')
				}, function(){
					Specialties.remove(data.specialty._id, function (error, result) {
						if (error) {
							toastr['error'](error.message, TAPi18n.__('common_error'));
						} 
						else {
							toastr['success'](TAPi18n.__('common_deleteSuccess'), TAPi18n.__('common_success'));
						}
					});
					FlowRouter.go('specialtyList');
				});
			});
		}
	});
});

Template.specialtyForm.onDestroyed(function () {
	AutoForm.resetForm('specialtyForm');
});
