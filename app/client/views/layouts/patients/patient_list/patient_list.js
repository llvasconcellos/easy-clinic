/*****************************************************************************/
/* PatientList: Event Handlers */
/*****************************************************************************/
Template.patientList.events({
	'click .new-user': (event, template) => {
		FlowRouter.go('createPatient');
	}
});

/*****************************************************************************/
/* PatientList: Helpers */
/*****************************************************************************/
Template.patientList.helpers({
	reactiveDataFunction: function () {
		return function () {
			return Patients.find().fetch();
		};
	},
	optionsObject: {
		//info: false,
		tableClasses: 'table table-striped table-bordered table-hover',
		dom: '<"html5buttons"B>lTfgitp',
		buttons: [{
			extend: 'copy',
			text: '<i class="fa fa-files-o" aria-hidden="true"></i>'
		},{
			extend: 'csv',
			text: '<i class="fa fa-file-excel-o" aria-hidden="true"></i>'
		},{
			extend: 'print',
			text: '<i class="fa fa-print" aria-hidden="true"></i>',
			customize: function (win){
				$(win.document.body).addClass('white-bg');
				$(win.document.body).css('font-size', '10px');
				$(win.document.body).find('table')
					.addClass('compact')
					.css('font-size', 'inherit');
			}
		}],
		// fnDrawCallback: function(settings, json) { #TODO: editar direto na tabela
		// 	$('.js-switch').each(function(index, element) {
		// 		if(!$(element).data('switchery')) {
		// 			var switchery = new Switchery(element, {
		// 				size: 'small',
		// 				color: '#2C8F7B',
		// 				secondaryColor: '#ED5565'
		// 			});
		// 		}
		// 	});
		// },
		infoCallback: function(settings, start, end, max, total, pre) {
			var str = settings.oLanguage.sInfo
				.replace('_START_', start)
				.replace('_END_', end)
				.replace('_TOTAL_', total);
			$('#table-footer').html(str);
		},
		columns: [{
			title: '',
			//width: '1%',
			data: 'picture',
			orderable: false,
			render: function(cellData, renderType, currentRow) {
				var url = '/images/default-user-image.png'; 
				var image = Images.findOne({'_id': cellData});
				if(image) {
					url = image.link();
				}
				return '<img class="profile-pic" src="' + url + '">';
			}
		},{
			title: T9n.get('name'),
			data: 'name'
		},{
			title: 'Email',
			data: 'email',
			render: function(cellData, renderType, currentRow) {
				var html = '';
				if(cellData) {
					html = '<i class="fa fa-envelope"></i>&nbsp;' + cellData;
				}
				return html;
			}
		},{
			data: '_id',
			render: function(cellData, renderType, currentRow) {
				return '<a href="' + FlowRouter.path('editPatient', {_id: cellData}) + '"><i class="glyphicon glyphicon-edit patient-id" aria-hidden="true" data-userid="' + cellData + '"></i></a>';
			}
		}]
	}
});

/*****************************************************************************/
/* PatientList: Lifecycle Hooks */
/*****************************************************************************/
Template.patientList.onCreated(function () {
	var self = this;
	self.autorun(function() {
		self.subscribe('patients');
	});
});

Template.patientList.onRendered(function () {
});

Template.patientList.onDestroyed(function () {
});
