YUI.add('the-app', function(Y) {

	Y.TheApp = Y.Base.create('theApp', Y.App, [], {

		// Add or override prototype properties and methods here.
		//

		views: {
			login: { type: 'LoginView' },
			main: { type: 'MainView' }
		},

		initializer: function() {

			this.on('loginView:logon', function(e) {
				Y.log(e);
				this.navigate('/');
			})
		},

		showLoginPage: function(req, res) {
			this.showView('login');
		},

		showMainPage: function(req, res) {
			this.showView('main');
		}
	}, {
		// Add static properties and methods here.
		//


		ATTRS: {
			// Add or override default attributes here.
			//

			root: {
				value: '/'
			},

			routes: {
				value: [
					{ 
						path: '/',
						callbacks: 'showMainPage'
					},
					{ 
						path: '/login', 
						callbacks: 'showLoginPage'
					}
				]
			}
		}
	});

}, '0.0.1', {
	requires: [ 'app', 'login-view', 'main-view' ]
});

