/*****************************************************************************/
/* SpecialtyList: Event Handlers */
/*****************************************************************************/
Template.specialtyList.events({
	'click .new-user': function(event, template) {
		Router.go('createSpecialty');
	}
});

/*****************************************************************************/
/* SpecialtyList: Helpers */
/*****************************************************************************/
Template.specialtyList.helpers({
	reactiveDataFunction: function () {
		return function () {
			return Specialties.find().fetch();
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
		infoCallback: function(settings, start, end, max, total, pre) {
			var str = settings.oLanguage.sInfo
				.replace('_START_', start)
				.replace('_END_', end)
				.replace('_TOTAL_', total);
			$('#table-footer').html(str);
		},
		columns: [{
			title: T9n.get('name'),
			data: 'name'
		},{
			data: '_id',
			render: function(cellData, renderType, currentRow) {
				return '<a href="' + Router.path('editSpecialty', {_id: cellData}) + '"><i class="glyphicon glyphicon-edit patient-id" aria-hidden="true" data-userid="' + cellData + '"></i></a>';
			}
		}]
	}
});

/*****************************************************************************/
/* SpecialtyList: Lifecycle Hooks */
/*****************************************************************************/
Template.specialtyList.onCreated(function () {
});

Template.specialtyList.onRendered(function () {
});

Template.specialtyList.onDestroyed(function () {
});
