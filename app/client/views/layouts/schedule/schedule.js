var randomMC = require('/imports/client/randomColor.js');

Template.schedule.events({});

Template.schedule.helpers({
    patients: function(){
        return Patients.find();
    },
});

Template.schedule.onCreated(function () {});

Template.schedule.onRendered(function () {
    $('.chosen-select').chosen({width: "100%"});

    // #TODO reactive change locale and set timezones
    // $('#locale-selector').on('change', function() {
    //     if (this.value) {
    //         $('#calendar').fullCalendar('option', 'locale', this.value);
    //     }
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
                else {
                    workHours.push({
                        start: '00:00',
                        end: '00:00',
                        dow: [dayIndex]
                    });
                }
            });
        }
        calResources.push({
            id: doctor._id,
            title: doctor.profile.firstName + ' ' + doctor.profile.lastName,
            eventColor: doctor.color ? doctor.color : randomMC.getColor(),
            //eventBackgroundColor    Like eventColor but only for the background color
            // eventBorderColor    Like eventColor but only for the border color
            // eventTextColor  Like eventColor but only for the text color
            // eventClassName  className(s) that will apply to events
            businessHours: workHours
        });
    });

    var events = Schedule.find().fetch();

    var calendar = $('#calendar').fullCalendar({
        defaultView: 'timelineDay',
        slotDuration: '00:20:00',
        minTime: '06:00:00',
        maxTime: '23:00:00',
        locale: TAPi18n.getLanguage().toLowerCase(),
        aspectRatio: 1.8,
        navLinks: true,
        //scrollTime: '00:00', // undo default 6am scrollTime
        editable: true,
        resourceLabelText: TAPi18n.__('users_doctors'),
        header: {
            left: 'today prev,next',
            center: 'title',
            right: 'timelineDay,timelineThreeDays,listDay,listWeek,agendaDay,agendaWeek,month'
        },
        buttonText: {
            today: TAPi18n.__('schedule_today')
        },
        views: {
            timelineDay: {
                buttonText: TAPi18n.__('schedule_timelineDay')
            },
            timelineThreeDays: {
                type: 'timeline',
                buttonText: TAPi18n.__('schedule_timelineThreeDays'),
                duration: { 
                    days: 3 
                }
            },
            listDay: { 
                buttonText: TAPi18n.__('schedule_listDay')
            },
            listWeek: { 
                buttonText: TAPi18n.__('schedule_listWeek')
            },
            agendaDay: { 
                buttonText: TAPi18n.__('schedule_agendaDay')
            },
            agendaWeek: { 
                buttonText: TAPi18n.__('schedule_agendaWeek')
            },
            month: { 
                buttonText: TAPi18n.__('schedule_month')
            }
        },
        //droppable: true, // this allows things to be dropped onto the calendar
        // drop: function() {
        //     // is the "remove after drop" checkbox checked?
        //     if ($('#drop-remove').is(':checked')) {
        //         // if so, remove the element from the "Draggable Events" list
        //         $(this).remove();
        //     }
        // },
        selectable: true,
        selectHelper: true,
        selectOverlap: false,
        selectAllow: function(selectInfo) {
            var doctor = doctors.find(function(index){
                return index._id === selectInfo.resourceId;
            });
            if(doctor) {
                var weekday = selectInfo.start.day();
                if(doctor.workHours[weekday] === null){
                    return false;
                }
                else {
                    var allowed = false;
                    doctor.workHours[weekday].forEach(function(element, index, array){
                        var docStart = moment(element.start, 'HH:mm');
                        var docEnd  = moment(element.end, 'HH:mm');
                        var calStart = moment(selectInfo.start.format('HH:mm'), 'HH:mm');
                        var calEnd = moment(selectInfo.end.format('HH:mm'), 'HH:mm');
                        if(calStart.isBetween(docStart, docEnd) || (calStart.diff(docStart) === 0)){
                            allowed = true;
                        }
                    });
                    if(!allowed) {
                        return false;
                    }
                }
            }
        },
        select: function(start, end, jsEvent, view, resource){
            var calEvent = null;
            var scheduleEvent = null;
            try{
                Meteor.call('saveScheduleEvent', {
                    resourceId: resource.id,
                    start: start.format(),
                    end: end.format(),
                    title: TAPi18n.__('schedule_to-confirm'),
                    constraint: 'available_hours'
                }, function(error, result){
                    if (error) {
                        throw error;
                    }
                    if (result) {
                        calEvent = calendar.fullCalendar('renderEvent', {
                            title: TAPi18n.__('schedule_to-confirm'),
                            start: start.format(),
                            end: end.format(),
                            resourceId: resource.id,
                            //description: ""
                        }, true);

                        scheduleEvent = result;
                        $('#scheduleEventForm .scheduleTitle').html(start.format('LLLL'));
                        $('#scheduleEventForm').modal();
                        $('#scheduleEventForm .save').off('click');
                        $('#scheduleEventForm .delete-btn').off('click');
                        $('#scheduleEventForm .save').click(function(event){
                            var patient = $('#scheduleEventForm select[name=patients]').val();
                            patient = Patients.findOne({_id: patient});
                            if(patient){
                                Meteor.call('saveScheduleEvent', {
                                    patient: patient._id,
                                    title: patient.name
                                },
                                result,
                                function(error, result){
                                    if (error) {
                                        throw error;
                                    }
                                    if (result) {
                                         $('#calendar').fullCalendar('removeEvents', function(event){
                                            return (event._id === calEvent[0]._id);
                                        });
                                        calendar.fullCalendar('renderEvent', {
                                            title: patient.name,
                                            start: start,
                                            end: end,
                                            resourceId: resource.id,
                                            //description: ""
                                        }, true);
                                        calendar.fullCalendar('unselect');
                                        $('#scheduleEventForm').modal('hide');
                                        toastr['success'](result, TAPi18n.__('common_success'));
                                    }
                                });
                            }
                        });
                        $('#scheduleEventForm .delete-btn').click(function(event){
                            Meteor.call('deleteScheduleEvent', scheduleEvent,
                            function(error, result){
                                if (error) {
                                    throw error;
                                }
                                if (result) {
                                    $('#calendar').fullCalendar('removeEvents', function(event){
                                        return (event._id === calEvent[0]._id);
                                    });
                                    toastr['warning'](TAPi18n.__('schedule_event-canceled'), TAPi18n.__('common_success'));
                                }
                            });
                        });
                    }
                });
            } catch (error) {
                toastr['error'](error.message, TAPi18n.__('common_error'));
            }
        },
        eventClick: function(calEvent, jsEvent, view) {
            $('#scheduleEventForm .scheduleTitle').html(calEvent.start.format('LLLL'));
            $('#scheduleEventForm').modal();
            $('#scheduleEventForm select[name=patients]').val(calEvent.patient);
            $('.chosen-select').trigger('chosen:updated');
            $('#scheduleEventForm .save').off('click');
            $('#scheduleEventForm .delete-btn').off('click');
            $('#scheduleEventForm .save').click(function(event){
                var patient = $('#scheduleEventForm select[name=patients]').val();
                patient = Patients.findOne({_id: patient});
                if(patient){
                    Meteor.call('saveScheduleEvent', {
                        patient: patient._id,
                        title: patient.name
                    },
                    calEvent._id,
                    function(error, result){
                        if (error) {
                            throw error;
                        }
                        if (result) {
                            $('#calendar').fullCalendar('removeEvents', function(event){
                                return (event._id === calEvent._id);
                            });
                            calendar.fullCalendar('renderEvent', {
                                title: patient.name,
                                start: calEvent.start,
                                end: calEvent.end,
                                resourceId: calEvent.resourceId,
                                //description: ""
                            }, true);
                            calendar.fullCalendar('unselect');
                            $('#scheduleEventForm').modal('hide');
                            toastr['success'](result, TAPi18n.__('common_success'));
                        }
                    });
                }
            });
            $('#scheduleEventForm .delete-btn').click(function(event){
                Meteor.call('deleteScheduleEvent', calEvent._id,
                function(error, result){
                    if (error) {
                        throw error;
                    }
                    if (result) {
                        $('#calendar').fullCalendar('removeEvents', function(event){
                            return (event._id === calEvent._id);
                        });
                        toastr['warning'](TAPi18n.__('schedule_event-canceled'), TAPi18n.__('common_success'));
                    }
                });
            });
        },
        eventRender: function(event, element, timelineView) {
            if((timelineView.name == "timelineDay") || (timelineView.name == "timelineThreeDays")) {
                element.find('.fc-title').html('<i class="fa fa-clock-o" aria-hidden="true"></i>');
            }
            element.qtip({
                position: {
                    target: 'mouse',
                    adjust: {
                        x: 10,
                        y: 4,
                        mouse: true,
                        screen: true,
                        scroll: false,
                        resize: false
                    }
                },
                show: { 
                    solo: true 
                },
                style: { 
                    classes: 'qtip-bootstrap agenda-tooltip'
                },
                //content: event.description
                content: event.title
            });
        },
        //resourceOrder: '-type1,type2',
        resourceText: function(resource){
            return 'Leo';
        },
        resourceRender: function(resourceObj, labelTds, bodyTds) {
            // console.log(arguments);
            // labelTds.css('background', 'blue');
        },
        resources: calResources,
        events: events,
    });
});

Template.schedule.onDestroyed(function () {
    $('#calendar').fullCalendar('destroy');
});
