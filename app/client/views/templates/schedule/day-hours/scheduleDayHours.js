Template.scheduleDayHours.helpers({
    appointments: function(){
        var appointments = $('#calendar').fullCalendar('clientEvents');
        console.log(appointments);
        return ['a', 'b', 'c'];
    },
});