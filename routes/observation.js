var User = require('../models/user');
var Observation = require('../models/observation');

exports.list = function(req, res) {

	Observation.find({}, function(err, docs) {
		if(err) {
			res.statusCode = 500;
			return res.send(err);
		}
  	res.send(docs);
	});
};


exports.retrieve = function(req, res) {

	var id = req.params.id;

	User.findById(id, function(err, doc) {
		if(err) {
			res.statusCode = 500;
			return res.send(err);
		}
		if(!doc) {
			res.statusCode = 404;
			return res.send('User not found.');
		}
  	res.send(doc);
	});
};


exports.create = function(req, res) {

	// The weight field is mandatory.
	//
	if(!req.body.weight) {
		res.statusCode = 400;
		return res.send('Missing weight in request.');
	}

	// The observation date field is mandatory.
	//
	if(!req.body.observationDate) {
		res.statusCode = 400;
		return res.send('Missing observationDate in request.');
	}

	var userid = req.params.userid;

	User.findById(userid, function(err, doc) {
		if(err) {
			res.statusCode = 500;
			return res.send(err);
		}
		if(!doc) {
			res.statusCode = 404;
			return res.send('User not found.');
		}

		observationDate = new Date(req.body.observationDate);
		observationDate = new Date(
			observationDate.getUTCFullYear(),
			observationDate.getUTCMonth(),
			observationDate.getUTCDate());

		// Prepare obervation object to insert in the DB.
		//
		var now = new Date();
		var observation = new Observation({
			userId: userid,
			weight: req.body.weight,
			observationDate: observationDate,
			createdOn: now,
			updatedOn: now
		});

		// Insert the observation in the db collection.
		//
		observation.save(function(err, observation) {
			if(err) {
				res.statusCode = 500;
				return res.send(err);
			}
			
			return res.send(observation);
		});
	});
};


exports.update = function(req, res) {

	var id = req.params.id;

	// Retrieve the specified user using the provided id.
	//
	User.findById(id, function(err, user) {
		if(err) {
			res.statusCode = 500;
			return res.send(err);
		}

		if(!user) {
			res.statusCode = 404;
			return res.send('User not found.');
		}

		// Prepare user object for database update.
		//
		user.username = req.body.username ? req.body.username : user.username;
		user.name = req.body.name ? req.body.name : user.name;
		user.surname = req.body.surname ? req.body.surname : user.surname;
		user.updatedOn = new Date();

		// Update the user in the db collection.
		//
		user.save(function(err, user) {
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
	User.findByIdAndRemove(id, function(err, result) {
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
