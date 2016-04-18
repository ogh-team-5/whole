window.ViewTherapistPatients= Backbone.View.extend({

	initialize: function() {
		this.template = _.template(tpl.get('therapist/patients'));
	},

	render: function(e) {
		$(this.el).html(this.template({user: this.model}));
		return this;
	}


});
