Backbone.View.prototype.close = function () {
	console.log('Closing view ' + this);
	if (this.beforeClose) {
		this.beforeClose();
	}
	this.remove();
	this.unbind();
};


window.USER = new User();

FOGEA_app = new FOGEA_router();
Backbone.history.start();
