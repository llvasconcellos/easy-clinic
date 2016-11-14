var randomMC = require('/imports/client/randomColor.js');

Template.schedule.events({});

Template.schedule.helpers({
    patients: function(){
        return Patients.find();
    },
});

Template.schedule.onCreated(function () {
    var templateInstance = this;
    //this.autorun(function() {
        templateInstance.events = Schedule.find().fetch();
        templateInstance.data.settings = Settings.findOne();
        templateInstance.doctors = Meteor.users.find({'profile.group':'medical_doctor'}).fetch();
    //});
    AutoForm.addHooks('quickPatientForm', {
        onSuccess: function(formType, result) {
            toastr['success'](TAPi18n.__('common_save-success'), TAPi18n.__('common_success'));
            $("#content-switcher").carousel(0);
            $('#scheduleEventForm select[name=patients]').val(result);
            $('.patients-chosen-select').trigger('chosen:updated');
        },
        onError: function(formType, error) {
            toastr['error'](error.message, TAPi18n.__('common_error'));
        }
    });
});

Template.schedule.onRendered(function () {
    var templateInstance = this;
    $('#new-appointment').click(function(event){
        Blaze.render(Template.scheduleDayHours, document.getElementById('day-hours'));

        // var MyTable = new Tabular.Table(options);
        // var data = {table: MyTable};
        // Blaze.renderWithData(Template.tabular, data, document.getElementById('root'));
    });

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

    $('#scheduleEventForm').on('hidden.bs.modal', function (event) {
         $("#content-switcher").carousel(0);
         $('#patient-form-group').removeClass('has-error');
    });

    $('#content-switcher').on('slide.bs.carousel', function (event) {
        if(event.direction == "left"){
            setPatientFormModalButtons();
        } else {
            setAppointmentFormModalButtons();
        }
    });

    var setPatientFormModalButtons = function(){
        setTimeout(function(){
            $('#quickPatientForm input:first').filter(':visible').focus();
        }, 500);
        $('#scheduleEventForm .delete-btn').hide();
        $('#scheduleEventForm .save').off('click');
        $('#scheduleEventForm .save').click(function(event){
            $('#quickPatientForm').submit();
        });
    };

    var setAppointmentFormModalButtons = function(){
        $('#scheduleEventForm .save').off('click');
        $('#scheduleEventForm .delete-btn').show();
        $('#scheduleEventForm .delete-btn').off('click');
        $('#scheduleEventForm .save').click(function(event){
            $('#patient-form-group').removeClass('has-error');
            var scheduleEvent = $('#scheduleEventForm input[name=eventId]').val();
            var patient = $('#scheduleEventForm select[name=patients]').val();
            var status = $('#scheduleEventForm input[name=status]:checked').val();
            patient = Patients.findOne({_id: patient});
            if(patient){
                Schedule.update(scheduleEvent, {$set: {
                    patient: patient._id,
                    title: patient.name,
                    status: status
                }}, function(error, result){
                    if (error) {
                        toastr['error'](error.message, TAPi18n.__('common_error'));
                    }
                    if (result) {
                        $('#scheduleEventForm').modal('hide');
                        toastr['success'](TAPi18n.__('common_save-success'), TAPi18n.__('common_success'));
                    }
                });
            } else {
                $('#patient-form-group').addClass('has-error');
            }
        });
        $('#scheduleEventForm .delete-btn').click(function(event){
            var scheduleEvent = $('#scheduleEventForm input[name=eventId]').val();
            Schedule.remove(scheduleEvent, function(error, result){
                if (error) {
                    toastr['error'](error.message, TAPi18n.__('common_error'));
                }
                if (result) {
                    toastr['warning'](TAPi18n.__('schedule_appointment-canceled'), TAPi18n.__('common_success'));
                }
            });
        });
        $('#scheduleEventForm .full-patient-register').click(function(event){
            $('#scheduleEventForm').modal('hide');
            FlowRouter.go('patientCreate');
        });
    };

    var showEventModal = function(scheduleEvent){
        event = Schedule.findOne({_id: scheduleEvent});
        $('#scheduleEventForm .scheduleTitle').html(moment(event.start).format('LLLL'));
        $('#scheduleEventForm').modal();
        $('#scheduleEventForm input[name=eventId]').val(scheduleEvent);
        if(event.patient){
            $('#scheduleEventForm select[name=patients]').val(event.patient);
        } else {
            $('#scheduleEventForm select[name=patients]').val('');
        }
        $('.patients-chosen-select').trigger('chosen:updated');

        $('#scheduleEventForm input[name=status]').val([event.status]);
        $(`#scheduleEventForm input[value=${event.status}]`).parent().button('toggle');

        setAppointmentFormModalButtons();
    };

    this.eventCount = function(resourceId){
        var count = 0;
        templateInstance.events.forEach(function(item, index, arr){
            if(item.resourceId == resourceId){
                count++;
            }
        });
        return count;
    };

    var workHoursStart = '06:00';
    var workHoursEnd = '23:00';

    if(this.data.settings){
        if(this.data.settings.workHoursStart){
            workHoursStart = this.data.settings.workHoursStart;
        }
        if(this.data.settings.workHoursEnd){
            workHoursEnd = this.data.settings.workHoursEnd;
        }
    }

    var datePicker = null;

    var calendar = $('#calendar').fullCalendar({
        defaultView: 'timelineDay',
        slotDuration: '00:20:00',
        minTime: workHoursStart + ':00',
        maxTime: workHoursEnd + ':00',
        locale: TAPi18n.getLanguage().toLowerCase(),
        aspectRatio: 1.8,
        navLinks: true,
        //scrollTime: '00:00', // undo default 6am scrollTime
        editable: true,
        resourceLabelText: TAPi18n.__('users_doctors'),
        header: {
            left: 'today prev,datePicker,next',
            center: 'title',
            right: 'timelineDay,agendaDay,listWeek,agendaWeek,month' //timelineThreeDays, listDay
        },
        customButtons: {
            datePicker: {
                text: moment().format('DD/MM/YYYY'),
                click: function() {
                    if(datePicker){
                        datePicker.datepicker('show');
                    } else {
                        datePicker = $('.fc-datePicker-button ').datepicker({
                            autoclose: true,
                            language: TAPi18n.getLanguage(),
                            todayHighlight: true
                        })
                        .datepicker('show')
                        .on('changeDate', function(e) {
                            $('.fc-datePicker-button ').html(moment(e.date).format('DD/MM/YYYY'));
                            calendar.fullCalendar( 'gotoDate', e.date )
                        });
                    }
                }
            }
        },
        buttonText: {
            today: TAPi18n.__('schedule_today')
        },
        views: {
            timelineDay: {
                buttonText: TAPi18n.__('schedule_timelineDay'),
                slotLabelFormat: [
                    //'MMMM YYYY', // top level of text
                    'HH:mm'        // lower level of text
                ],
                slotLabelInterval: {
                    minutes: 20
                }
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
        viewRender: function (view, element, context) {
            $('.fc-datePicker-button ').html(view.intervalStart.format('DD/MM/YYYY'));
        },
        dayClick: function(date, jsEvent, view, resourceObj) {
            if (view.name == "month") {
                $('#calendar').fullCalendar('changeView', 'timelineDay');
                $('#calendar').fullCalendar('gotoDate', date); 
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
            var doctor = templateInstance.doctors.find(function(index){
                return index._id === selectInfo.resourceId;
            });
            if(doctor) {
                var weekday = selectInfo.start.day();
                if(doctor.workHours){
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
                } else {
                    toastr['error'](TAPi18n.__('schedule_no-doctor-workhours-error'), TAPi18n.__('common_notAllowed'));
                }
            }
        },
        select: function(start, end, jsEvent, view, resource){
            if(resource){
                Schedule.insert({
                    resourceId: resource.id,
                    start: start.format(),
                    end: end.format(),
                    title: 'to-confirm',
                    constraint: 'available_hours',
                    status: 'to-confirm'
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
            }
        },
        eventClick: function(calEvent, jsEvent, view) {
            showEventModal(calEvent._id);
        },
        eventRender: function(event, element, timelineView) {
            var icon = '';
            var tooltip = event.title;

            switch(event.status) {
                case 'to-confirm':
                    tooltip = TAPi18n.__('schedule_status-to-confirm');
                    element.find('.fc-content').css('background', '#E44F4F');
                    icon = '<i class="fa fa-hourglass-o" aria-hidden="true"></i>';
                break;
                case 'waiting':
                    icon = '<i class="fa fa-calendar-check-o" aria-hidden="true"></i>';
                break;
                case 'scheduled':
                    icon = '<i class="fa fa-clock-o" aria-hidden="true"></i>';
                break;
                case 'attending':
                    icon = '<i class="fa fa-handshake-o" aria-hidden="true"></i>';
                break;
                case 'no-show':
                    icon = '<i class="fa fa-user-times" aria-hidden="true"></i>';
                break;
                case 'finished':
                    icon = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
                break;
            }

            if((timelineView.name == "timelineDay") || (timelineView.name == "timelineThreeDays")) {
                element.find('.fc-title').html(icon);
            } else {
                if(event.title == 'to-confirm'){
                    element.find('.fc-title').html(TAPi18n.__('schedule_status-to-confirm'));
                }
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
                content: tooltip
            });
        },
        resourceOrder: 'title',
        resourceRender: function(resource, labelTds, bodyTds, view) {
            labelTds.find('.fc-cell-text').css('display', 'block');
            var html = '';
            var pictureUrl = 'https://cdn4.iconfinder.com/data/icons/medical-14/512/9-128.png';
            if(resource.picture){
                var image = Images.findOne({'_id': resource.picture});
                if(image) {
                    pictureUrl = image.link();
                }
            } else {
                pictureUrl = Gravatar.imageUrl(resource.email, {
                    secure: true,
                    size: 28,
                    default: pictureUrl
                });
            }
            var imgHtml = '<img class="profile-pic cal-resource-pic" style="border-color:' + resource.color + '" src="' + pictureUrl + '">';
            labelTds.find('.fc-cell-content').prepend(imgHtml); 


            html += resource.title + '<br /><small>';
            if(resource.specialties){
                html += resource.specialties.join(', ');
            } else {
                html += TAPi18n.__('schedule_no-specialties')
            }
            html += '</small>';
            labelTds.find('.fc-cell-text').html(html);

            // html += '<div class="cal-resource-count" style="background-color:' + resource.color + '">';
            // html += templateInstance.eventCount(resource.id) + '</div>';
            //html += '&nbsp;';
            //html += '</div>';
        },
        // resources: this.calResources,
        //events: getEvents,
        resources: function(callback) {
            var calResources = [];
            templateInstance.doctors.forEach(function(doctor, doctorIndex){
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
                var color = doctor.color ? doctor.color : randomMC.getColor();
                calResources.push({
                    id: doctor._id,
                    title: doctor.profile.firstName + ' ' + doctor.profile.lastName,
                    picture: doctor.profile.picture,
                    email: doctor.emails[0].address,
                    color: color,
                    eventColor: color,
                    specialties: doctor.specialties,
                    //eventBackgroundColor    Like eventColor but only for the background color
                    // eventBorderColor    Like eventColor but only for the border color
                    // eventTextColor  Like eventColor but only for the text color
                    // eventClassName  className(s) that will apply to events
                    businessHours: workHours
                });
            });
            callback(calResources);
        }
    });

    this.autorun(function() {
        var self = this;
        if($('#calendar').fullCalendar('getEventSources').length == 0) {
            $('#calendar').fullCalendar('addEventSource', function (start, end, timezone, callback) {
                var events = self.templateInstance().events = Schedule.find().fetch();
                if(callback){
                    callback(events);
                }
            });
        }
        //self.templateInstance().doctors = Meteor.users.find({'profile.group':'medical_doctor'}).fetch();
        $('#calendar').fullCalendar('refetchEvents');
        //$('#calendar').fullCalendar('refetchResources');
    });
});

Template.schedule.onDestroyed(function () {
    $('#calendar').fullCalendar('destroy');
});
