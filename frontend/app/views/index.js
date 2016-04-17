window.ViewIndex = Backbone.View.extend({

	initialize: function() {
		this.template = _.template(tpl.get('index'));
	},

	render: function() {
		$(this.el).html(this.template({}));
		return this;
	}
});
