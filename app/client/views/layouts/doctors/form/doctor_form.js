Template.doctorForm.helpers({
	saveButton: function () {
		return Spacebars.SafeString('<i class="fa fa-floppy-o" aria-hidden="true"></i> ' + TAPi18n.__('common_save'));
	},
	formTitle: function() {
		return TAPi18n.__('doctors_form-title', this.profile.firstName + ' ' + this.profile.lastName);
	},
	specialties: function(){
		return Specialties.find();
	},
	isSelected: function(specialty) {
		var user = Template.parentData(1);
		if($.inArray(specialty, user.specialties) != -1){
			return 'selected';
		}
	},
});

Template.doctorForm.rendered = function(){
	$('.chosen-select').chosen({width: "100%"});
};

Template.doctorForm.events({
	'click button[type=submit]': function(event, template) {
		event.preventDefault();
		var hours = getHours.call(this, event, template);
		Meteor.call('doctorSpecialtyHours', this._id, {
			"specialties": $('select[name=specialties]').val(),
			"workHours": hours
		}, function(error, result){
			if (error) {
				toastr['error'](error.message, TAPi18n.__('common_error'));
			}
			if (result) {
				toastr['success'](result, TAPi18n.__('common_success'));
			}
		});
	},
	'click .cancel': function(event, template) {
		Router.go('doctorsList');
	}
});

var getHours = function(template){
	var workHours = [];
	var whEl = $('.work-hours');
	whEl.children().each(function(index, element){
		workHours[index] = null;
		var dayEl = $(element);
		if(dayEl.find('input[type=checkbox]').prop("checked")){
			workHours[index] = [];
			dayEl.find('.hours').each(function(i, el){
				workHours[index][i] = {};
				workHours[index][i].start = $(el).find('.hours-start input').val();
				workHours[index][i].end =  $(el).find('.hours-end input').val();
			});
		}
	});
	return workHours;
};