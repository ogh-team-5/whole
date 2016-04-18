window.ViewLemons = Backbone.View.extend({

	events: {
		'click': 'button_click'
	},


	initialize: function() {
		this.template = _.template(tpl.get('lemons'));
		this.lemons = new Lemons();
	},

	render: function(e) {
		$(this.el).html(this.template({lemons: this.lemons}));
		return this;
	},

	button_click: function(e) {
		console.log('blah');
		console.log(e);
		console.log($(e));
		console.log('foo');

	}

});
