Template.certificateList.events({
	'click .new-record': function(event, template) {
		FlowRouter.go('certificateCreate');
	}
});

Template.certificateList.helpers({
	reactiveDataFunction: function () {
		return function () {
			return Certificates.find().fetch();
		};
	},
	optionsObject: {
		columns: [{
			title: T9n.get('name'),
			data: 'name'
		},{
			data: '_id',
			render: function(cellData, renderType, currentRow) {
				return '<a class="btn btn-info" href="' + FlowRouter.path('certificateEdit', {_id: cellData}) + '"><i class="glyphicon glyphicon-edit patient-id" aria-hidden="true" data-userid="' + cellData + '"></i></a>';
			}
		}]
	}
});

Template.certificateList.onCreated(function () {});

Template.certificateList.onRendered(function () {
	var table = this.data.dataTable;
	$(document).ready(function(){
		$('#certificates-table tbody').on( 'click', 'tr', function () {
			var rowData = table.row(this).data();
			FlowRouter.go('certificateEdit', {_id: rowData._id})
		});
	});
});

Template.certificateList.onDestroyed(function () {});
