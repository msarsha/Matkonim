var authCtrl = function($scope, $rootScope, $http, $location){
    $scope.login = function(){
        $http.post('/auth/login', $scope.user).success(function(response){
            if(response){
                $rootScope.isAuthenticated = true;
                $rootScope.currentUser = $scope.user;
                $location.url('/');
            }
            console.log('failed')
            $scope.errorMsg = "שם משתמש או סיסמה לא נכונים"
            $scope.showError = true;
            
        }).error(function(data, status){
            $scope.errorMsg = "שם משתמש או סיסמה לא נכונים"
            $scope.showError = true;
        })
    }
    $scope.signup = function(){
        $http.post('/auth/signup', $scope.user).success(function(response, status){
            if(status == 200){
                $rootScope.isAuthenticated = true;
                $rootScope.currentUser = $scope.user;
                $location.url('/');
            }
        }).error(function(data){
            $scope.showError = true;
            $scope.errorMsg = "הרשמה נכשלה"
        })
    }
 }
    
