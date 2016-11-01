// Custom function to read dropdown data
// =========================
function Data(target) {
  // @todo - page level global?
  var effectInDefault = null,
      effectOutDefault = null;
  var dropdown = $(target),
      dropdownMenu = $('.dropdown-menu', target);
  var parentUl = dropdown.parents('ul.nav'); 

  // If parent is ul.nav allow global effect settings
  if (parentUl.size() > 0) {
    effectInDefault = parentUl.data('dropdown-in') || null;
    effectOutDefault = parentUl.data('dropdown-out') || null;
  }
  
  return {
    target:       target,
    dropdown:     dropdown,
    dropdownMenu: dropdownMenu,
    effectIn:     dropdownMenu.data('dropdown-in') || effectInDefault,
    effectOut:    dropdownMenu.data('dropdown-out') || effectOutDefault,  
  };
}

// Custom function to start effect (in or out)
// =========================
function Start(data, effectToStart) {
  if (effectToStart) {
    data.dropdown.addClass('dropdown-animating');
    data.dropdownMenu.addClass('animated');
    data.dropdownMenu.addClass(effectToStart);    
  }
}

// Custom function to read when animation is over
// =========================
function End(data, callbackFunc) {
  var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
  data.dropdown.one(animationEnd, function() {
    data.dropdown.removeClass('dropdown-animating');
    data.dropdownMenu.removeClass('animated');
    data.dropdownMenu.removeClass(data.effectIn);
    data.dropdownMenu.removeClass(data.effectOut);
    
    // Custom callback option, used to remove open class in out effect
    if(typeof callbackFunc == 'function'){
      callbackFunc();
    }
  });
}

dropdownEffect = {
  data: Data,
  start: Start,
  end: End
};