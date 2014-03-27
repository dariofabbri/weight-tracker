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

			var me = this;
			
			// Retrieve form fields.
			//
			username = Y.one('#username').get('value');
			password = Y.one('#password').get('value');

			// Check supplied credentials.
			//
			var auth = 'Basic ' + Y.Base64.encode(username + ':' + password);
			var io = new Y.IO();
			io.send('/login', {
				method: 'GET',
				headers: {
					'Authorization': auth
				},
				async: true,
				username: username,
				password: password,
				on: {
					success: function(t, r) {
						Y.log(r);

						// Signal main app that login went fine.
						//
						me.fire('logon', {
							username: 'antani',
							password: 'antani'
						});
					},

					failure: function(t, r) {
						Y.log('Failure!');
					}
				}
			});
		}
	});

}, '0.0.1', {
	requires: [ 'node', 'view', 'handlebars', 'base64' ]
});

