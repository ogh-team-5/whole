window.ViewTherapistPatient = Backbone.View.extend({

	initialize: function() {
		this.template = _.template(tpl.get('therapist/patient'));
		this.model.fetch();
		this.listenTo(this.model, 'sync', this.render);
		this.patient = new Patient({id: this.options.patient});
	},

	render: function(e) {
		$(this.el).html(this.template({patient: this.patient, days: this.model}));
		return this;
	}


});
