// import '/imports/client/datepicker/bootstrap-datepicker.js';
// import '/imports/client/datepicker/bootstrap-datepicker.pt-BR.min.js';
// import '/imports/client/datepicker/bootstrap-datepicker.es.min.js';
// import '/imports/client/datepicker/datepicker3.css';

var openModal = function(type){
	switch (type) {
		case 'form':
			$('#form-models-form-group').show();
		break;
		case 'prescription':
			$('#prescriptions-form-group').show();
		break;
		case 'certificate':
			$('#certificates-form-group').show();
		break;
		case 'exam':
			$('#exams-form-group').show();
		break;
	}
	$('#addToRecords').modal();
};

Template.patientRecord.onCreated(function(){
	var templateInstance = this;
	this.autorun(function() {
		templateInstance.data.settings = Settings.findOne();
    });
});

Template.patientRecord.helpers({
    formModels: function(){
        return FormModels.find();
    },
    prescriptions: function(){
        return DocumentModels.find({type: 'prescription'});
    },
    certificates: function(){
        return DocumentModels.find({type: 'medical_certificate'});
    },
    exams: function(){
        return DocumentModels.find({type: 'exam_request'});
    },
    entries: function() {
		var recordsCollection = PatientRecords.find({patientId: FlowRouter.getParam('_id')}, {sort: {date: -1}}).fetch();

		var compareDates = function(item, index, array){
			return moment(this.date).isSame(item.date);
		};

		var records = [];
		recordsCollection.forEach(function(item, index, array){
			var arr = records.find(compareDates, item);
			
			if(!arr){
				records.push({
					_id: item._id,
					date: item.date,
					patientId: item.patientId,
					records: [item.record]
				});
			} else {
				arr.records.push(item.record);
			}
		});

		Template.instance().data.records = records;
		return records;
	},
	formatedDate: function(){
		return moment(this.date).format('DD/MM/YYYY');
	},
	shortDate: function(){
		return moment(this.date).format('DD/MM/YYYY');
	},
	fullDate: function(){
		return moment(this.date).format('LL');
	},
	dateIdentifier: function(){
		return moment(this.date).format('DDMMYYYY');
	},
	addOne: function(add){
		return add + 1;
	},
	generateOutput: function(record){
		if(name && (name.toLowerCase() != 'document')){
			return `<p><b>${record.name}:</b> ${record.value}</p>`;
		} else {
			return record.value;
		}
	}
});


var hashTagReplace = function(data, text){

	var keyReplace = [{
		key: '#NOME_DO_PACIENTE',
		replace: data.name || ""
	},{
		key: '#CPF_PACIENTE', 
		replace: data.CPF || ""
	},{
		key: '#RG_PACIENTE', 
		replace: data.RG || ""
	},{
		key: '#ENDERECO_PACIENTE', 
		replace: function(){
			var bairro = data.bairro || "";
			var city = data.city || "";
			var streetAddress_1 = data.streetAddress_1 || "";
			var streetAddress_2 = data.streetAddress_2 || "";
			var zip = data.zip || "";

			return `${streetAddress_1} ${streetAddress_2 ? (' - ' + streetAddress_2) : '' }</p><p>${bairro} - ${city} - ${zip}`;
		}
	},{
		key: '#DATA_DA_CONSULTA', 
		replace: moment().format('LLLL')
	},{
		key: '#DIA', 
		replace: moment().format('D')
	},{
		key: '#MES', 
		replace: moment().format('MMMM')
	},{
		key: '#ANO', 
		replace: moment().format('YYYY')
	},{
		key: '#HORARIO_DA_CONSULTA', 
		replace: moment().format('HH:mm')
	},{
		key: '#NOME_PROFISSIONAL', 
		replace: Meteor.user().profile.firstName + ' ' + Meteor.user().profile.lastName
	},{
		key: '#CRM_PROFISSIONAL', 
		replace: Meteor.user().profile.CRM || ""
	},{
		key: '#ASSINATURA_PROFISSIONAL', 
		replace: Meteor.user().profile.signature || ""
	},{
		key: '#ENDERECO_CLINICA', 
		replace: data.settings.address || ""
	}];
	
	var modifiedText = text;
	keyReplace.forEach(function(item, index, array){
		modifiedText = modifiedText.replace(item.key, item.replace);
	});
	return modifiedText;
};



Template.patientRecord.onRendered(function () {
	var data = this.data;
	$(document).ready(function(){
		$('input[name=date]').mask('00/00/0000');
		$('input[name=date]').val(moment().format('DD/MM/YYYY'));
////////////////////////////////////////////////////////////////////////////////////////////////
		$('.chosen-select').chosen({width: "100%"});
		$(".chosen-select").chosen().change(function(event, selected){
			var type = $(event.target).data('type');
			var model = null;
			if(type == 'form'){
				if(selected.selected){
					model = FormModels.findOne({_id: selected.selected});
					$('#form-render').formRender({
						dataType: 'json',
						formData: JSON.stringify(model.model)
					});
				} else {
					$('#form-render').html('');
				}
			} else {
				if(selected.selected){
					model = DocumentModels.findOne({_id: selected.selected});
					$('#document').summernote('code', hashTagReplace(data, model.model));

					$('#document-wrapper').show();
				} else {
					$('#document').summernote('code', '');
				}
			}
		});

///////////////////////////////////////////////////////////////////////////////////////////////////
		$('#addToRecords .form-group').not('#date').hide();
		$('#addToRecords').on('hidden.bs.modal', function (e) {
			$('#addToRecords .form-group').not('#date').hide();
			$('#addToRecords select').val('');
			$('.chosen-select').trigger('chosen:updated');
		});

///////////////////////////////////////////////////////////////////////////////////////////////////

		$('.dropdown, .dropup').on({
			"show.bs.dropdown": function () {
				// On show, start in effect
				var dropdown = dropdownEffect.data(this);
				dropdownEffect.start(dropdown, dropdown.effectIn);
			},
			"shown.bs.dropdown": function () {
				// On shown, remove in effect once complete
				var dropdown = dropdownEffect.data(this);
				if (dropdown.effectIn && dropdown.effectOut) {
					dropdownEffect.end(dropdown, function() {}); 
				}
			},  
			"hide.bs.dropdown":  function(e) {
				// On hide, start out effect
				var dropdown = dropdownEffect.data(this);
				if (dropdown.effectOut) {
					e.preventDefault();   
					dropdownEffect.start(dropdown, dropdown.effectOut);   
					dropdownEffect.end(dropdown, function() {
						dropdown.dropdown.removeClass('open');
					}); 
				}    
			}, 
		});


///////////////////////////////////////////////////////////////////////////////////////////////////


		$('[data-tooltip!=""]').qtip({ // Grab all elements with a non-blank data-tooltip attr.
			content: {
				attr: 'data-tooltip' // Tell qTip2 to look inside this attr for its content
			},
			position:{
				my: 'center right',
				at: 'center left'
			},
			style: {
				classes: 'qtip-tipsy qtip-shadow'
			}
		});

		$('#patient-add-form-btn').click(function(event){
			openModal('form');
		});
		$('#patient-add-prescription-btn').click(function(event){
			openModal('prescription');
		});
		$('#patient-add-certificate-btn').click(function(event){
			openModal('certificate');
		});
		$('#patient-add-exam-btn').click(function(event){
			openModal('exam');
		});


///////////////////////////////////////////////////////////////////////////////////////////////////


		var drugs = localDrugs.find({}, {fields: {'name':1, _id: 0}}).fetch();

		var drugsArray = $.map(drugs, function(value, index) {
			return [value.name];
		});

		var diseases = localICD10.find({}, {fields: {'icd':1, _id: 0}}).fetch();

		var diseasesArray = $.map(diseases, function(value, index) {
			return [value.icd];
		});

		$("textarea[name=document]").summernote({
			height: 300,
			placeholder: TAPi18n.__('document-models_model-placeholder'),
			lang: TAPi18n.getLanguage(),
			print: {
				stylesheetUrl: Meteor.absoluteUrl() + 'css/summernote-print.css'
			},
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
				['misc', ['fullscreen', 'codeview', 'print']]
			],
			hint: [{
				words: drugsArray,
				//match: /\b(\w{2,})$/,
				match: /\B\$(\w*)$/,
				search: function search(keyword, callback) {
					callback($.map(this.words, function (item) {
						return item.toUpperCase().indexOf(keyword.toUpperCase()) >= 0 ? item : null;
					}));
				},
				index: 1,
				replace: function replace(item) {
					return item.toUpperCase() + ' ';
				}
			},{
				words: diseasesArray,
				match: /\B@(\w*)$/,
				search: function search(keyword, callback) {
					callback($.map(this.words, function (item) {
						return item.toUpperCase().indexOf(keyword.toUpperCase()) >= 0 ? item : null;
					}));
				},
				index: 2,
				replace: function replace(item) {
					return item.toUpperCase() + ' ';
				}
			},{
				words: [
					'NOME_DO_PACIENTE', 
					'CPF_PACIENTE', 
					'RG_PACIENTE',
					'ENDERECO_PACIENTE',
					'DATA_DA_CONSULTA', 
					'HORARIO_DA_CONSULTA', 
					'NOME_PROFISSIONAL',
					'CRM_PROFISSIONAL',
					'ASSINATURA_PROFISSIONAL',
					'ENDERECO_CLINICA'
				],
				match: /\B#(\w*)$/,
				search: function (keyword, callback) {
					callback($.grep(this.words, function (item) {
						//return item.indexOf(keyword) === 0;
						return item.toUpperCase().indexOf(keyword.toUpperCase()) >= 0 ? item : null;
					}));
				},
				template: function (item) {
					return item;
					//var content = emojiUrls[item];
					//return '<img src="' + content + '" width="20" /> :' + item + ':';
				},
				content: function (item) {
					return '#' + item;
				},
				replace: function replace(item) {
					return item.toUpperCase() + ' ';
				}
			}]
		});

/////////////////////////////////////////////////////////////////////////////////

		$('#addToRecords .save').click(function(){
			$('#patient-record-form').submit();
		});

		$('#patient-record-form').on('submit', function(event){
			event.preventDefault();
			try{
				validateForm();
				var formData = $(this).serializeArray();

				formData.forEach(function(element, index, array){
					var labelEl = $('#patient-record-form').find('[name='+ element.name +']').parent().find('label:first');
					var labelText = labelEl.clone().children().remove().end().text().trim();
					element.label = labelText;
				});

				var date = formData.shift().value;

				var data = {
					date: moment(date, 'DD/MM/YYYY').toDate(),
					patientId: FlowRouter.getParam('_id'),
					record: formData
				};

				PatientRecords.insert(data, function(error, result){
					if (error) {
						toastr['error'](error.message, TAPi18n.__('common_error'));
					}
					if (result) {
						$('#addToRecords').modal('hide');
					}
				});

			} catch (error) {
				toastr['error'](error.message, TAPi18n.__('common_error'));
			}
		});

		var validateForm = function(){
			clearErrors();
			$('#patient-record-form').find('.form-group').each(function(key, element){
				var input = $(element).find('[required]')[0];
				if(input && !$(input).val()){
					markError(input);
				}
			});
			if($('#patient-record-form').find('.has-error:visible').length > 0){
				throw new Meteor.Error('ValidationError', TAPi18n.__('patient_records-validation-error'));
			}
		};

		var clearErrors = function(){
			$('#patient-record-form').find('.has-error').each(function(key, element){
				$(element).removeClass('has-error');
			});
		};

		var markError = function(){
			var args = Array.prototype.slice.call(arguments);
			args.forEach(function(el, index){
				$(el).parent().addClass('has-error');
			});
		};

	});

});

Template.patientRecord.onDestroyed(function () {
    $('#document').summernote('destroy');
});