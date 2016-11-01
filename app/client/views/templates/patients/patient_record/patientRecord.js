Template.patientRecord.onRendered(function () {
	$(document).ready(function(){
		$('.dropdown, .dropup').on({
			"show.bs.dropdown": function () {
				// On show, start in effect
				var dropdown = dropdownEffect.data(this);
				dropdownEffect.start(dropdown, dropdown.effectIn);
			},
			"shown.bs.dropdown": function () {
				// On shown, remove in effect once complete
				var dropdown = dropdownEffect.data(this);
				if (dropdown.effectIn && dropdown.effectOut) {
					dropdownEffect.end(dropdown, function() {}); 
				}
			},  
			"hide.bs.dropdown":  function(e) {
				// On hide, start out effect
				var dropdown = dropdownEffect.data(this);
				if (dropdown.effectOut) {
					e.preventDefault();   
					dropdownEffect.start(dropdown, dropdown.effectOut);   
					dropdownEffect.end(dropdown, function() {
						dropdown.dropdown.removeClass('open');
					}); 
				}    
			}, 
		});
	});
});




