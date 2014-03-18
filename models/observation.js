var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var observationSchema = new Schema({
	userId: Schema.Types.ObjectId,
	weight: Number,
	observationDate: { type: Date },
	createdOn: { type: Date, default: Date.now },
	updatedOn: { type: Date, default: Date.now }
}, {
	collection: 'observations'
});
var Observation = mongoose.model('Observation', observationSchema);
module.exports = Observation;
