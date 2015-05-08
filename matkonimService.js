var mongoose = require('mongoose'),
	Matkon = mongoose.model('Matkon')

module.exports.addMatkon = function (userId, matkonToAdd, done) {

	Matkon.findOne({title: matkonToAdd.title, user_id: userId}, function (err, matkon) {
		if (err) {
			return done(err, null);
		};

		//if matkon already exists
		if (matkon) {
			return done("matkon already exists", null)
		};


		newMatkon = new Matkon();
		newMatkon.user_id = userId;
		newMatkon.title = matkonToAdd.title;
		newMatkon.ingredients = matkonToAdd.ingredients;

		newMatkon.save(function (err, dbMatkon) {
			return done(err, dbMatkon);
		})
	})
};

module.exports.getAllMatkonsByUserId = function (userId, done) {
	Matkon.find({user_id: userId}, function (err, matkons) {
		return done(err, matkons);
	})
}

module.exports.getMatkonByTitle = function (userId, title, done) {
	Matkon.find({user_id: userId, title: title}, function (err, matkon) {
		return done(err, matkon);
	})
}