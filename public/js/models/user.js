YUI.add('user-model', function(Y) {

	Y.UserModel = Y.Base.create('userModel', Y.Model, [Y.ModelSync.REST], {
		idAttribute: '_id',
		root: '/users'
	}, {
		ATTRS: {
			_id: {},
			name: {},
			surname: {},
			username: {},
			password: {},
			updatedOn: {},
			createdOn: {}
		}
	});

	Y.UserModelList = Y.Base.create('userModelList', Y.ModelList, [Y.ModelSync.REST], {
		model: Y.UserModel
	});

}, '0.0.1', {
	requires: [ 'model', 'model-list', 'model-sync-rest' ]
});
