Template.doctorForm.onCreated(function () {});

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
	doctor: function() {
		return Meteor.users.findOne({_id: FlowRouter.getParam('_id')}); 
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
	'click button[type=submit]': (event, template) => {
		event.preventDefault();
		try{
			var hours = getHours.call(this, event, template);
			Meteor.call('doctorSpecialtyHours', FlowRouter.getParam('_id'), {
				"specialties": $('select[name=specialties]').val(),
				"workHours": hours
			}, function(error, result){
				if (error) {
					throw error;
				}
				if (result) {
					toastr['success'](result, TAPi18n.__('common_success'));
				}
			});
		} catch (error) {
			toastr['error'](error.message, TAPi18n.__('common_error'));
		}
	},
	'click .cancel': (event, template) => {
		FlowRouter.go('doctorsList');
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

				var startEl = $(el).find('.hours-start input');
				var start = startEl.val();
				var endEl = $(el).find('.hours-end input');
				var end = endEl.val();
				
				validateInterval(startEl, start, endEl, end);

				workHours[index][i] = {};
				workHours[index][i].start = start;
				workHours[index][i].end =  end;
			});
		}
	});
	return workHours;
};

var validateInterval = function(startEl, start, endEl, end){
	clearError(startEl, endEl);

	if(!start){
		markError(startEl);
	}
	if(!end){
		markError(endEl);
	}
	if(!start || !end){
		throw new Meteor.Error('ValidationError', TAPi18n.__('doctors_work-hours-validation-error'));
	}

	var mStart = moment(start, 'HH:mm:ss');
	var mEnd = moment(end, 'HH:mm:ss');

	if(mEnd.diff(mStart) < 0) {
		markError(startEl, endEl);
		throw new Meteor.Error('ValidationError', TAPi18n.__('doctors_work-hours-validation-start-end-diff-error'));
	}
};

var clearError = function(){
	var args = Array.prototype.slice.call(arguments);
	args.forEach(function(el, index){
		$(el).parent().removeClass('has-error');
	});
};

var markError = function(){
	var args = Array.prototype.slice.call(arguments);
	args.forEach(function(el, index){
		$(el).parent().addClass('has-error');
	});
};