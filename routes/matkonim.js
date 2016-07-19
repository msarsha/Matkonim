var express = require('express'),
	router = express.Router(),
	matkonimService = require('../matkonimService'),
	authorize = require('./authorization'),
    fileHandler = require('../fileHandler');


router.use(authorize)

router.route('/mat')
	.post(function (req, res) {

		if (!req.body.title || !req.body.ingredients) {
			return res.send({message: "title or ingredients are missing"})
		};

        fileHandler.SaveImage(req.body.file, 'files\\test.jpeg', function(err, result){
            
            if(err){
                console.log(err);
                return res.status(500).send('unable to save file');
            };
            
            req.body.filePath = 'files\\test.jpeg';
            
            matkonimService.addMatkon(req.user._id, req.body, 
                function (err, matkon) {
                    if (err) {
                        return res.status(500).send(err);
                    };

                    return res.status(200).send({message: "matkon added successfuly"})
                }
            );
            
        })
		
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
            
            fileHandler.DecodeImage('files\\test.jpeg', function(err, data){
                
                matkon = {
                    matkon: matkon,
                    file: data
                }
                
                return res.status(200).send(matkon);
            })

		})
	})
	.put(function (req, res) {
		
	})

router.route('/mat/filter')
    .post(function(req, res){
    
    console.log(req.body.filter);
    
       matkonimService.getWithFilter(req.user._id, req.body.filter, function(err, matkons){
           if(err){
               return res.status(500).send(err);
           }
           
           return res.status(200).send(matkons);
       }) 
})

module.exports = router;