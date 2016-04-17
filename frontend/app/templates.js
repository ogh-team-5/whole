tpl = {

	// Hash of preloaded templates for the app
	templates: {},

	// Get template by name from hash of preloaded templates
	get: function(name) {

		//If template not already loaded, load-it
		if(this.templates[name] === undefined) {
			var to_return = null;
			var that = this;
			
			$.ajax({
				async: false,
				type: 'GET',
				url: 'app/tpl/'+name+'.html',
				success: function(data) {
					//console.log('Got tpl '+name);
					that.templates[name] = data;
					to_return = data;
				},
				error: function() {
					alert('Template not found >'+name+'<');
				}
			});
			
			return to_return;
		}
		
		return this.templates[name];
	}
};
