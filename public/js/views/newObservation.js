YUI.add('new-observation-view', function(Y) {

	var template;
	Y.io('./templates/newObservation.html', {
		on: {
			success: function(tx, r) {
				template = Y.Handlebars.compile(r.responseText);
			}
		},
		sync: true
	});

	Y.NewObservationView = Y.Base.create('newObservationView', Y.View, [], {

		template: template,

		render: function() {

			var container = this.get('container');
			container.setHTML(this.template());

			// Preset current date in date field.
			//
			container.one('#observationDate').set('value', Y.Date.format(new Date(), { format: '%G-%m-%d'}));
		},

		events: {
			'#observationDate': {
				keypress: 'onKeyPress'
			},
			'#weight': {
				keypress: 'onKeyPress'
			},
			'#cancelButton': {
				click: 'onCancelButtonClick'
			},
			'#saveButton': {
				click: 'onSaveButtonClick'
			}
		},

		onKeyPress: function(e) {
			if(e.keyCode === 13) {
				this.doSave();
			}
		},

		onSaveButtonClick: function(e) {
			this.doSave();
		},

		doSave: function() {

			var me = this;
			
			// Retrieve form fields.
			//
			observationDate = Y.one('#observationDate').get('value');
			weight = Y.one('#weight').get('value');

			// Execute AJAX call.
			//
			var auth = 'Basic ' + Y.Base64.encode(username + ':' + password);
			var io = new Y.IO();
			io.send('/login', {
				method: 'POST',
				headers: {
					'Authorization': auth
				},
				data: {
					observationDate: observationDate,
					weight: parseFloat(weight)
				},
				on: {
					success: function(t, r) {

						// Signal main app that the new observation creation went fine.
						//
						me.fire('observationCreated');
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
	requires: [ 'node', 'view', 'handlebars', 'transition', 'base64', 'datatype-date-format' ]
});

