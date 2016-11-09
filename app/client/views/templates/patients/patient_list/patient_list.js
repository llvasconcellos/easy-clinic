Template.patientList.events({
	'click .new-record': (event, template) => {
		FlowRouter.go('patientCreate');
	}
});

Template.patientList.helpers({
	reactiveDataFunction: function () {
		return function () {
			return Patients.find().fetch();
		};
	},
	optionsObject: {
		columns: [{
			title: '',
			//width: '1%',
			data: 'picture',
			orderable: false,
			render: function(cellData, renderType, currentRow) {
				//var url = Meteor.absoluteUrl() + 'images/default-user-image.png';
				var url = 'https://s-media-cache-ak0.pinimg.com/originals/28/c7/ad/28c7adffc9af705dcd8a8b77b1a9c0e8.jpg';
				if(cellData){
					var image = Images.findOne({'_id': cellData});
					if(image) {
						url = image.link();
					}
				} else {
					if(currentRow.email){
						url = Gravatar.imageUrl(currentRow.email, {
							secure: true,
							size: 28,
							default: url
						});
					}
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
				return '<a class="btn btn-info" href="' + FlowRouter.path('patientEdit', {_id: cellData}) + '"><i class="glyphicon glyphicon-edit" aria-hidden="true"></i></a>';
			}
		}]
	}
});

Template.patientList.onCreated(function () {});

Template.patientList.onRendered(function () {
	var table = this.data.dataTable;
	$(document).ready(function(){
		$('#patients-table tbody').on( 'click', 'tr', function () {
			var rowData = table.row(this).data();
			FlowRouter.go('patientEdit', {_id: rowData._id})
		});
	});
});

Template.patientList.onDestroyed(function () {});