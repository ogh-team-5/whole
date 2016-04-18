window.ViewTherapistPatientDay = Backbone.View.extend({

	initialize: function() {
		this.template = _.template(tpl.get('therapist/patient_day'));

		this.model.fetch();
		this.listenTo(this.model, 'change', this.render);
	},

	render: function(e) {
		$(this.el).html(this.template({pday: this.model}));
		return this;
	}


});
