window.ViewSubmit = Backbone.View.extend({

	initialize: function() {
		this.template = _.template(tpl.get('submit'));
	},

	render: function(e) {
		$(this.el).html(this.template({}));
		return this;
	}


});
