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
		console.log('called');

		function timeStamp() {
			var now = new Date();

			var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];

			return date.join("_");
		}
		//pre treatment

		//TODO

		//And upload the file

		if(e) {
			e.preventDefault();
		}

		var filename = $("#file").val();
		console.log('fucktard');

		$.ajax({
			url: window.URL_ROOT + '/' + window.PATIENT.get('id') + '/' + timeStamp() + '/split',
			type: "POST",
			enctype: 'multipart/form-data',
			data: {
				file: filename
			},
			success: function () {
				console.log('blah blah');
				FOGEA_app.navigate('patient/'+window.PATIENT.get('id')+'/lemons', {trigger: true});
			},
			failure: function() {
				console.log('foo bar');
			}
		});
	}



});
