Template.prescriptionForm.events({
	'click .new-record': function (event, template) {
		FlowRouter.go('createPrescription');
	}
});

Template.prescriptionForm.helpers({
	saveButton: function () {
		return Spacebars.SafeString('<i class="fa fa-floppy-o" aria-hidden="true"></i> ' + TAPi18n.__('common_save'));
	},
	isEditForm: function() {
		return (FlowRouter.getParam('_id')) ? true : false;
	},
	prescription: function() {
		var prescription = Prescriptions.findOne({_id: FlowRouter.getParam('_id')});
		Template.instance().data.prescription = prescription;
		return prescription;
	}
});

Template.prescriptionForm.onCreated(function () {
	AutoForm.addHooks('prescriptionForm', {
		onSuccess: function(formType, result) {
			toastr['success'](TAPi18n.__('common_save-success'), TAPi18n.__('common_success'));
			FlowRouter.go('listPrescription');
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
					text: TAPi18n.__('patients_deleteConfirmation', data.prescription.prescription),
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


		// $('textarea[name=prescription]').textcomplete([{
		// 	medicamentos: [],
		// 	match: /\b(\w{2,})$/,
		// 	search: function search(term, callback) {
		// 		console.log('aaaaa');
		// 		callback($.map(this.medicamentos, function (medicamento) {
		// 			return medicamento.toUpperCase().indexOf(term.toUpperCase()) >= 0 ? medicamento : null;
		// 		}));
		// 	},
		// 	index: 1,
		// 	replace: function replace(medicamento) {
		// 		return medicamento.toUpperCase() + ' ';
		// 	}
		// }, { 
		// 	campos: [
		// 		'NOME_DO_PACIENTE', 
		// 		'CPF_PACIENTE', 
		// 		'RG_PACIENTE', 
		// 		'DATA_DA_CONSULTA', 
		// 		'HORARIO_DA_CONSULTA', 
		// 		'NOME_PROFISSIONAL',
		// 		'ENDERECO_PACIENTE'
		// 	],
		// 	match: /\B#(\w*)$/,
		// 	search: function search(term, callback) {
		// 		console.log('aquiiiii');
		// 		callback($.map(this.campos, function (campo) {
		// 			return campo.indexOf(term) === 0 ? campo : null;
		// 		}));
		// 	},
		// 	index: 1,
		// 	replace: function replace(campo) {
		// 		return '#' + campo;
		// 	}
		// }]);


		//$('textarea[name=prescription]').summernote({});

		$("textarea[name=prescription]").summernote({
			height: 200,
			placeholder: TAPi18n.__('prescriptions_help'),
			hint: [{
					words: ['amoxicilina', 'atenolol'],
					match: /\b(\w{2,})$/,
					search: function search(keyword, callback) {
						console.log('aaaaa');
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

Template.prescriptionForm.onDestroyed(function () {});