var passport = require('passport'),
	LocalStrategy = require('passport-local'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	bCrypt = require('bcrypt-nodejs');


module.exports = function(){

	passport.serializeUser(function(user, done) {
	  	done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user);
	  });
	});

	passport.use('signup', new LocalStrategy(
		function (username, password, done) {
			console.log('user is signing up - ' + username)
			User.findOne({username : username}, function(err, user){
				if (err) {
					return done(err);
				}
				if (user) {
					return done(null, false, {message: "Username already exists"})
				};

				var newUser = new User();
				newUser.username = username;
				newUser.password = createHash(password);

				newUser.save(function(err, user){
					if (err) {
						return done(err);
					};

					return done(null, user, {message: "successfuly sign up user: " + user.username})
				})
			})	
		}
	))

	passport.use('login', new LocalStrategy(
		function (username, password, done) {
			User.findOne({username: username}, 
				function (err, user) {
					if (err) {
						return done(err)
					};

					if (!user) {
						return done(null, false, {message: "incorrect username"})
					};

					if (!isValidPassword(user, password)) {
						return done(null, false, {message: "incorrect password"})
					};

					return done(null, user, {message: "logged in successfuly"})
			})
		}
	))

	var isValidPassword = function(user, password){
		return bCrypt.compareSync(password, user.password);
	}

	var createHash = function (password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	}
};