Template.import.onRendered(() => {});

Template.import.onCreated( () => {
	var defaultValue = 'idle';
	if(Session.get('patientsBuffer')) {
		defaultValue = 'uploaded';
	}
	Template.instance().state = new ReactiveVar(defaultValue);
	Template.instance().secondState = new ReactiveVar('idle');
});

Template.import.onDestroyed(() => {
	Session.set('patientsBuffer', undefined);
	delete Session.keys.patientsBuffer;
});

Template.import.helpers({
	checkState(state) {
		return Template.instance().state.get() == state;
	},
	checkSecondState(state) {
		return Template.instance().secondState.get() == state;
	},
	reactiveDataFunction: function () {
		return function () {
			return Session.get('patientsBuffer');
		};
	},
	optionsObject: {
		searching: false,
		ordering: false,
		paging: false,
		buttons: [],
		drawCallback: function( settings ) {
			$(document).ready(function() {
				$($('.table-responsive')[1]).css('transform', 'rotateX(180deg)')
				.css('-ms-transform', 'rotateX(180deg)')
				.css('-webkit-transform', 'rotateX(180deg)');

				$('.dataTable').css('transform', 'rotateX(180deg)')
				.css('-ms-transform', 'rotateX(180deg)')
				.css('-webkit-transform', 'rotateX(180deg)');
			});
		},
		columns: [{
			name: 'name',
			title: 'name',
			data: 'name'
		},{
			name: 'bed',
			title: 'bed',
			data: 'bed'
		},{
			name: 'records',
			title: 'records',
			data: 'records'
		},{
			name: 'createdAt',
			title: 'createdAt',
			data: 'createdAt'
		},{
			name: 'dateOfBirth',
			title: 'dateOfBirth',
			data: 'dateOfBirth'
		},{
			name: 'healthInsurance',
			title: 'healthInsurance',
			data: 'healthInsurance'
		},{
			name: 'code',
			title: 'code',
			data: 'code'
		},{
			name: 'gender',
			title: 'gender',
			data: 'gender'
		},{
			name: 'maritalStatus',
			title: 'maritalStatus',
			data: 'maritalStatus'
		},{
			name: 'skinColor',
			title: 'skinColor',
			data: 'skinColor'
		},{
			name: 'placeOfBirth',
			title: 'placeOfBirth',
			data: 'placeOfBirth'
		},{
			name: 'literacy',
			title: 'literacy',
			data: 'literacy'
		},{
			name: 'CPF',
			title: 'CPF',
			data: 'CPF'
		},{
			name: 'name',
			title: 'RG',
			data: 'RG'
		},{
			name: 'titularCPF',
			title: 'titularCPF',
			data: 'titularCPF'
		},{
			name: 'fathersName',
			title: 'fathersName',
			data: 'fathersName'
		},{
			name: 'name',
			title: 'mothersName',
			data: 'mothersName'
		},{
			name: 'name',
			title: 'recommendedBy',
			data: 'recommendedBy'
		},{
			name: 'prevRetorno',
			title: 'prevRetorno',
			data: 'prevRetorno'
		},{
			name: 'email',
			title: 'email',
			data: 'email'
		},{
			name: 'phone',
			title: 'phone',
			data: 'phone'
		},{
			name: 'mobile',
			title: 'mobile',
			data: 'mobile'
		},{
			name: 'zip',
			title: 'zip',
			data: 'zip'
		},{
			name: 'streetAddress_1',
			title: 'streetAddress_1',
			data: 'streetAddress_1'
		},{
			name: 'streetAddress_2',
			title: 'streetAddress_2',
			data: 'streetAddress_2'
		},{
			name: 'bairro',
			title: 'bairro',
			data: 'bairro'
		},{
			name: 'city',
			title: 'city',
			data: 'city'
		},{
			name: 'state',
			title: 'state',
			data: 'state'
		},{
			name: 'obs',
			title: 'obs',
			data: 'obs'
		},{
			name: 'picture',
			title: 'picture',
			data: 'picture',
			render: function(cellData, renderType, currentRow) {
				if(cellData) {
					return truncate(cellData, 25);
				}
				else {
					return '---';
				}
			}
		}]
	}
});

var truncate = function(s, n){
	return (s.length > n) ? s.substr(0, n-1)+'&hellip;' : s;
};

var convertToPlain = function(rtf) {
	rtf = rtf.replace(/\\par[d]?/g, "");
	rtf = rtf.replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, "").trim();
	return rtf.replace(/(\\~)/g, ' ');
};

var hex2a = function(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
};

var convertSpecialChars = function(str){
	str = str.replace(/(\\')\w{2}/g, function(match, p1, offset, string){
		return hex2a(match.substr(2,4));
	});
	return str;
};

var normalize = function(object) {
	for (var key in object) {
		if (object.hasOwnProperty(key)) {
			if(object[key]){
				object[key] = object[key].trim();
			}
			if(object[key] == '') {
				object[key] = null;
			}
		}
	}
	if(!object['createdAt']) {
		object['createdAt'] = new Date();
	}
	if(object['obs']) {
		try {
			object['obs'] = convertSpecialChars(convertToPlain(object['obs']));
		}
		catch(e) {
			toastr['error'](e.message, TAPi18n.__('common_error'));
		}
	}
};

var markErrors = function(errors) {
	var table = $('#import-patients-table').DataTable();
	errors.forEach(function(item, index, array){
		if(item){
			$(table.row(index).node()).addClass('error');
			errorsArray = JSON.parse(item.details);
			errorsArray.forEach(function(error, i){
				var cell = table.cell(index, error.name + ':name').nodes();
				$(cell).addClass('withError');

				var qtipContent = 'Problem: ' + error.value + ' '+ error.type;
				if(patientSchema[error.name].allowedValues){
					qtipContent += '<br> Allowed Values: [' + patientSchema[error.name].allowedValues + ']';
				}

				$(cell).qtip({
					position: {
						target: 'mouse',
						adjust: { 
							mouse: true
						}
					},
					style: { 
						classes: 'qtip-bootstrap'
					},
					content: qtipContent
				});
			});
		}
	});
};

var execute = function(event, template, method) {
	var state = 'importing';
	var iconClass = 'fa-database';
	var serverMethod = 'patientImport';
	var errorMessage = 'Occorreu um erro ao processar os dados.';
	var successMessage = 'Importação executada com sucesso.';
	var finishedState = 'idle';
	var finishedSecondState = 'idle';
	if(method == 'test'){
		state = 'testing';
		iconClass = 'fa-warning';
		serverMethod = 'testPatientImport';
		errorMessage = 'Existem erros para serem corrigidos.';
		successMessage = 'Nenhum erro encontrado. Pronto para Importar!';
		finishedState = 'uploaded';
		finishedSecondState = 'ready';
	}
	//template.secondState.set(state);
	var btnIcon = $(event.target).find('.' + iconClass);
	btnIcon.removeClass(iconClass).addClass('fa-spin fa-refresh');

	Meteor.defer(function(){
		Meteor.call(serverMethod, Session.get('patientsBuffer'), (error, response) => {
			if ( error ) {
				toastr['error'](error.message, TAPi18n.__('common_error'));
			} else {
				if(Array.isArray(response) && response.length > 0){
					template.secondState.set('withErrors');
					toastr['error'](TAPi18n.__(errorMessage), TAPi18n.__('common_error'));
					markErrors(response);
				}
				else {
					template.state.set('uploaded');
					template.secondState.set('ready');
					toastr['success'](TAPi18n.__(successMessage), TAPi18n.__('common_success'));
				}
			}
			btnIcon.removeClass('fa-spin fa-refresh').addClass(iconClass);
		});
	});
};

Template.import.events({
	'click .run-import': (event, template) => {
		execute(event, template, 'import');
	},
	'click .test-import': (event, template) => {
		execute(event, template, 'test');
	},
	'click .replace': (event, template) => {
		var findInput = $('input[name=find]');
		var find = findInput.val();
		var replaceInput = $('input[name=replace]');
		var replace = replaceInput.val();
		var fieldInput = $('select[name=field]');
		var field = fieldInput.val();
		var patientsBuffer = Session.get('patientsBuffer');

		patientsBuffer.forEach(function(patient, index, patients){
			if(patient[field]){
				patient[field] = patient[field].replace(find, replace);
			}
		});
		Session.set('patientsBuffer', patientsBuffer);
		toastr['success'](TAPi18n.__('Substituição Completa. Teste a importação novamente.'), TAPi18n.__('common_success'));
	},
	'click .cancel-import': (event, template) => {
		Session.set('patientsBuffer', undefined);
		delete Session.keys.patientsBuffer;
		template.state.set('idle');
	},
	'change [name="uploadCSV"]': (event, template) => {
		template.state.set('uploading');

		Papa.parse( event.target.files[0], {
			header: true,
			complete: function(results) {
				results.data.forEach(function(item, index) {
					item = normalize(item);
				});

				results.data = results.data.filter(function(item) { 
					if(item.name){
						return item.name.length > 2;
					}
					else {
						return false;
					}
				});

				Session.set('patientsBuffer', results.data);
				template.state.set('uploaded');
			}
		});
	}
});