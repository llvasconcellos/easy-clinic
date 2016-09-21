Template.notFoundTemplate.rendered = function(){

    // Add gray color for background in blank layout
    $('body').addClass('gray-bg');

}

Template.notFoundTemplate.destroyed = function(){

    // Remove special color for blank layout
    $('body').removeClass('gray-bg');
};
