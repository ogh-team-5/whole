/* Lemons.js
 * Copyright Frank Villaro-Dixon, BSD Simplified, 2014
 */

var Lemons = Backbone.Model.extend({
	urlRoot: "data",
	defaults: {
		anger: 0,
		happiness: 0,
		fear: 0,
		sadness: 0,
		neutral: 0
	}
});

