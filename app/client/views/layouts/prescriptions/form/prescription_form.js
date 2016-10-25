Template.prescriptionForm.events({
	'click .new-record': function (event, template) {
		FlowRouter.go('prescriptionCreate');
	}
});

Template.prescriptionForm.helpers({
	saveButton: function () {
		return Spacebars.SafeString('<i class="fa fa-floppy-o" aria-hidden="true"></i> ' + TAPi18n.__('common_save'));
	},
	isEditForm: function() {
		return (FlowRouter.getParam('_id')) ? true : false;
	},
	record: function() {
		var prescription = Prescriptions.findOne({_id: FlowRouter.getParam('_id')});
		Template.instance().data.prescription = prescription;
		return prescription;
	}
});

Template.prescriptionForm.onCreated(function () {
	AutoForm.addHooks('prescriptionForm', {
		onSuccess: function(formType, result) {
			toastr['success'](TAPi18n.__('common_save-success'), TAPi18n.__('common_success'));
			FlowRouter.go('prescriptionList');
		},
		onError: function(formType, error) {
			toastr['error'](error.message, TAPi18n.__('common_error'));
		}
	});
});

Template.prescriptionForm.onRendered(function () {

	var data = this.data;
	$(document).ready(function(){
		var saveButton = $('.prescription-form button[type=submit]');
		var submitParent = saveButton.parent();
		submitParent.addClass('text-right');
		submitParent.detach().appendTo('#table-footer');
		saveButton.click(function(){
			$('.prescription-form').submit();
		});

		var cancelBtn = $.parseHTML(`<button type="button" class="btn btn-white cancel" data-dismiss="modal">
										<i class="fa fa-ban" aria-hidden="true"></i> ${TAPi18n.__('common_cancel')}
									</button>`);
		$(cancelBtn).prependTo(submitParent);

		$(cancelBtn).click(function(){
			FlowRouter.go('prescriptionList');
		});

		if(data.prescription) {
			var deleteBtn = $.parseHTML('<button class="btn btn-danger delete-btn" type="button"><i class="fa fa-trash" aria-hidden="true"></i></button>');
			$(deleteBtn).prependTo(submitParent);
			$(deleteBtn).click(function(event){
				swal({
					title: TAPi18n.__('common_areYouSure'),
					text: TAPi18n.__('patients_deleteConfirmation', data.prescription.name),
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#ed5565",
					confirmButtonText: TAPi18n.__('common_confirm')
				}, function(){
					Receituario.remove(data.prescription._id, function (error, result) {
						if (error) {
							toastr['error'](error.message, TAPi18n.__('common_error'));
						} 
						else {
							toastr['success'](TAPi18n.__('common_deleteSuccess'), TAPi18n.__('common_success'));
						}
					});
					FlowRouter.go('prescriptionList');
				});
			});
		}

		var drugs = Drugs.find({}, {fields: {'name':1, _id: 0}}).fetch();

		var drugsArray = $.map(drugs, function(value, index) {
			return [value.name];
		});

		$("textarea[name=prescription]").summernote({
			height: 300,
			placeholder: TAPi18n.__('prescriptions_help'),
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
					words: drugsArray,
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

Template.prescriptionForm.onDestroyed(function () {
	$("textarea[name=prescription]").summernote('destroy');
});