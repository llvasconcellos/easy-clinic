Template.workHoursDay.helpers({
	dayOfWeek: function(day){
		return moment().startOf('week').add(day, 'days').format('dddd');
	}
});

Template.workHoursDay.onRendered(function(){
	$('#day-of-week-' + this.data.day + ' .ios-switch-cb').on('change', function(event){
		$(event.target.parentElement.parentElement.parentElement).find('.open-close-desc span').toggle('hide');
		$(event.target.parentElement.parentElement.parentElement).find('.hours').toggle('hide');
	});
	$('#day-of-week-' + this.data.day + ' .clockpicker').clockpicker();

	loadHours.call(this);
});

Template.workHoursDay.events({
	'click .add-hours': (event, templateInstance) => {
		var hours = $(templateInstance.find('.hours')).clone();
		hours.addClass('new-line');
		hours.find('button').removeClass('btn-primary', 'add-hours')
				.addClass('btn-default')
				.html('<i class="fa fa-times" aria-hidden="true"></i>')
				.click(function(event){
					event.stopPropagation();
					hours.remove();
				});
		hours.find('.clockpicker').clockpicker();
		hours.appendTo(templateInstance.firstNode);
	}
});

var loadHours = function(){
	var templateInstance = this;
	if(templateInstance.data.hours && (templateInstance.data.hours.length > 0)){
		$(templateInstance.find('input[type=checkbox]')).trigger('click');
		templateInstance.find('.hours-start input').value = templateInstance.data.hours[0].start;
		templateInstance.find('.hours-end input').value = templateInstance.data.hours[0].end;
		var addBtn = templateInstance.find('.add-hours');
		templateInstance.data.hours.forEach(function(element, index, array){
			if(index !== 0){
				Template.workHoursDay.__eventMaps[0]["click .add-hours"].call({
					templateInstance: function() {
						return templateInstance;
				}},addBtn);
				var hoursEl = $(templateInstance.firstNode).find('.hours')[index];
				hours = $(hoursEl);
				hours.attr('style', '');
				hours.find('.hours-start input').val(element.start);
				hours.find('.hours-end input').val(element.end);
			}
		});
	}
	
};