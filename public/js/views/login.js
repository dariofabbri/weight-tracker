YUI.add('login-view', function(Y) {

	var template;
	Y.io('./templates/login.html', {
		on: {
			success: function(tx, r) {
				template = Y.Handlebars.compile(r.responseText);
			}
		},
		sync: true
	});

	Y.LoginView = Y.Base.create('loginView', Y.View, [], {

		template: template,

		render: function() {

			var container = this.get('container');
			container.setHTML(this.template());
		},

		events: {
			'#loginButton': {
				click: 'onLoginButtonClick'
			}
		},

		onLoginButtonClick: function(e) {
			
			// Check credentials...
			//

			// Signal main app that login went fine.
			//
			this.fire('logon', {
				username: 'antani',
				password: 'antani'
			});
		}
	});

}, '0.0.1', {
	requires: [ 'node', 'view', 'handlebars' ]
});

