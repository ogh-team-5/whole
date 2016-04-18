window.ViewTherapistPatients= Backbone.View.extend({

	initialize: function() {
		this.template = _.template(tpl.get('therapist/patients'));
		this.model.fetch();
		this.listenTo(this.model, 'sync', this.render);
	},

	render: function(e) {
		console.log('todo');
		console.log(this.model);
		$(this.el).html(this.template({patients: this.model}));
		console.log('end');
		return this;
	}


});
