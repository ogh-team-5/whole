/*
 * PatientDay.js
 * Copyright Frank Villaro-Dixon, BSD Simplified, 2014
 */

var PatientDay = Backbone.Model.extend({
	url: function() {
		return window.URL_ROOT + '/' + this.get('patient') + '/' + this.get('day');
	},
	defaults: {
		text: {
			emotions: {}
		},
		video: {
			emotions: {}
		},
		lemons: {}
	}
});

var AllDays = Backbone.Collection.extend({
	model: PatientDay,
	initialize: function(models, options) {
		this.id = options.id;
	},
	url: function() {
		console.log(this);
		return window.URL_ROOT + '/' + this.id;
	}
});
