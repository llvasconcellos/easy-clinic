import '/imports/ladda/spin.min.js';
import '/imports/ladda/ladda.min.js';
import '/imports/ladda/ladda.jquery.min.js';
import '/imports/ladda/ladda.min.css';

Template.login.rendered = function(){
	$('.ladda-button').ladda('bind', {timeout: 15000});

	Ladda.bind( '.ladda-button',{
	    callback: function( instance ){
	        var progress = 0;
	        var interval = setInterval( function(){
	            progress = Math.min( progress + Math.random() * 0.1, 1 );
	            instance.setProgress( progress );

	            if(( progress === 1 ) ||  !AccountsTemplates.disabled()){
	                instance.stop();
	                clearInterval( interval );
	            }
	        }, 300 );
	    }
	});
}

Template.login.destroyed = function(){
};