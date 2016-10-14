Template.topNavbar.rendered = function(){
    // #TODO: enable fixed navbar but also fixed left menu for phones
    // FIXED TOP NAVBAR OPTION 
    if(Meteor.Device.isPhone()) {
        $('body').addClass('fixed-nav');
        $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
    }

};

Template.topNavbar.events({

    // Toggle left navigation
    'click #navbar-minimalize': function(event){

        event.preventDefault();

        // Toggle special class
        $("body").toggleClass("mini-navbar");

        // Enable smoothly hide/show menu
        if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
            // Hide menu in order to smoothly turn on when maximize menu
            $('#side-menu').hide();
            // For smoothly turn on menu
            setTimeout(
                function () {
                    $('#side-menu').fadeIn(400);
                }, 200);
        } else if ($('body').hasClass('fixed-sidebar')) {
            $('#side-menu').hide();
            setTimeout(
                function () {
                    $('#side-menu').fadeIn(400);
                }, 100);
        } else {
            // Remove all inline style from jquery fadeIn function to reset menu state
            $('#side-menu').removeAttr('style');
        }
    },

    'click img[data-lang]': (event)=> { // #TODO: improve language selection
        TAPi18n.setLanguage($(event.target).data('lang'));
    },

});
