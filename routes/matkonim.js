var express = require('express'),
	router = express.Router(),
	matkonimService = require('../matkonimService'),
	authorize = require('./authorization');


router.use(authorize)

router.route('/mat')
	.post(function (req, res) {

		if (!req.body.title || !req.body.ingredients) {
			return res.send({message: "title or ingredients are missing"})
		};
		
		matkonimService.addMatkon(req.user._id, req.body, 
			function (err, matkon) {
				if (err) {
					return res.status(500).send(err);
				};

				return res.status(200).send({message: "matkon added successfuly"})
			}
		);
	})
	.get(function (req, res) {
		matkonimService.getAllMatkonsByUserId(req.user._id, function (err, matkons) {
			if (err) {
				return res.status(500).send(err);
			};

			return res.status(200).send(matkons);
		})
	})

router.route('/mat/:title')
	.get(function (req, res) {
		matkonimService.getMatkonByTitle(req.user._id, req.params.title, function (err, matkon) {
			if (err) {
				return res.status(500).send(err);
			};

			return res.status(200).send(matkon);
		})
	})
	.put(function (req, res) {
		
	})

module.exports = router;