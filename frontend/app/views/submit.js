window.ViewSubmit = Backbone.View.extend({

	events: {
		'submit form' : 'uploadFile'
	},


	initialize: function() {
		this.template = _.template(tpl.get('submit'));
	},

	render: function(e) {
		$(this.el).html(this.template({}));
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
				alert("Data Uploaded: ");
			}
		});


	}



});
