/*****************************************************************************/
/* SpecialtyForm: Event Handlers */
/*****************************************************************************/
Template.receituarioForm.events({
	'click .new-user': function (event, template) {
		FlowRouter.go('createReceituario');
	}
});

/*****************************************************************************/
/* SpecialtyForm: Helpers */
/*****************************************************************************/
Template.receituarioForm.helpers({
	saveButton: function () {
		return Spacebars.SafeString('<i class="fa fa-floppy-o" aria-hidden="true"></i> ' + TAPi18n.__('common_save'));
	},
	isEditForm: function() {
		return (FlowRouter.getParam('_id')) ? true : false;
	},
	receita: function() {
		Template.receituarioForm.data = Receituario.findOne({_id: FlowRouter.getParam('_id')}); 
		return Template.receituarioForm.data;
	},
	runUxAdjustments: function(){
		//gambiarra_scope = Template.patientForm.data; //#TODO: arrumar isso urgente!!!!!
		setTimeout( 'uxAdjustments.call()', 500 );
	}
});

/*****************************************************************************/
/* SpecialtyForm: Lifecycle Hooks */
/*****************************************************************************/
Template.receituarioForm.onCreated(function () {
	var self = this;
	self.autorun(function() {
		self.subscribe('singleReceituario', FlowRouter.getParam('_id'));
	});

	AutoForm.addHooks('insertReceituarioForm', {
		onSuccess: function(formType, result) {
			toastr['success'](TAPi18n.__('common_save-success'), TAPi18n.__('common_success'));
			FlowRouter.go('listReceituario');
		},
		onError: function(formType, error) {
			toastr['error'](error.message, TAPi18n.__('common_error'));
		},
		// docToForm: function(doc) {
		// 	doc.createdAt = moment(doc.createdAt).format('DD/MM/YYYY');
		// 	return doc;
		// },
		// formToDoc: function(doc) {
		// 	doc.createdAt = moment(doc.createdAt, "DD-MM-YYYY");
		// 	return doc;
		// }
	});

});

Template.receituarioForm.onRendered(function () {
	var submitParent = $('.specialty-form button[type=submit]').parent();
	// if(Template.receituarioForm.data._id) {
	// 	var deleteBtn = $.parseHTML('<button class="btn btn-danger delete-btn" type="button"><i class="fa fa-trash" aria-hidden="true"></i></button>');
	// 	$(deleteBtn).prependTo(submitParent);

	// 	$(deleteBtn).click(function(event){
	// 		var receituario = Receituario.findOne(Template.receituarioForm.data._id);
	// 		swal({
	// 			title: TAPi18n.__('common_areYouSure'),
	// 			text: TAPi18n.__('patients_deleteConfirmation', receituario.receituario),
	// 			type: "warning",
	// 			showCancelButton: true,
	// 			confirmButtonColor: "#ed5565",
	// 			confirmButtonText: TAPi18n.__('common_confirm')
	// 		}, function(){
	// 			Receituario.remove(Template.receituarioForm.data._id, function (error, result) {
	// 				if (error) {
	// 					toastr['error'](error.message, TAPi18n.__('common_error'));
	// 				} 
	// 				else {
	// 					toastr['success'](TAPi18n.__('common_deleteSuccess'), TAPi18n.__('common_success'));
	// 				}
	// 			});
	// 			FlowRouter.go('listReceituario');
	// 		});
	// 	});
	// }





	$('textarea[name=receituario]').textcomplete([{ // medicamentos
	    medicamentos: [],
	    match: /\b(\w{2,})$/,
	    search: function search(term, callback) {
	        callback($.map(this.medicamentos, function (medicamento) {
	            return medicamento.toUpperCase().indexOf(term.toUpperCase()) >= 0 ? medicamento : null;
	        }));
	    },
	    index: 1,
	    replace: function replace(medicamento) {
	        return medicamento.toUpperCase() + ' ';
	    }
	}, { // dados da paciente
	    campos: ['NOME_DO_PACIENTE', 'CPF_PACIENTE', 'RG_PACIENTE', 'DATA_DA_CONSULTA', 'HORARIO_DA_CONSULTA', 'NOME_PROFISSIONAL'],
	    match: /\B#(\w*)$/,
	    search: function search(term, callback) {
	        callback($.map(this.campos, function (campo) {
	            return campo.indexOf(term) === 0 ? campo : null;
	        }));
	    },
	    index: 1,
	    replace: function replace(campo) {
	        return '#' + campo;
	    }
	}]);










});

Template.receituarioForm.onDestroyed(function () {
});

uxAdjustments = function(){
var submitParent = $('.receituario-form button[type=submit]').parent();
	submitParent.addClass('text-right');
	if(FlowRouter.getParam('_id')) {
		var deleteBtn = $.parseHTML('<button class="btn btn-danger delete-btn" type="button"><i class="fa fa-trash" aria-hidden="true"></i></button>');
		$(deleteBtn).prependTo(submitParent);
		
		var self = this;
		// $(deleteBtn).click(function(event){
		// 	var patient = Patients.findOne(self._id);
		// 	swal({
		// 		title: TAPi18n.__('common_areYouSure'),
		// 		text: TAPi18n.__('patients_deleteConfirmation', patient.name),
		// 		type: "warning",
		// 		showCancelButton: true,
		// 		confirmButtonColor: "#ed5565",
		// 		confirmButtonText: TAPi18n.__('common_confirm')
		// 	}, function(){
		// 		Patients.remove(self._id, function (error, result) {
		// 			if (error) {
		// 				toastr['error'](error.message, TAPi18n.__('common_error'));
		// 			} 
		// 			else {
		// 				toastr['success'](TAPi18n.__('common_deleteSuccess'), TAPi18n.__('common_success'));
		// 			}
		// 		});
		// 		FlowRouter.go('listReceituario');
		// 	});
		// });
	}
};