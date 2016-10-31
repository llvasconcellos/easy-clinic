Template.prescriptionList.events({
	'click .new-record': function(event, template) {
		FlowRouter.go('prescriptionCreate');
	}
});

Template.prescriptionList.helpers({
	reactiveDataFunction: function () {
		return function () {
			return Prescriptions.find().fetch();
		};
	},
	optionsObject: {
		columns: [{
			title: T9n.get('name'),
			data: 'name'
		},{
			data: '_id',
			render: function(cellData, renderType, currentRow) {
				return '<a class="btn btn-info" href="' + FlowRouter.path('prescriptionEdit', {_id: cellData}) + '"><i class="glyphicon glyphicon-edit" aria-hidden="true"></i></a>';
			}
		}]
	}
});

Template.prescriptionList.onCreated(function () {});

Template.prescriptionList.onRendered(function () {
	var table = this.data.dataTable;
	$(document).ready(function(){
		$('#prescriptions-table tbody').on( 'click', 'tr', function () {
			var rowData = table.row(this).data();
			FlowRouter.go('prescriptionEdit', {_id: rowData._id})
		});
	});
});

Template.prescriptionList.onDestroyed(function () {});
