Template.doctorList.events({});

Template.doctorList.helpers({
	reactiveDataFunction: function () {
		return function () {
			return Meteor.users.find({'profile.group':'medical_doctor'}).fetch();
		};
	},
	optionsObject: {
		columns: [{
			title: '',
			//width: '1%',
			data: 'profile.picture',
			orderable: false,
			render: function(cellData, renderType, currentRow) {
				var email = currentRow.emails[0].address;
				var url = Gravatar.imageUrl(email, {
					size: 28,
					//default: 'images/default-user-image.png'
					default: 'https://cdn4.iconfinder.com/data/icons/medical-14/512/9-128.png'
				});
				return '<img class="profile-pic" src="' + url + '">';
			}
		},{
			title: T9n.get('name'),
			data: 'profile.firstName',
			render: function(cellData, renderType, currentRow) {
				return currentRow.profile.firstName + ' ' + currentRow.profile.lastName;
			}
		},{
			title: 'Email',
			data: 'emails[0].address',
			render: function(cellData, renderType, currentRow) {
				return '<i class="fa fa-envelope"></i>&nbsp;' + currentRow.emails[0].address;
			}
		},{
			title: T9n.get('enabled'),
			//width: '1%',
			orderable: false,
			data: 'profile.firstName',
			render: function(cellData, renderType, currentRow) {
				// var checkbox = '<input type="checkbox" class="js-switch"'; #TODO: editar direto na tabela
				// checkbox += (currentRow.isUserEnabled) ? ' checked' : '';
				// checkbox += '/>';
				// return checkbox;
				var html = '<span class="label label-';
				html += (currentRow.isUserEnabled) ? 'primary' : 'danger';
				html += '">';
				html += (currentRow.isUserEnabled) ? T9n.get('enabled') : T9n.get('disabled');
				return html;
			}
		},{
			//title: T9n.get('edit'),
			//width: '1%',
			data: '_id',
			render: function(cellData, renderType, currentRow) {
				return '<a class="btn btn-info" href="' + FlowRouter.path('doctorEdit', {_id: cellData}) + '"><i class="glyphicon glyphicon-edit doctor-id" aria-hidden="true" data-userid="' + cellData + '"></i></a>';
			}
		}]
	}
});

Template.doctorList.onCreated(function () {});

Template.doctorList.onRendered(function () {
	var table = this.data.dataTable;
	$(document).ready(function(){
		$('#doctors-table tbody').on( 'click', 'tr', function () {
			var rowData = table.row(this).data();
			FlowRouter.go('doctorEdit', {_id: rowData._id})
		});
	});
});

Template.doctorList.onDestroyed(function () {});
