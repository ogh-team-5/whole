/* ROUTEUR DE L'APPLICATION */
var FOGEA_router = Backbone.Router.extend({

	initialize: function() {
		//Initialize the publish/subscribe bus
		window.pubSubBus = _.extend({},Backbone.Events);
	},

//http://www.geekdave.com/2012/04/05/module-specific-subroutes-in-backbone/
	routes: {
		'' : 'index',
		'patient/:pid' : 'patient',
		'patient/:pid/read' : 'read', ///OSHUSONHUSONTUHOSUNTh
		'patient/:pid/lemons' : 'lemons',
		'patient/:pid/reply/:question_id' : 'reply',

		'therapist/:tid/patients': 'therapist_patients',
		'therapist/:tid/patient/:pid': 'therapist_patient',
		'therapist/:tid/patient/:pid/day/:day': 'therapist_patient_day'
	},
	
	index: function() {
		this.showViewContent(new ViewIndex());
	},
	patient: function(pid) {
		this.showViewContent(new ViewPatient({model: window.PATIENT}));
	},
	reply: function(pid, question_id) {
		this.showViewContent(new ViewReply({model: window.PATIENT, question_id: question_id}));
	},
	read: function(pid) {
		this.showViewContent(new ViewRead({id: pid}));
	},
	lemons: function(pid) {
		this.showViewContent(new ViewLemons({id: pid}));
	},


	therapist_patients: function(id) {
		var allPats = new AllPatients();
		this.showViewContent(new ViewTherapistPatients({model: allPats}));
	},

	therapist_patient: function(tid, pid) {
		var allDays = new AllDays([], {id: pid});
		this.showViewContent(new ViewTherapistPatient({patient: pid, model: allDays}));
	},

	therapist_patient_day: function(tid, pid, day) {
		console.log('blah');
		var pday = new PatientDay({patient: pid, day: day});
		this.showViewContent(new ViewTherapistPatientDay({model: pday}));
	},

	showViewContent: function(view) {
		if (this.currentViewContent)
			this.currentViewContent.close(); //on detatch l'ancienne view
		
		$('#FOGEA_index_content').html(view.render().el); //Affiche la nouvelle
		this.currentViewContent = view;

		$(window).scrollTop(0)

		return view;
	}

});
