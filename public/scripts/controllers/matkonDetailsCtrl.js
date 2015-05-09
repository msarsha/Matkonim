var matkonDetailsCtrl = ['$scope','$routeParams', 'matkonimService', 'matkonResolve', function($scope, $routeParams, matkonimService, matkonResolve){
    $scope.matkon = matkonResolve.data;
    
}]