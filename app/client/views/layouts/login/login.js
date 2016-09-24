Template.login.rendered = function(){
    // Add green color for button
    $('#at-btn').removeClass('btn-default');
    $('#at-btn').addClass('btn-primary');
}

Template.login.destroyed = function(){

    // Remove special color for blank layout
    //$('body').removeClass('gray-bg');
};

