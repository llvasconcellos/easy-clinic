Template.settingsForm.events({});

Template.settingsForm.helpers({
	saveButton: function () {
		return Spacebars.SafeString('<i class="fa fa-floppy-o" aria-hidden="true"></i> ' + TAPi18n.__('common_save'));
	},
	isEditForm: function() {
		return (Settings.find().count() > 0) ? true : false;
	},
	record: function() {
		var record = Settings.findOne({});
		Template.instance().data.settings = record;
		return record;
	},
});

Template.settingsForm.onCreated(function () {
	AutoForm.addHooks('settingsForm', {
		onSuccess: function(formType, result) {
			toastr['success'](TAPi18n.__('common_save-success'), TAPi18n.__('common_success'));
		},
		onError: function(formType, error) {
			toastr['error'](error.message, TAPi18n.__('common_error'));
		}
	});
});

Template.settingsForm.onRendered(function () {
	$(document).ready(function(){
		// var saveButton = $('.settings-form button[type=submit]');
		// var submitParent = saveButton.parent();
		// submitParent.addClass('text-right');
		// submitParent.detach().appendTo('.ibox-footer');
		// saveButton.click(function(){
		// 	$('.settings-form').submit();
		// });

		$("textarea[name=address]").summernote({
			height: 150,
			lang: TAPi18n.getLanguage(),
			toolbar: [
				['history', ['undo', 'redo']],
				['style', ['style', 'bold', 'italic', 'underline', 'clear']],
				['font', ['strikethrough', 'superscript', 'subscript']],
				['fontsize', ['fontsize']],
				['para', ['ul', 'ol', 'paragraph']],
				['height', ['height']],
				['insert', ['hr', 'table']],
				['misc', ['fullscreen', 'print']]
			]
		});
	});
});

Template.settingsForm.onDestroyed(function () {});
