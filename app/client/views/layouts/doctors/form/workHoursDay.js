Template.workHoursDay.helpers({
	dayOfWeek: function(day){
		return moment().startOf('week').add(day, 'days').format('dddd');
	}
});

Template.workHoursDay.rendered = function(){
	$('#day-of-week-' + this.data.day + ' .js-switch')
		.each(function(index, element) {
			var switchery = new Switchery(element, {
				size: 'small',
				color: 'rgba(0,150,136,0.502)',
				secondaryColor: '#b9b9b9',
				jackColor: 'rgb(5, 130, 118)',
				jackSecondaryColor: '#ffffff'
			});
		});
	$('#day-of-week-' + this.data.day + ' .js-switch').on('change', function(event){
		$(event.target.parentElement.parentElement).find('.open-close-desc span').toggle('hide');
		$(event.target.parentElement.parentElement).find('.hours').toggle('hide');
	});
	$('#day-of-week-' + this.data.day + ' .clockpicker').clockpicker();
};

Template.workHoursDay.events({
	'click .add-hours'(event, templateInstance) {
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