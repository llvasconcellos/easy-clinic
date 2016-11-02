Template.documentModelList.events({
	'click .new-record': function(event, template) {
		FlowRouter.go('documentModelCreate');
	}
});

Template.documentModelList.helpers({
	reactiveDataFunction: function () {
		return function () {
			return DocumentModels.find().fetch();
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
			title: T9n.get('type'),
			data: 'type',
			render: function(cellData, renderType, currentRow) {
				var className = '';
				var type = '';
				switch(cellData){
					case 'prescription':
						className = 'info';
						type = TAPi18n.__('common_prescription');
					break;
					case 'medical_certificate':
						className = 'warning';
						type = TAPi18n.__('common_medical-certificate');
					break;
					case 'exam_request':
						className = 'danger';
						type = TAPi18n.__('common_exam-request');
					break;
				}
				return '<span class="label label-' + className + '">' + type + '</span>';
			}
		},{
			data: '_id',
			render: function(cellData, renderType, currentRow) {
				return '<a class="btn btn-info" href="' + FlowRouter.path('documentModelEdit', {_id: cellData}) + '"><i class="glyphicon glyphicon-edit" aria-hidden="true"></i></a>';
			}
		}]
	}
});

Template.documentModelList.onCreated(function () {});

Template.documentModelList.onRendered(function () {
	var table = this.data.dataTable;
	$(document).ready(function(){
		$('#document-model-table tbody').on( 'click', 'tr', function () {
			var rowData = table.row(this).data();
			FlowRouter.go('documentModelEdit', {_id: rowData._id})
		});
	});
});

Template.documentModelList.onDestroyed(function () {});
