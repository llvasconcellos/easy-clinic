var randomMC = require('/imports/client/randomColor.js');

//console.log(randomMC.getColor());
//var colorUsingShade = randomMC.getColor({ shades: ['200', '300'], text:'Some Random Text' });

Template.schedule.events({});

Template.schedule.helpers({});

Template.schedule.onCreated(function () {});

Template.schedule.onRendered(function () {

    // #TODO reactive change locale and set timezones
    // $('#locale-selector').on('change', function() {
    //     if (this.value) {
    //         $('#calendar').fullCalendar('option', 'locale', this.value);
    //     }
    // });


    // Initialize i-check plugin
    // $('.i-checks').iCheck({
    //     checkboxClass: 'icheckbox_square-green',
    //     radioClass: 'iradio_square-green',
    // });

    // Initialize the external events
    // $('#external-events div.external-event').each(function() {

    //     // store data so the calendar knows to render an event upon drop
    //     $(this).data('event', {
    //         title: $.trim($(this).text()), // use the element's text as the event title
    //         stick: true // maintain when user navigates (see docs on the renderEvent method)
    //     });

    //     // make the event draggable using jQuery UI
    //     $(this).draggable({
    //         zIndex: 1111999,
    //         revert: true,      // will cause the event to go back to its
    //         revertDuration: 0  //  original position after the drag
    //     });

    // });




    var doctors = Meteor.users.find({'profile.group':'medical_doctor'}).fetch();
    calResources = [];
    doctors.forEach(function(doctor, doctorIndex){
        if(doctor.workHours){
            var workHours = [];
            doctor.workHours.forEach(function(day, dayIndex){
                if(day){
                    day.forEach(function(interval, index){
                        workHours.push({
                            start: interval.start,
                            end: interval.end,
                            dow: [dayIndex]
                        });
                    });
                }
            });
            console.log('===================');
            console.log(workHours);
            console.log('===================');
        }
        calResources.push({
            id: doctor._id,
            title: doctor.profile.firstName + ' ' + doctor.profile.lastName,
            eventColor: randomMC.getColor(),
            //eventBackgroundColor    Like eventColor but only for the background color
            // eventBorderColor    Like eventColor but only for the border color
            // eventTextColor  Like eventColor but only for the text color
            // eventClassName  className(s) that will apply to events
            businessHours: workHours
        });
    });






    // Initialize the calendar
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $('#calendar').fullCalendar({
        header: {
            left: 'today prev,next',
            center: 'title',
            right: 'timelineDay,timelineThreeDays,agendaWeek,agendaDay,month'
        },
        views: {
            timelineThreeDays: {
                type: 'timeline',
                duration: { days: 3 }
            }
        },
        minTime: '00:00:00',
        maxTime: '24:00:00',
        locale: TAPi18n.getLanguage(),
        now: '2016-09-07',
        defaultView: 'timelineDay',
        aspectRatio: 1.8,
        //scrollTime: '00:00', // undo default 6am scrollTime
        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar
        drop: function() {
            // is the "remove after drop" checkbox checked?
            if ($('#drop-remove').is(':checked')) {
                // if so, remove the element from the "Draggable Events" list
                $(this).remove();
            }
        },
        resourceLabelText: TAPi18n.__('users_doctors'),
        resources: calResources,
        events: [{
            "id": "1",
            "resourceId": "a",
            "start": "2016-09-07T10:00:00",
            "end": "2016-09-07T15:00:00",
            "title": "event 1",
            constraint: 'available_hours'
        },{
            "id": "2",
            "resourceId": "c",
            "start": "2016-09-07T11:00:00",
            "end": "2016-09-07T22:00:00",
            "title": "event 2",
            constraint: 'available_hours'
        },{
            "id": "3",
            "resourceId": "d",
            "start": "2016-09-06",
            "end": "2016-09-08",
            "title": "event 3",
            constraint: 'available_hours'
        },{
            "id": "4",
            "resourceId": "e",
            "start": "2016-09-07T13:00:00",
            "end": "2016-09-07T18:00:00",
            "title": "event 4",
            constraint: 'available_hours'
        },{
            "id": "5",
            "resourceId": "f",
            "start": "2016-09-07T00:30:00",
            "end": "2016-09-07T02:30:00",
            "title": "event 5",
            constraint: 'available_hours'
        }],
    });
});

Template.schedule.onDestroyed(function () {});
