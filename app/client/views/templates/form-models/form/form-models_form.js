Template.formModelsForm.events({});

Template.formModelsForm.helpers({});

Template.formModelsForm.onCreated(function () {});

Template.formModelsForm.onRendered(function () {

	var self = this;

	var formId = FlowRouter.getParam('_id');
	if(formId){
		this.data = FormModels.findOne(formId);
	}

	$(document).ready(function(){
		var options = {
			dataType: 'json',
			//editOnAdd: true,
			roles: false,
			sortableControls: true,
			stickyControls: true,
			disableFields: [
				'autocomplete',
				'button',
				'file',
				'date'
			],
			controlOrder: [
				'text',
				'textarea',
				'number',
				'select'
			],
			notify: {
				error: function(message) {
					toastr['error'](message, TAPi18n.__('common_error'));
				},
				success: function(message) {
					//toastr['success'](TAPi18n.__('common_save-success'), TAPi18n.__('common_success'));
					toastr['success'](message, TAPi18n.__('common_success'));
				},
				warning: function(message) {
					toastr['warning'](message, TAPi18n.__('common_error'));
				}
			},
			messages: $.TAPi18next.getResStore()[TAPi18n.getLanguage()].project["form-builder"],
		};

		if(formId){
			$('#form-model-form input[name=name]').val(self.data.name);
			$('#form-model-form textarea[name=description]').val(self.data.description);
			options.formData = JSON.stringify(self.data.model);
		}

		var formBuilder = $('#record-builder').formBuilder(options).data('formBuilder');

		$('.record-builder-tabs a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			$('#record-render').formRender({
				dataType: 'json',
				formData: formBuilder.formData
			});
		});

		$('#record-builder .form-builder-save')
			.before(`<button class="btn btn-default cancel" type="button">
					<i class="fa fa-ban" aria-hidden="true"></i> Cancel
				</button>`)
			.prepend('<i class="fa fa-floppy-o" aria-hidden="true">&nbsp;');
		$('#record-builder .cancel').click(function(event){
			FlowRouter.go('formModelsList');
		});

		if(formId){
			$('#record-builder .form-builder-save').before(`<button class="btn btn-danger delete-btn" type="button">
					<i class="fa fa-trash" aria-hidden="true"></i>
				</button>`)
			$('.delete-btn').click(function(event) {
				swal({
					title: TAPi18n.__('common_areYouSure'),
					text: TAPi18n.__('common_deleteConfirmation', self.data.name),
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#ed5565",
					confirmButtonText: TAPi18n.__('common_confirm')
				}, function(){
					FormModels.remove(formId, function (error, result) {
						if (error) {
							toastr['error'](error.message, TAPi18n.__('common_error'));
						} 
						else {
							toastr['success'](TAPi18n.__('common_deleteSuccess'), TAPi18n.__('common_success'));
							FlowRouter.go('formModelsList');
						}
					});
				});
			});
		}

		var callback = function (error, result) {
			if (error) {
				toastr['error'](error.message, TAPi18n.__('common_error'));
			} 
			else {
				toastr['success'](TAPi18n.__('common_save-success'), TAPi18n.__('common_success'));
				FlowRouter.go('formModelsList');
			}
		};

		$('#record-builder .form-builder-save').click(function(event) {
			var data = {
				name: $('#form-model-form input[name=name]').val(),
				description: $('#form-model-form textarea[name=description]').val(),
				model: formBuilder.actions.getData(),
			};
			if(formId){
				FormModels.update(formId, {
					$set: data
				}, callback);
			} else {
				FormModels.insert(data, callback);
			}
		});

// #TODO: recative translate
 // $fbTemplate = $(document.getElementById('fb-editor'));
 //  $fbTemplate.formBuilder();

 //  $('.language-selector li').click(function() {
 //    var lang = this.id;

 //    $fbTemplate.empty().formBuilder({
 //      messages: language[lang] || {}
 //    });
 //  });

	});
});

Template.formModelsForm.onDestroyed(function () {});
