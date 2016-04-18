window.ViewReply = Backbone.View.extend({

	events: {
		'submit form' : 'uploadFile'
	},


	initialize: function() {
		this.template = _.template(tpl.get('reply'));
	},

	render: function(e) {
		$(this.el).html(this.template({user: this.model, question_id: this.options.question_id}));
		return this;
	},

	uploadFile: function(e) {
		//pre treatment

		//TODO

		//And upload the file

		if(e) {
			e.preventDefault();
		}

		var filename = $("#file").val();

		$.ajax({
			type: "POST",
			url: "TODO_URL",
			enctype: 'multipart/form-data',
			data: {
				file: filename
			},
			success: function () {
				FOGEA_app.navigate('user/'+window.PATIENT.get('id')+'/lemons', {trigger: true});
			}
		});
	}



});
