var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matkonSchema = new Schema({
	user_id: String,
	title: String,
	ingredients: [{title: String, quantity: Number, measureUnit: String}],
	created_at: {type: Date, default: Date.now},
    proccess: String,
    files: [{path: String, base64Prefix: String}]
});

var Matkon = mongoose.model('Matkon', matkonSchema); 