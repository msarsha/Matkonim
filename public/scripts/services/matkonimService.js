var matkonimService = function($rootScope, $http){
    var addmatkon = function(matkon, cb){

//        var fd = createFormData(matkon);
//        console.log('file in server:' + matkon.file)
        
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
    
    var getMatkonsWithFilter = function(filter, cb){
        $http.get('/api/mat/filter', filter)
            .success(function(response){
                
        })
    }
    
    var getMatkon = function(title){
        var promise = $http.get('/api/mat/' + title);
        return promise;
    }
    
    function createFormData(data){
        var fd = new FormData();
        angular.forEach(data, function(value, key) {
            fd.append(key, value);
        });
        return fd;
    }
    
    return {
        add: addmatkon,
        getAll: getAllMatkonim,
        getMatkon: getMatkon
    }
}