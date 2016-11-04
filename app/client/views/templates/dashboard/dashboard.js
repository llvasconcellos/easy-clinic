Template.dashboard.events({
    // Timeline options buttons

    'click #lightVersion' : function(event){
        event.preventDefault()
        $('#ibox-content').removeClass('ibox-content');
        $('#vertical-timeline').removeClass('dark-timeline');
        $('#vertical-timeline').addClass('light-timeline');
    },

    'click #darkVersion' : function(event){
        event.preventDefault()
        $('#ibox-content').addClass('ibox-content');
        $('#vertical-timeline').removeClass('light-timeline');
        $('#vertical-timeline').addClass('dark-timeline');
    },

    'click #leftVersion' : function(event){
        event.preventDefault()
        $('#vertical-timeline').toggleClass('center-orientation');
    }

});

Template.dashboard.onRendered(function(){
    $('input[type=checkbox]').iCheck({
        checkboxClass: 'icheckbox_square-green'
    });
});

Template.dashboard.helpers({
    schedule: function(){
        var start = new Date();
        start.setHours(0,0,0,0);
        var end = new Date();
        end.setHours(23,59,59,999);
        return Schedule.find({
            resourceId: Meteor.userId(),
            start: {
                $gte: start,
                $lt: end
            }
        }).fetch();
    },
    getTime: function(date){
        return moment(date).format('HH:mm');
    },
    getHoursFromNow: function(start) {
        var now = moment();
        var duration = now.diff(start, 'hours', true);
        if(duration > 0) {
            return Math.round(duration) + ' ' + TAPi18n.__('schedule_hours-ago');
        } else {
            return Math.round(Math.abs(duration)) + ' ' + TAPi18n.__('schedule_hours-from-now');
        }
    }
});
