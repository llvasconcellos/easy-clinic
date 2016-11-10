Template.doctorForm.onCreated(function () {});

var palette = ['#3f81c6', '#504bd0', '#b1932c', '#dd4f97', '#17cccc', '#55a7ff', '#8a86ff', '#ebc444', '#ff86c3', '#31dd81', '#ff9055', '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B'];
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
	colors: function() {
		return palette;
	},
	doctor: function() {
		Template.instance().data.doctor = Meteor.users.findOne({_id: FlowRouter.getParam('_id')}); 
		return Template.instance().data.doctor;
	},
	isColorSelected: function(color) {
		var user = Template.parentData(1);
		if($.inArray(color, palette) != -1){
			return 'selected';
		}
	},
	isSelected: function(specialty) {
		var user = Template.parentData(1);
		if($.inArray(specialty, user.specialties) != -1){
			return 'selected';
		}
	},
});

Template.doctorForm.rendered = function(){
	if(this.data.doctor.profile.CRM){
		$('textarea[name=signature]').val(this.data.doctor.profile.signature);
		$('input[name=CRM]').val(this.data.doctor.profile.CRM);
	}
	$('.colors-select .chosen-select').on('chosen:ready', function(event, params) {
		$('.colors-select .chosen-single').css('background', params.chosen.selected_item[0].firstChild.innerHTML);
	});
	$('.chosen-select').chosen({width: "100%"});
	$('.colors-select .chosen-select').on('change', function(event, params) {
		$('.colors-select .chosen-single').css('background', params.selected);
	});

	$("textarea[name=signature]").summernote({
		height: 150,
		lang: TAPi18n.getLanguage(),
		print: {
			stylesheetUrl: Meteor.absoluteUrl() + 'css/summernote-print.css'
		},
		fontSizes: ['4', '6', '8', '9', '10', '11', '12', '14', '16', '18', '20', '24', '36'],
		lineHeights: ['0.4', '0.6', '0.8', '1.0', '1.2', '1.4', '1.5', '1.6', '1.8', '2.0', '3.0'],
		toolbar: [
			['history', ['undo', 'redo']],
			['style', ['style', 'bold', 'italic', 'underline', 'clear']],
			['font', ['strikethrough', 'superscript', 'subscript']],
			['fontsize', ['fontsize']],
			['para', ['ul', 'ol', 'paragraph']],
			['height', ['height']],
			['insert', ['hr', 'table']],
			['misc', ['fullscreen', 'codeview', 'print']]
		]
	});
};

Template.doctorForm.events({
	'click button[type=submit]': (event, template) => {
		event.preventDefault();
		try{
			var hours = getHours.call(this, event, template);
			Meteor.call('doctorSpecialtyHours', FlowRouter.getParam('_id'), {
				"profile.signature": $('textarea[name=signature]').val(),
				"profile.CRM": $('input[name=CRM]').val(),
				"specialties": $('select[name=specialties]').val(),
				"color": $('select[name=color]').val(),
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
		FlowRouter.go('doctorList');
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