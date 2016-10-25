AutoForm.addInputType('masked-input', {
	template: 'afMaskedInput',
	valueOut: function() {
		return this.val();
	}
});



Template.afMaskedInput.onRendered(function() {
	var data = this.data;
	var $input = this.$('input');
	var mask = data.atts.mask ? data.atts.mask : '00/00/0000';

	$input.mask(mask, data.atts.maskOptions);
});

Template.afMaskedInput.onDestroyed(function() {
	var $input = this.$('input');
	$input.unmask();
});

Template.afMaskedInput.helpers({
	atts: function addFormControlAtts() {
		var atts = _.clone(this.atts);
		// Add bootstrap class
		atts = AutoForm.Utility.addClass(atts, "form-control");
		delete atts.maskOptions;
		return atts;
	}
});