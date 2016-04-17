var _underscore_template = _.template;

/* The <% include XXX %> function */
_.template = function(str, data) {
	// match "<% include template-id %>"
	while(str !== (str = str.replace(
		/<%\sinclude\s*(.*?)\s%>/g,
		function(match, templateId) {
				var el = tpl.get(templateId);
				return el ? el : '';
		}
	)));
	return _underscore_template(str, data);
};

_.mixin({
	nl2br : function(str, is_xhtml){
		var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
		return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
	},
	iff: function(condition, outputString) {
		return condition ? outputString : "";
	},
	CHF: function(number) {
		return this.d_round(number) + ' CHF';
	},
	d_round: function(number) {
		/*
		if(number < 100) {
			num = Math.round(number*10)/10;
		} else {
			var num = Math.round(number);
		} */
		num = Math.round(number);
		return num.toLocaleString('de-CH');
	}

});
