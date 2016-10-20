Template.certificateForm.events({
	'click .new-record': function (event, template) {
		FlowRouter.go('certificateCreate');
	}
});

Template.certificateForm.helpers({
	saveButton: function () {
		return Spacebars.SafeString('<i class="fa fa-floppy-o" aria-hidden="true"></i> ' + TAPi18n.__('common_save'));
	},
	isEditForm: function() {
		return (FlowRouter.getParam('_id')) ? true : false;
	},
	record: function() {
		var certificate = Certificates.findOne({_id: FlowRouter.getParam('_id')});
		Template.instance().data.certificate = certificate;
		return certificate;
	}
});

Template.certificateForm.onCreated(function () {
	AutoForm.addHooks('certificateForm', {
		onSuccess: function(formType, result) {
			toastr['success'](TAPi18n.__('common_save-success'), TAPi18n.__('common_success'));
			FlowRouter.go('certificateList');
		},
		onError: function(formType, error) {
			toastr['error'](error.message, TAPi18n.__('common_error'));
		}
	});
});

Template.certificateForm.onRendered(function () {

	var data = this.data;
	$(document).ready(function(){
		var saveButton = $('.certificate-form button[type=submit]');
		var submitParent = saveButton.parent();
		submitParent.addClass('text-right');
		submitParent.detach().appendTo('#table-footer');
		saveButton.click(function(){
			$('.certificate-form').submit();
		});

		var cancelBtn = $.parseHTML(`<button type="button" class="btn btn-white cancel" data-dismiss="modal">
										<i class="fa fa-ban" aria-hidden="true"></i> ${TAPi18n.__('common_cancel')}
									</button>`);
		$(cancelBtn).prependTo(submitParent);

		$(cancelBtn).click(function(){
			FlowRouter.go('certificateList');
		});

		if(data.prescription) {
			var deleteBtn = $.parseHTML('<button class="btn btn-danger delete-btn" type="button"><i class="fa fa-trash" aria-hidden="true"></i></button>');
			$(deleteBtn).prependTo(submitParent);
			$(deleteBtn).click(function(event){
				swal({
					title: TAPi18n.__('common_areYouSure'),
					text: TAPi18n.__('patients_deleteConfirmation', data.certificate.name),
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#ed5565",
					confirmButtonText: TAPi18n.__('common_confirm')
				}, function(){
					Receituario.remove(data.certificate._id, function (error, result) {
						if (error) {
							toastr['error'](error.message, TAPi18n.__('common_error'));
						} 
						else {
							toastr['success'](TAPi18n.__('common_deleteSuccess'), TAPi18n.__('common_success'));
						}
					});
					FlowRouter.go('certificateList');
				});
			});
		}

		var diseases = ICD10.find({}, {fields: {'icd':1, _id: 0}}).fetch();

		var diseasesArray = $.map(diseases, function(value, index) {
			return [value.icd];
		});

		$("textarea[name=certificate]").summernote({
			height: 300,
			placeholder: TAPi18n.__('certificates_help'),
			toolbar: [
				['history', ['undo', 'redo']],
				['style', ['style', 'bold', 'italic', 'underline', 'clear']],
				['font', ['strikethrough', 'superscript', 'subscript']],
				['fontsize', ['fontsize']],
				['para', ['ul', 'ol', 'paragraph']],
				['height', ['height']],
				['insert', ['hr', 'table']],
				['misc', ['fullscreen']]
			],
			hint: [{
					words: diseasesArray,
					match: /\b(\w{2,})$/,
					search: function search(keyword, callback) {
						callback($.map(this.words, function (item) {
							return item.toUpperCase().indexOf(keyword.toUpperCase()) >= 0 ? item : null;
						}));
					},
					index: 1,
					replace: function replace(medicamento) {
						return medicamento.toUpperCase() + ' ';
					}
			},{
				words: [
					'NOME_DO_PACIENTE', 
					'CPF_PACIENTE', 
					'RG_PACIENTE', 
					'DATA_DA_CONSULTA', 
					'HORARIO_DA_CONSULTA', 
					'NOME_PROFISSIONAL',
					'ENDERECO_PACIENTE'
				],
				match: /\B#(\w*)$/,
				search: function (keyword, callback) {
					callback($.grep(this.words, function (item) {
						return item.indexOf(keyword) === 0;
					}));
				},
				template: function (item) {
					return item;
					//var content = emojiUrls[item];
					//return '<img src="' + content + '" width="20" /> :' + item + ':';
				},
				content: function (item) {
					return '#' + item;
				}
			}]
		});

	});

});

Template.certificateForm.onDestroyed(function () {});