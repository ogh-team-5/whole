/*
 * Patient.js
 * Copyright Frank Villaro-Dixon, BSD Simplified, 2014
 */

var Patient = Backbone.Model.extend({
	urlRoot: "user",
	defaults: {
		id: '1337_user',
		questions: [
			{id: 0, question: 'Your own question'},
			{id: 1, question: 'question 1'},
			{id: 2, question: 'question 2'},
			{id: 3, question: 'question 3'}
		]
	}
});

var AllPatients = Backbone.Collection.extend({
	model: Patient,
	url: function() {
		return window.URL_ROOT;
	}
});
