var randomMC = require('/imports/client/randomColor.js');

Template.schedule.events({});

Template.schedule.helpers({
    patients: function(){
        return Patients.find();
    },
});

Template.schedule.onCreated(function () {});

Template.schedule.onRendered(function () {
    $('.patients-chosen-select').chosen({width: "100%"});

    // Hack to make slider container overflow visible so chosen displays correctly
    $(".patients-chosen-select").on("chosen:showing_dropdown", function () { 
        $(".carousel-inner").css("overflow", "visible");
    });
    $(".patients-chosen-select").on("chosen:hiding_dropdown", function () {
        $(".carousel-inner").css("overflow", "");
    });

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

    $('#scheduleEventForm').on('hidden.bs.modal', function (e) {
         $("#content-switcher").carousel(0);
    })

    var showEventModal = function(scheduleEvent){
        event = Schedule.findOne({_id: scheduleEvent});
        $('#scheduleEventForm .scheduleTitle').html(moment(event.start).format('LLLL'));
        $('#scheduleEventForm').modal();
        if(event.patient){
            $('#scheduleEventForm select[name=patients]').val(event.patient);
        } else {
            $('#scheduleEventForm select[name=patients]').val('');
        }
        $('.patients-chosen-select').trigger('chosen:updated');
        $('#scheduleEventForm .save').off('click');
        $('#scheduleEventForm .delete-btn').off('click');
        $('#scheduleEventForm .save').click(function(event){
            var patient = $('#scheduleEventForm select[name=patients]').val();
            patient = Patients.findOne({_id: patient});
            if(patient){
                Schedule.update(scheduleEvent, {$set: {
                    patient: patient._id,
                    title: patient.name
                }}, function(error, result){
                    if (error) {
                        toastr['error'](error.message, TAPi18n.__('common_error'));
                    }
                    if (result) {
                        $('#scheduleEventForm').modal('hide');
                        toastr['success'](TAPi18n.__('common_save-success'), TAPi18n.__('common_success'));
                    }
                });
            }
        });
        $('#scheduleEventForm .delete-btn').click(function(event){
            Schedule.remove(scheduleEvent, function(error, result){
                if (error) {
                    toastr['error'](error.message, TAPi18n.__('common_error'));
                }
                if (result) {
                    toastr['warning'](TAPi18n.__('schedule_event-canceled'), TAPi18n.__('common_success'));
                }
            });
        });

        // $('#scheduleEventForm .addPatient').click(function(event){
        //     $('#scheduleEventForm').modal('hide');
        //     FlowRouter.go('patientCreate');
        // });
    };

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
                } else {
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
            Schedule.insert({
                resourceId: resource.id,
                start: start.format(),
                end: end.format(),
                title: TAPi18n.__('schedule_to-confirm'),
                constraint: 'available_hours'
            }, function(error, result){
                calendar.fullCalendar('unselect');
                if (error) {
                    if(error.error == 403){
                        toastr['error'](TAPi18n.__('schedule_notAllowedError'), TAPi18n.__('common_notAllowed'));
                    } else {
                        toastr['error'](error.message, TAPi18n.__('common_error'));
                    }
                }
                if (result) {
                    showEventModal(result);
                }
            });
        },
        eventClick: function(calEvent, jsEvent, view) {
            showEventModal(calEvent._id);
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
        // resourceText: function(resource){
        //     return 'Leo';
        // },
        // resourceRender: function(resourceObj, labelTds, bodyTds) {
        //     // console.log(arguments);
        //     // labelTds.css('background', 'blue');
        // },
        resources: calResources,
        //events: getEvents,
    });

    this.autorun(function() {
        if($('#calendar').fullCalendar('getEventSources').length == 0) {
            $('#calendar').fullCalendar('addEventSource', function (start, end, timezone, callback) {
                var events = Schedule.find().fetch();
                if(callback){
                    callback(events);
                }
            });
        }
        $('#calendar').fullCalendar('refetchEvents');
    });
});

Template.schedule.onDestroyed(function () {
    $('#calendar').fullCalendar('destroy');
});
