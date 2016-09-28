ReactiveDatatable = function(options) {
	var self = this;
	this.options = options = _.defaults(options, {
		stateSave: true,
		stateDuration: -1, // Store data for session only
		pageLength: 20,
		lengthMenu: [3, 5, 10, 20, 50, 100],
		columnDefs: [{ // Global default blank value to avoid popup on missing data
			targets: '_all',
			defaultContent: '–––'
		}],
		stateLoadParams: function(settings, data) {
			// Make it easy to change to the stored page on .update()
			self.page = data.start / data.length;
		}
	});

	if (UserLanguage != 'en') {
		this.options.language = {
			url: "/packages/datatables/" + UserLanguage + ".json"
		};
	}
};

ReactiveDatatable.prototype.update = function(data) {
	if (!data) return;
	var self = this;

	self.datatable
		.clear()
		.rows.add(data)
		.draw(false)
		.page(self.page || 0) // XXX: Can we avoid drawing twice?
		.draw(false);		  // I couldn't get the page drawing to work otherwise
};