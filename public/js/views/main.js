YUI.add('main-view', function(Y) {

	var template;
	Y.io('./templates/main.html', {
		on: {
			success: function(tx, r) {
				template = Y.Handlebars.compile(r.responseText);
			}
		},
		sync: true
	});

	Y.MainView = Y.Base.create('mainView', Y.View, [], {

		template: template,

		render: function() {

			var container = this.get('container');
			container.setHTML(this.template());
		},

		initializer: function() {
		}
	});

}, '0.0.1', {
	requires: [ 'node', 'view', 'handlebars' ]
});

