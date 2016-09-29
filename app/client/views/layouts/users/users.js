Template.users.onCreated(function(){
	// this.autorun(() => {
	// 	this.subscribe('allUsers');
	// });
});

Template.users.rendered = function(){};

Template.users.destroyed = function(){};

Template.users.helpers({
	users: function () {
		return Meteor.users.find();
	},
	reactiveDataFunction: function () {
		return function () {
			return Meteor.users.find().fetch();
		};
	},
	optionsObject: {
		//info: false,
		tableClasses: 'table table-striped table-bordered table-hover',
		dom: '<"html5buttons"B>lTfgitp',
		buttons: [{
			extend: 'copy',
			text: '<i class="fa fa-files-o" aria-hidden="true"></i> ' + T9n.get('common_copy')
		},{
			extend: 'csv',
			text: '<i class="fa fa-file-excel-o" aria-hidden="true"></i> CSV'
		},{
			extend: 'print',
			text: '<i class="fa fa-print" aria-hidden="true"></i> ' + T9n.get('common_print'),
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
			width: '1%',
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
			width: '1%',
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
			width: '1%',
			data: '_id',
			render: function(cellData, renderType, currentRow) {
				return '<i class="fa fa-pencil user-id" aria-hidden="true" data-userid="' + cellData + '"></i>';
			}
		}]
	}
});

Template.users.events({
	'click .user-id': function(event, template) {
		var userId = event.currentTarget.dataset.userid;
		// var user = Meteor.users.findOne({_id: userId});
		// var form = $('form#user-form');
		// var firstName = form.find('input[name=firstName]');
		// var lastName = form.find('input[name=lastName]');
		// var email = form.find('input[name=email]');
		// var password = form.find('input[name=password]');
		// var enabled = form.find('input[name=enabled]');
		// firstName.val(user.profile.firstName);
		// lastName.val(user.profile.lastName);
		// email.val(user.emails[0].address);
		// password.attr('placeholder', TAPi18n.__('users_changepassword'));
		// enabled.attr('checked', user.isUserEnabled);

		var edit = new userEdit();
		edit.loadForm(userId);
	}
});


var userEdit = function(){
	var form = $('form#user-form');
	var firstName = form.find('input[name=firstName]');
	var lastName = form.find('input[name=lastName]');
	var email = form.find('input[name=email]');
	var password = form.find('input[name=password]');
	var enabled = form.find('input[name=enabled]');
	var save = form.find('button[type=submit]');

	var user = null;

	(function() {
		form.submit(function(event) {
			Meteor.call('updateUser', user._id, {
				emails: {
					0: {
						address: email.val(),
					}
				},
				profile: {
					firstName: firstName.val(),
					lastName: lastName.val(),
				}
			});
			event.preventDefault();
		});
	})();

	return {
		loadForm(userId) {
			user = Meteor.users.findOne({_id: userId});
			firstName.val(user.profile.firstName);
			lastName.val(user.profile.lastName);
			email.val(user.emails[0].address);
			password.attr('placeholder', TAPi18n.__('users_changepassword'));
			enabled.attr('checked', user.isUserEnabled);
		},

	}
};