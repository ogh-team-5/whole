window.ViewTherapistPatientDay = Backbone.View.extend({

	initialize: function() {
		this.template = _.template(tpl.get('therapist/patient_day'));

		this.model.fetch();
		this.listenTo(this.model, 'change', this.render);
	},

	render: function(e) {
		$(this.el).html(this.template({pday: this.model}));
		this.after_render();
		return this;
	},

	after_render: function() {
		var self = this;

		data = [];
		var sets = [this.model.get('lemons'), this.model.get('text')['emotions'], this.model.get('video')['emotions']];
		console.log(this.model);
		_.each(sets, function(set) {
			console.log('-------');
			console.log(set);
			ds = [];
			var emotions = ['anger', 'happiness', 'fear', 'sadness', 'neutral'];
			_.each(emotions, function(emotion) {
				console.log(emotion);
				ds.push({axis: emotion, value: set[emotion]})
			});
		});

		var margin = {top: 100, right: 100, bottom: 100, left: 100},
			width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
			height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

		var color = d3.scale.ordinal().range(["#EDC951","#CC333F","#00A0B0"]);

		var radarChartOptions = {
			/*
			w: width,
			h: height,
			*/
			margin: margin,
			maxValue: 1,
			levels: 5,
			roundStrokes: true,
			color: color
		};

		//Call function to draw the Radar chart
		RadarChart(".radarChart", data, radarChartOptions);
	}


});
