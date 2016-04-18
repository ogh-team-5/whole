/*
 * PatientDay.js
 * Copyright Frank Villaro-Dixon, BSD Simplified, 2014
 */

var PatientDay = Backbone.Model.extend({
	url: function() {
		return window.URL_ROOT + '/' + this.get('patient') + '/' + this.get('day');
	},
	defaults: {
	}
});

