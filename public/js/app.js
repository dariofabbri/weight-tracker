YUI.add('the-app', function(Y) {

	Y.TheApp = Y.Base.create('theApp', Y.App, [], {
		// Add or override prototype properties and methods here.
		//
		views: {
			login: { type: 'LoginView' },
			main: { type: 'MainView' }
		}
	}, {
		// Add static properties and methods here.
		//
		ATTRS: {
			// Add or override default attributes here.
			//
		}
	});

}, '0.0.1', {
	requires: [ 'app', 'login-view', 'main-view' ]
});

