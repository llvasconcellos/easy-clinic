Template.formModelsList.events({
	'click .new-record': function(event, template) {
		FlowRouter.go('formModelCreate');
	}
});

Template.formModelsList.helpers({
	reactiveDataFunction: function () {
		return function () {
			return FormModels.find().fetch();
		};
	},
	optionsObject: {
		columns: [{
			title: T9n.get('name'),
			data: 'name'
		},{
			title: T9n.get('description'),
			data: 'description'
		},{
			data: '_id',
			render: function(cellData, renderType, currentRow) {
				return '<a class="btn btn-info" href="' + FlowRouter.path('formModelEdit', {_id: cellData}) + '"><i class="glyphicon glyphicon-edit patient-id" aria-hidden="true"></i></a>';
			}
		}]
	}
});

Template.formModelsList.onCreated(function () {});

Template.formModelsList.onRendered(function () {
	var table = this.data.dataTable;
	$(document).ready(function(){
		$('#form-models-table tbody').on( 'click', 'tr', function () {
			var rowData = table.row(this).data();
			FlowRouter.go('formModelEdit', {_id: rowData._id})
		});
	});
});

Template.formModelsList.onDestroyed(function () {});
