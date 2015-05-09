var matkonimService = function($rootScope, $http){
    var addmatkon = function(matkon, cb){
        $http.post('/api/mat', matkon)
            .success(function(response, status){
                cb(null, response);
        }).error(function(err, status){
            cb(err, null);
        })
    }
    
    var getAllMatkonim = function(cb){
        $http.get('/api/mat')
            .success(function(response){
                cb(null, response);
        }).error(function(err){
            cb(err, null);
        })
    }
    
    var getMatkon = function(title, cb){
        var promise = $http.get('/api/mat/' + title);
        return promise;
//            .success(function(response){
//                cb(null, response)
//        }).error(function(err){
//            cb(err, null)
//        })
    }
    
    return {
        add: addmatkon,
        getAll: getAllMatkonim,
        getMatkon: getMatkon
    }
}