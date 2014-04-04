YUI.add('the-app', function(Y) {

	Y.TheApp = Y.Base.create('theApp', Y.App, [], {

		// Add or override prototype properties and methods here.
		//

		views: {
			login: { type: 'LoginView' },
			main: { type: 'MainView' },
			newObservation: { type: 'NewObservationView' }
		},

		initializer: function() {

			this.on('loginView:logon', function(e) {
				Y.log(e);
				this.navigate('/');
			});

			this.on('mainView:showNewObservation', function(e) {
				this.navigate('/newObservation');
			});
		},

		showLoginPage: function(req, res) {
			this.showView('login');
		},

		showMainPage: function(req, res) {
			this.showView('main');
		},

		showNewObservationPage: function(req, res) {
			this.showView('newObservation');
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
					},
					{
						path: '/newObservation',
						callbacks: 'showNewObservationPage'
					}
				]
			}
		}
	});

}, '0.0.1', {
	requires: [ 'app', 'login-view', 'main-view', 'new-observation-view' ]
});

