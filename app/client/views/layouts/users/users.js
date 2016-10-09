Template.users.onCreated(function(){
	// this.autorun(() => {
	// 	this.subscribe('allUsers');
	// });
});

Template.users.rendered = function(){
	$('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green'
    });
};

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
				return '<i class="glyphicon glyphicon-edit user-id" aria-hidden="true" data-userid="' + cellData + '"></i>';
			}
		}]
	}
});

var userEdit = (function(){
	var form = null;
	var firstName = null;
	var lastName = null;
	var email = null;
	var password = null;
	var enabled = null;
	var save = null;

	var _findElements = function() {
		form = $('form#user-form');
		firstName = form.find('input[name=firstName]');
		lastName = form.find('input[name=lastName]');
		email = form.find('input[name=email]');
		password = form.find('input[name=password]');
		enabled = form.find('input[name=enabled]');
		save = form.find('button[type=submit]');
	};

	var _prepareForm = function(userId) {
		if($('#formbox').hasClass('col-sm-0')){
			$('#tablebox').toggleClass('col-sm-12 col-sm-8');
			$('#formbox').toggleClass('col-sm-0 col-sm-4');
			_findElements();
		}
		if(userId){
			password.attr('required', false);
		}
		else {
			password.attr('required', true);
		}
		form.off('submit');
		form.submit(function(event) {
			var newPassword = null;
			if(password.val().trim().length > 0) {
				newPassword = password.val().trim();
			}
			Meteor.call('updateUser', userId, newPassword, {
				"emails.0.address": email.val(),
				"profile.firstName": firstName.val(),
				"profile.lastName": lastName.val(),
				"isUserEnabled": enabled.is(':checked')
			}, function(error, result){
				if (error) {
					toastr['error'](error.message, TAPi18n.__('common_error'));
				}
				if (result) {
					toastr['success'](result, TAPi18n.__('common_success'));
					_clearForm();
					_hideForm();
				}
			});
			event.preventDefault();
		});
	};

	var _clearForm = function() {
		firstName.val('');
		lastName.val('');
		email.val('');
		password.val('');
		enabled.iCheck('uncheck');
		form.off('submit');
	};

	var _hideForm = function() {
		if($('#formbox').hasClass('col-sm-4')){
			$('#tablebox').toggleClass('col-sm-8 col-sm-12');
			$('#formbox').toggleClass('col-sm-4 col-sm-0');
		}
	}

	return {
		loadForm(userId) {
			_prepareForm(userId);
			if(userId){
				var user = Meteor.users.findOne({_id: userId});
				firstName.val(user.profile.firstName);
				lastName.val(user.profile.lastName);
				email.val(user.emails[0].address);
				password.attr('placeholder', TAPi18n.__('users_changepassword'));
				if (user.isUserEnabled) {
					enabled.iCheck('check');
				}
				else {
					enabled.iCheck('uncheck');
				}
			}
		},
		hideForm: function() {
			_hideForm();
		}
	}
})();


Template.users.events({
	'click .user-id': function(event, template) {
		var userId = event.currentTarget.dataset.userid;
		userEdit.loadForm(userId);
	},
	'click .new-user': function(event, template) {
		userEdit.loadForm(null);
	},
	'click .cancel': function(event, template) {
		userEdit.hideForm();
	}
});