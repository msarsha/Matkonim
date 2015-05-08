var express = require('express');
var router = express.Router();
var passport = require('passport');


router.post('/signup', passport.authenticate('signup'), function (req, res) {
	return res.send('TODO: sign up')
});

router.post('/login', passport.authenticate('login'), function(req, res){
	return res.send('TODO: login')
})

router.post('/signout', function (req, res) {
	req.logout();
	return res.send('TODO: redirect after signout')
})


module.exports = router;
