var express = require('express');
var router = express.Router();
var passport = require('passport');


router.post('/signup', passport.authenticate('signup'), function (req, res) {
	return res.status(200).send(req.user != null)
});

router.post('/login', passport.authenticate('login'), function(req, res){
	return res.status(200).send(req.user != null)
})

router.get('/signout', function (req, res) {
	req.logout();
	return res.sendStatus(200);
})


module.exports = router;
