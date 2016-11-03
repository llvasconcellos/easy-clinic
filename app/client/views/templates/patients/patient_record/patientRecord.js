// import '/imports/client/datepicker/bootstrap-datepicker.js';
// import '/imports/client/datepicker/bootstrap-datepicker.pt-BR.min.js';
// import '/imports/client/datepicker/bootstrap-datepicker.es.min.js';
// import '/imports/client/datepicker/datepicker3.css';

var openModal = function(type){
	switch (type) {
		case 'form':
			$('#form-models-form-group').show();
		break;
		case 'prescription':
			$('#prescriptions-form-group').show();
		break;
		case 'certificate':
			$('#certificates-form-group').show();
		break;
		case 'exam':
			$('#exams-form-group').show();
		break;
	}
	$('#addToRecords').modal();
};



Template.patientRecord.helpers({
    formModels: function(){
        return FormModels.find();
    },
    prescriptions: function(){
        return DocumentModels.find({type: 'prescription'});
    },
    certificates: function(){
        return DocumentModels.find({type: 'medical_certificate'});
    },
    exams: function(){
        return DocumentModels.find({type: 'exam_request'});
    },
    entries: function() {
		var recordsCollection = PatientRecords.find({patientId: FlowRouter.getParam('_id')}, {sort: {date: 1}}).fetch();

		var compareDates = function(item, index, array){
			return moment(this.date).isSame(item.date);
		};

		var records = [];
		recordsCollection.forEach(function(item, index, array){
			var arr = records.find(compareDates, item);
			
			if(!arr){
				records.push({
					_id: item._id,
					date: item.date,
					patientId: item.patientId,
					records: [item.record]
				});
			} else {
				arr.records.push(item.record);
			}
		});

		Template.instance().data.records = records;
		return records;
	},
	formatedDate: function(){
		return moment(this.date).format('DD/MM/YYYY');
	},
	shortDate: function(){
		return moment(this.date).format('DD/MM/YYYY');
	},
	fullDate: function(){
		return moment(this.date).format('LL');
	}
});

Template.patientRecord.onRendered(function () {
	$(document).ready(function(){
		$('input[name=date]').mask('00/00/0000');
		$('input[name=date]').val(moment().format('DD/MM/YYYY'));
////////////////////////////////////////////////////////////////////////////////////////////////
		$('.chosen-select').chosen({width: "100%"});
		$(".chosen-select").chosen().change(function(event, selected){
			var type = $(event.target).data('type');
			var model = null;
			if(type == 'form'){
				if(selected.selected){
					model = FormModels.findOne({_id: selected.selected});
					$('#form-render').formRender({
						dataType: 'json',
						formData: JSON.stringify(model.model)
					});
				} else {
					$('#form-render').html('');
				}
			} else {
				if(selected.selected){
					model = DocumentModels.findOne({_id: selected.selected});
					$('#document').summernote('code', model.model);
					$('#document-wrapper').show();
				} else {
					$('#document').summernote('code', '');
				}
			}
		});

///////////////////////////////////////////////////////////////////////////////////////////////////
		$('#addToRecords .form-group').not('#date').hide();
		$('#addToRecords').on('hidden.bs.modal', function (e) {
			$('#addToRecords .form-group').not('#date').hide();
			$('#addToRecords select').val('');
			$('.chosen-select').trigger('chosen:updated');
		});

///////////////////////////////////////////////////////////////////////////////////////////////////

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


///////////////////////////////////////////////////////////////////////////////////////////////////


		$('[data-tooltip!=""]').qtip({ // Grab all elements with a non-blank data-tooltip attr.
			content: {
				attr: 'data-tooltip' // Tell qTip2 to look inside this attr for its content
			},
			position:{
				my: 'center right',
				at: 'center left'
			},
			style: {
				classes: 'qtip-tipsy qtip-shadow'
			}
		});

		$('#patient-add-form-btn').click(function(event){
			openModal('form');
		});
		$('#patient-add-prescription-btn').click(function(event){
			openModal('prescription');
		});
		$('#patient-add-certificate-btn').click(function(event){
			openModal('certificate');
		});
		$('#patient-add-exam-btn').click(function(event){
			openModal('exam');
		});


///////////////////////////////////////////////////////////////////////////////////////////////////


		var drugs = localDrugs.find({}, {fields: {'name':1, _id: 0}}).fetch();

		var drugsArray = $.map(drugs, function(value, index) {
			return [value.name];
		});

		var diseases = localICD10.find({}, {fields: {'icd':1, _id: 0}}).fetch();

		var diseasesArray = $.map(diseases, function(value, index) {
			return [value.icd];
		});

		$("textarea[name=document]").summernote({
			height: 300,
			placeholder: TAPi18n.__('document-models_model-placeholder'),
			toolbar: [
				['history', ['undo', 'redo']],
				['style', ['style', 'bold', 'italic', 'underline', 'clear']],
				['font', ['strikethrough', 'superscript', 'subscript']],
				['fontsize', ['fontsize']],
				['para', ['ul', 'ol', 'paragraph']],
				['height', ['height']],
				['insert', ['hr', 'table']],
				['misc', ['fullscreen']]
			],
			hint: [{
				words: drugsArray,
				//match: /\b(\w{2,})$/,
				match: /\B\$(\w*)$/,
				search: function search(keyword, callback) {
					callback($.map(this.words, function (item) {
						return item.toUpperCase().indexOf(keyword.toUpperCase()) >= 0 ? item : null;
					}));
				},
				index: 1,
				replace: function replace(item) {
					return item.toUpperCase() + ' ';
				}
			},{
				words: diseasesArray,
				match: /\B@(\w*)$/,
				search: function search(keyword, callback) {
					callback($.map(this.words, function (item) {
						return item.toUpperCase().indexOf(keyword.toUpperCase()) >= 0 ? item : null;
					}));
				},
				index: 2,
				replace: function replace(item) {
					return item.toUpperCase() + ' ';
				}
			},{
				words: [
					'NOME_DO_PACIENTE', 
					'CPF_PACIENTE', 
					'RG_PACIENTE',
					'ENDERECO_PACIENTE',
					'DATA_DA_CONSULTA', 
					'HORARIO_DA_CONSULTA', 
					'NOME_PROFISSIONAL',
					'CRM_PROFISSIONAL',
					'ENDERECO_PROFISSIONAL',
					'ASSINATURA_PROFISSIONAL'
				],
				match: /\B#(\w*)$/,
				search: function (keyword, callback) {
					callback($.grep(this.words, function (item) {
						//return item.indexOf(keyword) === 0;
						return item.toUpperCase().indexOf(keyword.toUpperCase()) >= 0 ? item : null;
					}));
				},
				template: function (item) {
					return item;
					//var content = emojiUrls[item];
					//return '<img src="' + content + '" width="20" /> :' + item + ':';
				},
				content: function (item) {
					return '#' + item;
				},
				replace: function replace(item) {
					return item.toUpperCase() + ' ';
				}
			}]
		});

/////////////////////////////////////////////////////////////////////////////////


		$('#addToRecords .save').click(function(){
			$('#patient-record-form').submit();
		});

		$('#patient-record-form').on('submit', function(event){
			event.preventDefault();
			try{
				validateForm();
				var formData = $(this).serializeArray();

				var date = formData.shift().value;

				var data = {
					date: moment(date, 'DD/MM/YYYY').toDate(),
					patientId: FlowRouter.getParam('_id'),
					record: formData
				};

				PatientRecords.insert(data, function(error, result){
					if (error) {
						toastr['error'](error.message, TAPi18n.__('common_error'));
					}
					if (result) {
						$('#addToRecords').modal('hide');
					}
				});

			} catch (error) {
				toastr['error'](error.message, TAPi18n.__('common_error'));
			}
		});

		var validateForm = function(){
			clearErrors();
			$('#patient-record-form').find('.form-group').each(function(key, element){
				var input = $(element).find('[required]')[0];
				if(input && !$(input).val()){
					markError(input);
				}
			});
			if($('#patient-record-form').find('.has-error:visible').length > 0){
				throw new Meteor.Error('ValidationError', TAPi18n.__('patient_records-validation-error'));
			}
		};

		var clearErrors = function(){
			$('#patient-record-form').find('.has-error').each(function(key, element){
				$(element).removeClass('has-error');
			});
		};

		var markError = function(){
			var args = Array.prototype.slice.call(arguments);
			args.forEach(function(el, index){
				$(el).parent().addClass('has-error');
			});
		};

	});


$(document).ready(function($){
	var timelines = $('.cd-horizontal-timeline'),
		eventsMinDistance = 90;

	(timelines.length > 0) && initTimeline(timelines);

	function initTimeline(timelines) {
		timelines.each(function(){
			var timeline = $(this),
				timelineComponents = {};
			//cache timeline components 
			timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
			timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
			timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
			timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');
			timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
			timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
			timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
			timelineComponents['eventsContent'] = timeline.children('.events-content');

			//assign a left postion to the single events along the timeline
			setDatePosition(timelineComponents, eventsMinDistance);
			//assign a width to the timeline
			var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);
			//the timeline has been initialize - show it
			timeline.addClass('loaded');

			//detect click on the next arrow
			timelineComponents['timelineNavigation'].on('click', '.next', function(event){
				event.preventDefault();
				updateSlide(timelineComponents, timelineTotWidth, 'next');
			});
			//detect click on the prev arrow
			timelineComponents['timelineNavigation'].on('click', '.prev', function(event){
				event.preventDefault();
				updateSlide(timelineComponents, timelineTotWidth, 'prev');
			});
			//detect click on the a single event - show new event content
			timelineComponents['eventsWrapper'].on('click', 'a', function(event){
				event.preventDefault();
				timelineComponents['timelineEvents'].removeClass('selected');
				$(this).addClass('selected');
				updateOlderEvents($(this));
				updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
				updateVisibleContent($(this), timelineComponents['eventsContent']);
			});

			//on swipe, show next/prev event content
			timelineComponents['eventsContent'].on('swipeleft', function(){
				var mq = checkMQ();
				( mq == 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'next');
			});
			timelineComponents['eventsContent'].on('swiperight', function(){
				var mq = checkMQ();
				( mq == 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'prev');
			});

			//keyboard navigation
			$(document).keyup(function(event){
				if(event.which=='37' && elementInViewport(timeline.get(0)) ) {
					showNewContent(timelineComponents, timelineTotWidth, 'prev');
				} else if( event.which=='39' && elementInViewport(timeline.get(0))) {
					showNewContent(timelineComponents, timelineTotWidth, 'next');
				}
			});
		});
	}

	function updateSlide(timelineComponents, timelineTotWidth, string) {
		//retrieve translateX value of timelineComponents['eventsWrapper']
		var translateValue = getTranslateValue(timelineComponents['eventsWrapper']),
			wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
		//translate the timeline to the left('next')/right('prev') 
		(string == 'next') 
			? translateTimeline(timelineComponents, translateValue - wrapperWidth + eventsMinDistance, wrapperWidth - timelineTotWidth)
			: translateTimeline(timelineComponents, translateValue + wrapperWidth - eventsMinDistance);
	}

	function showNewContent(timelineComponents, timelineTotWidth, string) {
		//go from one event to the next/previous one
		var visibleContent =  timelineComponents['eventsContent'].find('.selected'),
			newContent = ( string == 'next' ) ? visibleContent.next() : visibleContent.prev();

		if ( newContent.length > 0 ) { //if there's a next/prev event - show it
			var selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
				newEvent = ( string == 'next' ) ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');
			
			updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
			updateVisibleContent(newEvent, timelineComponents['eventsContent']);
			newEvent.addClass('selected');
			selectedDate.removeClass('selected');
			updateOlderEvents(newEvent);
			updateTimelinePosition(string, newEvent, timelineComponents);
		}
	}

	function updateTimelinePosition(string, event, timelineComponents) {
		//translate timeline to the left/right according to the position of the selected event
		var eventStyle = window.getComputedStyle(event.get(0), null),
			eventLeft = Number(eventStyle.getPropertyValue("left").replace('px', '')),
			timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', '')),
			timelineTotWidth = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
		var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);

        if( (string == 'next' && eventLeft > timelineWidth - timelineTranslate) || (string == 'prev' && eventLeft < - timelineTranslate) ) {
        	translateTimeline(timelineComponents, - eventLeft + timelineWidth/2, timelineWidth - timelineTotWidth);
        }
	}

	function translateTimeline(timelineComponents, value, totWidth) {
		var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
		value = (value > 0) ? 0 : value; //only negative translate value
		value = ( !(typeof totWidth === 'undefined') &&  value < totWidth ) ? totWidth : value; //do not translate more than timeline width
		setTransformValue(eventsWrapper, 'translateX', value+'px');
		//update navigation arrows visibility
		(value == 0 ) ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive') : timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
		(value == totWidth ) ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive') : timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
	}

	function updateFilling(selectedEvent, filling, totWidth) {
		//change .filling-line length according to the selected event
		var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
			eventLeft = eventStyle.getPropertyValue("left"),
			eventWidth = eventStyle.getPropertyValue("width");
		eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', ''))/2;
		var scaleValue = eventLeft/totWidth;
		setTransformValue(filling.get(0), 'scaleX', scaleValue);
	}

	function setDatePosition(timelineComponents, min) {
		for (i = 0; i < timelineComponents['timelineDates'].length; i++) { 
		    var distance = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][i]),
		    	distanceNorm = Math.round(distance/timelineComponents['eventsMinLapse']) + 2;

		   	// #TODO: fix the proportional distance between dates. It gets huge when dates to apart from each other
		    timelineComponents['timelineEvents'].eq(i).css('left', distanceNorm*min+'px');
		    //timelineComponents['timelineEvents'].eq(i).css('left', (min*2*(i+1))+'px');
		}
	}

	function setTimelineWidth(timelineComponents, width) {
		var timeSpan = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length-1]),
			timeSpanNorm = timeSpan/timelineComponents['eventsMinLapse'],
			timeSpanNorm = Math.round(timeSpanNorm) + 4,
			totalWidth = timeSpanNorm*width;
		timelineComponents['eventsWrapper'].css('width', totalWidth+'px');
		updateFilling(timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents['fillingLine'], totalWidth);
		updateTimelinePosition('next', timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents);
	
		return totalWidth;
	}

	function updateVisibleContent(event, eventsContent) {
		var eventDate = event.data('date'),
			visibleContent = eventsContent.find('.selected'),
			selectedContent = eventsContent.find('[data-date="'+ eventDate +'"]'),
			selectedContentHeight = selectedContent.height();

		if (selectedContent.index() > visibleContent.index()) {
			var classEnetering = 'selected enter-right',
				classLeaving = 'leave-left';
		} else {
			var classEnetering = 'selected enter-left',
				classLeaving = 'leave-right';
		}

		selectedContent.attr('class', classEnetering);
		visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
			visibleContent.removeClass('leave-right leave-left');
			selectedContent.removeClass('enter-left enter-right');
		});
		eventsContent.css('height', selectedContentHeight+'px');
	}

	function updateOlderEvents(event) {
		event.parent('li').prevAll('li').children('a').addClass('older-event').end().end().nextAll('li').children('a').removeClass('older-event');
	}

	function getTranslateValue(timeline) {
		var timelineStyle = window.getComputedStyle(timeline.get(0), null),
			timelineTranslate = timelineStyle.getPropertyValue("-webkit-transform") ||
         		timelineStyle.getPropertyValue("-moz-transform") ||
         		timelineStyle.getPropertyValue("-ms-transform") ||
         		timelineStyle.getPropertyValue("-o-transform") ||
         		timelineStyle.getPropertyValue("transform");

        if( timelineTranslate.indexOf('(') >=0 ) {
        	var timelineTranslate = timelineTranslate.split('(')[1];
    		timelineTranslate = timelineTranslate.split(')')[0];
    		timelineTranslate = timelineTranslate.split(',');
    		var translateValue = timelineTranslate[4];
        } else {
        	var translateValue = 0;
        }

        return Number(translateValue);
	}

	function setTransformValue(element, property, value) {
		element.style["-webkit-transform"] = property+"("+value+")";
		element.style["-moz-transform"] = property+"("+value+")";
		element.style["-ms-transform"] = property+"("+value+")";
		element.style["-o-transform"] = property+"("+value+")";
		element.style["transform"] = property+"("+value+")";
	}

	//based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
	function parseDate(events) {
		var dateArrays = [];
		events.each(function(){
			var singleDate = $(this),
				dateComp = singleDate.data('date').split('T');
			if( dateComp.length > 1 ) { //both DD/MM/YEAR and time are provided
				var dayComp = dateComp[0].split('/'),
					timeComp = dateComp[1].split(':');
			} else if( dateComp[0].indexOf(':') >=0 ) { //only time is provide
				var dayComp = ["2000", "0", "0"],
					timeComp = dateComp[0].split(':');
			} else { //only DD/MM/YEAR
				var dayComp = dateComp[0].split('/'),
					timeComp = ["0", "0"];
			}
			var	newDate = new Date(dayComp[2], dayComp[1]-1, dayComp[0], timeComp[0], timeComp[1]);
			dateArrays.push(newDate);
		});
	    return dateArrays;
	}

	function daydiff(first, second) {
	    return Math.round((second-first));
	}

	function minLapse(dates) {
		//determine the minimum distance among events
		var dateDistances = [];
		for (i = 1; i < dates.length; i++) { 
		    var distance = daydiff(dates[i-1], dates[i]);
		    dateDistances.push(distance);
		}
		return Math.min.apply(null, dateDistances);
	}

	/*
		How to tell if a DOM element is visible in the current viewport?
		http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
	*/
	function elementInViewport(el) {
		var top = el.offsetTop;
		var left = el.offsetLeft;
		var width = el.offsetWidth;
		var height = el.offsetHeight;

		while(el.offsetParent) {
		    el = el.offsetParent;
		    top += el.offsetTop;
		    left += el.offsetLeft;
		}

		return (
		    top < (window.pageYOffset + window.innerHeight) &&
		    left < (window.pageXOffset + window.innerWidth) &&
		    (top + height) > window.pageYOffset &&
		    (left + width) > window.pageXOffset
		);
	}

	function checkMQ() {
		//check if mobile or desktop device
		return window.getComputedStyle(document.querySelector('.cd-horizontal-timeline'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
	}
});
























});




Template.patientRecord.onDestroyed(function () {
    $('#document').summernote('destroy');
});