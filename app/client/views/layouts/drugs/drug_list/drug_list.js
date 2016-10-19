Template.drugList.events({
	'click .new-record': function(event, template) {
		FlowRouter.go('drugCreate');
	}
});

Template.drugList.helpers({
	reactiveDataFunction: function () {
		return function () {
			return Drugs.find().fetch();
		};
	},
	optionsObject: {
		columns: [{
			title: T9n.get('name'),
			data: 'name'
		},{
			data: '_id',
			render: function(cellData, renderType, currentRow) {
				return '<a class="btn btn-info" href="' + FlowRouter.path('drugEdit', {_id: cellData}) + '"><i class="glyphicon glyphicon-edit patient-id" aria-hidden="true" data-userid="' + cellData + '"></i></a>';
			}
		}]
	}
});

Template.drugList.onCreated(function () {});

Template.drugList.onRendered(function () {
	var table = this.data.dataTable;
	$(document).ready(function(){
		$('#drugs-table tbody').on( 'click', 'tr', function () {
			var rowData = table.row(this).data();
			FlowRouter.go('drugEdit', {_id: rowData._id})
		});
	});
});

Template.drugList.onDestroyed(function () {});
