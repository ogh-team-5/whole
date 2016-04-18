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
		console.log(ds);

		var margin = {top: 100, right: 100, bottom: 100, left: 100},
			width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
			height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
/*
		var data = [
			[//video
			{axis:"Anger",value:0.8},
			{axis:"Happiness",value:0.28},
			{axis:"Fear",value:0.29},
			{axis:"Sadness",value:0.17},
			{axis:"Neutral",value:0.22},
			],[//audio
			{axis:"AAAAnger",value:0.27},
			{axis:"Happiness",value:0.16},
			{axis:"Fear",value:0.35},
			{axis:"Sadness",value:0.63},
			{axis:"Neutral",value:0.40},
			],[//historical
			{axis:"Anger",value:0.26},
			{axis:"Happiness",value:0.10},
			{axis:"Fear",value:0.60},
			{axis:"Sadness",value:0.14},
			{axis:"Neutral",value:0.22},
			]
		];
		*/

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
