Template.specialtyList.events({
	'click .new-record': function(event, template) {
		FlowRouter.go('specialtyCreate');
	}
});

Template.specialtyList.helpers({
	reactiveDataFunction: function () {
		return function () {
			return Specialties.find().fetch();
		};
	},
	optionsObject: {
		columns: [{
			title: T9n.get('name'),
			data: 'name'
		},{
			data: '_id',
			render: function(cellData, renderType, currentRow) {
				return '<a class="btn btn-info" href="' + FlowRouter.path('specialtyEdit', {_id: cellData}) + '"><i class="glyphicon glyphicon-edit patient-id" aria-hidden="true" data-userid="' + cellData + '"></i></a>';
			}
		}]
	}
});

Template.specialtyList.onCreated(function () {});

Template.specialtyList.onRendered(function () {
	var table = this.data.dataTable;
	$(document).ready(function(){
		$('#specialties-table tbody').on( 'click', 'tr', function () {
			var rowData = table.row(this).data();
			FlowRouter.go('specialtyEdit', {_id: rowData._id})
		});
	});
});

Template.specialtyList.onDestroyed(function () {});
