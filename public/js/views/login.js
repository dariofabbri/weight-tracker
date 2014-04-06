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
			'#username': {
				keypress: 'onKeyPress'
			},
			'#password': {
				keypress: 'onKeyPress'
			},
			'#loginButton': {
				click: 'onLoginButtonClick'
			}
		},

		onKeyPress: function(e) {
			if(e.keyCode === 13) {
				this.doLogin();
			}
		},

		onLoginButtonClick: function(e) {
			this.doLogin();
		},

		doLogin: function() {

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
				on: {
					success: function(t, r) {

						// Store credentials and user id.
						//
						Y.loginInfo = Y.JSON.parse(r.responseText);

						// Signal main app that login went fine.
						//
						me.fire('logon');
					},

					failure: function(t, r) {

						// Show alert message.
						//
						var alertNode = Y.Node.create('<div class="alert alert-danger">Wrong credential!</div>').hide(true);
						Y.one('.panel-body').prepend(alertNode);
						alertNode.show(true, function() {
							alertNode.hide(true, { delay: 5 }, function() {
								alertNode.remove();
							})
						});
					}
				}
			});
		}
	});

}, '0.0.1', {
	requires: [ 'node', 'view', 'handlebars', 'transition', 'base64', 'json-parse' ]
});

