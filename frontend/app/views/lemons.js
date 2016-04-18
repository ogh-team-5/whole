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
		var action = $(e.target).attr('data-action');
		if(action === 'put')
			return;
		var attribute = $(e.target).attr('data-attribute');

		var total = 0;
		_.each(this.lemons.attributes, function(attr) { total += attr;});
		console.log(total);


		if(action === 'add') {
			if(total < 10) {
				this.lemons.attributes[attribute]++;
			}
		}
		else {
			if(this.lemons.attributes[attribute] > 0) {
				this.lemons.attributes[attribute]--;
			}
		}
		this.render();
	},
	submit: function(e) {
		this.lemons.save();


	}

});
