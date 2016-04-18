window.ViewUser = Backbone.View.extend({

	initialize: function() {
		this.template = _.template(tpl.get('user'));
	},

	render: function(e) {
		$(this.el).html(this.template({user: this.model}));
		return this;
	}


});
