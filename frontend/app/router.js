/* ROUTEUR DE L'APPLICATION */
var FOGEA_router = Backbone.Router.extend({

	initialize: function() {
		//Initialize the publish/subscribe bus
		window.pubSubBus = _.extend({},Backbone.Events);
	},

//http://www.geekdave.com/2012/04/05/module-specific-subroutes-in-backbone/
	routes: {
		'' : 'index',
		'user/:id' : 'user',
		'user/:id/read' : 'read',
		'user/:id/lemons' : 'lemons',
		'user/:uid/reply/:question_id' : 'reply',
	},
	
	index: function() {
		this.showViewContent(new ViewIndex());
	},
	user: function(user) {
		this.showViewContent(new ViewUser({model: window.USER}));
	},
	reply: function(user, question_id) {
		this.showViewContent(new ViewReply({model: window.USER, question_id: question_id}));
	},
	read: function(id) {
		this.showViewContent(new ViewRead({id: id}));
	},
	lemons: function(id) {
		this.showViewContent(new ViewLemons({id: id}));
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
