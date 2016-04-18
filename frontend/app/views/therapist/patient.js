window.ViewTherapistPatient = Backbone.View.extend({

	initialize: function() {
		this.template = _.template(tpl.get('therapist/patient'));
		this.model.fetch();
		this.listenTo(this.model, 'change', this.render);
	},

	render: function(e) {
		$(this.el).html(this.template({patient: this.model}));
		return this;
	}


});
