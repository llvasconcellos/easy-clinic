Template.users.onCreated(function(){
	this.autorun(() => {
		this.subscribe('allUsers');
	});
});

Template.users.rendered = function(){
};

Template.users.destroyed = function(){
};

Template.users.helpers({
	reactiveDataFunction: function () {
		return function () {
			return Meteor.users.find().fetch();
		};
	},
	optionsObject: {
		tableClasses: 'table table-striped table-bordered table-hover',
		dom: '<"html5buttons"B>lTfgitp',
		buttons: [
			{extend: 'copy'},
			{extend: 'csv'},
			{extend: 'excel', title: 'ExampleFile'},
			{extend: 'pdf', title: 'ExampleFile'},
			{extend: 'print', customize: function (win){
				$(win.document.body).addClass('white-bg');
				$(win.document.body).css('font-size', '10px');
				$(win.document.body).find('table')
					.addClass('compact')
					.css('font-size', 'inherit');
			}
		}],
		fnDrawCallback: function(settings, json) {
			$('.js-switch').each(function(index, element) {
				if(!$(element).data('switchery')) {
					var switchery = new Switchery(element, {
						size: 'small',
						secondaryColor: '#ED5565'
					});
				}
			});
		},
		columns: [{
			title: 'Photo',
			data: 'profile.picture',
			render: function(cellData, renderType, currentRow) {
				var email = currentRow.emails[0].address;
				var url = Gravatar.imageUrl(email, {
					size: 50,
					//default: 'images/default-user-image.png'
					default: 'https://cdn4.iconfinder.com/data/icons/medical-14/512/9-128.png'
				});
				var img = '<img class="img-circle" src="' + url + '" style="width:28px">';
				return img;
			},
			className: 'imageColumn'
		},{
			title: 'Real Name',
			data: 'profile.firstName',
			render: function(cellData, renderType, currentRow) {
				return currentRow.profile.firstName + ' ' + currentRow.profile.lastName;
			},
			className: 'nameColumn'
		},{
			title: 'Email',
			data: 'emails[0].address',
			className: 'nameColumn',
			render: function(cellData, renderType, currentRow) {
				return '<i class="fa fa-envelope"> </i>&nbsp;' + currentRow.emails[0].address;
			}
		},{
			title: 'Ativo',
			data: 'profile.firstName',
			render: function(cellData, renderType, currentRow) {
				return '<input type="checkbox" class="js-switch" checked />';
			},
			className: 'nameColumn'
		}]
	}
});