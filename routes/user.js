exports.list = function(req, res) {

	req.db.bind('users');
	req.db.users.find().toArray(function(err, result) {
		if(err) {
			res.statusCode = 500;
			return res.send(err);
		}
  	res.send(result);
	});
};


exports.retrieve = function(req, res) {

	var id = req.params.id;

	req.db.bind('users');
	req.db.users.findById(id, function(err, result) {
		if(err) {
			res.statusCode = 500;
			return res.send(err);
		}
  	res.send(result);
	});
};


exports.create = function(req, res) {

	// The username field is mandatory.
	//
	if(!req.body.username) {
		res.statusCode = 400;
		return res.send('Missing username in request.');
	}

	// Check if the user is already present.
	//
	req.db.bind('users');
	req.db.users.findOne({username: req.body.username}, function(err, result) {
		if(err) {
			res.statusCode = 500;
			return res.send(err);
		}

		if(result) {
			res.statusCode = 409;
			return res.send('User already present.');
		}

		// Prepare user object to insert in the DB.
		//
		var now = new Date();
		var user = {
			username: req.body.username,
			name: req.body.name,
			surname: req.body.surname,
			createdOn: now,
			updatedOn: now
		};

		// Insert the user in the db collection.
		//
		req.db.users.insert(user, function(err, result) {
			if(err) {
				res.statusCode = 500;
				return res.send(err);
			}
			
			return res.send(result);
		});

	});
};


exports.update = function(req, res) {

	var id = req.params.id;

	// Retrieve the specified user using the provided id.
	//
	req.db.bind('users');
	req.db.users.findById(id, function(err, result) {
		if(err) {
			res.statusCode = 500;
			return res.send(err);
		}

		if(!result) {
			res.statusCode = 404;
			return res.send('User not found.');
		}

		// Prepare user object for database update.
		//
		var user = result;
		user.username = req.body.username ? req.body.username : user.username;
		user.name = req.body.name ? req.body.name : user.name;
		user.surname = req.body.surname ? req.body.surname : user.surname;
		user.updatedOn = new Date();

		// Update the user in the db collection.
		//
		req.db.users.save(user, function(err, result) {
			if(err) {
				res.statusCode = 500;
				return res.send(err);
			}

			return res.send(user);
		});

	});
};


exports.delete = function(req, res) {

	var id = req.params.id;

	// Remove the user from the database.
	//
	req.db.bind('users');
	req.db.users.removeById(id, function(err, result) {
		if(err) {
			res.statusCode = 500;
			return res.send(err);
		}

		if(!result) {
			res.statusCode = 404;
			return res.send('User not found.');
		}

		return res.send('User removed.');
	});
};
