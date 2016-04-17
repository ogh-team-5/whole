/* ROUTEUR DE L'APPLICATION */
var FOGEA_router = Backbone.Router.extend({

	initialize: function() {
		//Initialize the publish/subscribe bus
		window.pubSubBus = _.extend({},Backbone.Events);
	},

//http://www.geekdave.com/2012/04/05/module-specific-subroutes-in-backbone/
	routes: {
		'' : 'index',
		'submit' : 'submit',
		'read/:id' : 'read',
	},
	
	index: function() {
		this.showViewContent(new ViewIndex());
	},
	submit: function() {
		this.showViewContent(new ViewSubmit());
	},
	read: function(id) {
		this.showViewContent(new ViewRead({id: id}));
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
