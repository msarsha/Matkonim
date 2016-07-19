var matkonCtrl = ['$scope', '$rootScope', 'matkonimService', function($scope, $rootScope, matkonimService){
    $scope.matkon = {
        title: "",
        ingredients: [{title: "", quantity: 0, measureUnit: "גרם"}],
        file: {}
    };

    $scope.measureUnits = ["גרם", "כפות", "מיליליטר", "כפיות", "כוסות"]
    $scope.matkonim = {};
    
    $scope.addMatkon = function(){
        
        console.log('the file - ' + $scope.matkon.file);
        
        matkonimService.add($scope.matkon, function(err, result){
            if(err){
                alert('cannot add matkon');
            }else{
                alert('matkon added');
            }
            
        })
    }
    
    $scope.getAll = function(){
        matkonimService.getAll(function(err, result){
            if(err){
                alert(err)
            }else{
                $scope.matkonim = result;
            }
        })
    }
    
    $scope.addIng = function(){
        $scope.matkon.ingredients.push({title: "", quantity: 0, measureUnit: "גרם"});
    }
    
    $scope.removeIng = function(index){
        $scope.matkon.ingredients.splice(index, 1);
    }
}]
