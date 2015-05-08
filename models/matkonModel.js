var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matkonSchema = new Schema({
	user_id: String,
	title: String,
	ingredients: [{title: String, quantity: Number}],
	created_at: {type: Date, default: Date.now}
});

var Matkon = mongoose.model('Matkon', matkonSchema); 