Template.drugForm.events({
	'click .new-record': function (event, template) {
		FlowRouter.go('drugCreate');
	}
});

Template.drugForm.helpers({
	saveButton: function () {
		return Spacebars.SafeString('<i class="fa fa-floppy-o" aria-hidden="true"></i> ' + TAPi18n.__('common_save'));
	},
	isEditForm: function() {
		return (FlowRouter.getParam('_id')) ? true : false;
	},
	record: function() {
		var record = Drugs.findOne({_id: FlowRouter.getParam('_id')});
		Template.instance().data.drug = record;
		return record;
	},
});

Template.drugForm.onCreated(function () {
	AutoForm.addHooks('drugForm', {
		onSuccess: function(formType, result) {
			toastr['success'](TAPi18n.__('common_save-success'), TAPi18n.__('common_success'));
			FlowRouter.go('drugList');
		},
		onError: function(formType, error) {
			toastr['error'](error.message, TAPi18n.__('common_error'));
		}
	});
});

Template.drugForm.onRendered(function () {

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
					text: TAPi18n.__('common_deleteConfirmation', data.drug.name),
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#ed5565",
					confirmButtonText: TAPi18n.__('common_confirm')
				}, function(){
					Specialties.remove(data.drug._id, function (error, result) {
						if (error) {
							toastr['error'](error.message, TAPi18n.__('common_error'));
						} 
						else {
							toastr['success'](TAPi18n.__('common_deleteSuccess'), TAPi18n.__('common_success'));
						}
					});
					FlowRouter.go('drugList');
				});
			});
		}

		$("textarea[name=html]").summernote({
			height: 300,
			lang: TAPi18n.getLanguage(),
			fontSizes: ['4', '6', '8', '9', '10', '11', '12', '14', '16', '18', '20', '24', '36'],
			lineHeights: ['0.4', '0.6', '0.8', '1.0', '1.2', '1.4', '1.5', '1.6', '1.8', '2.0', '3.0'],
			toolbar: [
				['history', ['undo', 'redo']],
				['style', ['style', 'bold', 'italic', 'underline', 'clear']],
				['font', ['strikethrough', 'superscript', 'subscript']],
				['fontsize', ['fontsize']],
				['para', ['ul', 'ol', 'paragraph']],
				['height', ['height']],
				['insert', ['hr', 'table']],
				['misc', ['fullscreen']]
			]
		});
	});
});

Template.drugForm.onDestroyed(function () {});
