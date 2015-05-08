var matApp = angular.module('matApp', ['ngRoute']).run(
    function($rootScope, $http){
        $rootScope.isAuthenticated = false;
        $rootScope.isAuthenticated = false;
        
        $rootScope.signout = function(){
            $http.get('auth/signout');
            $rootScope.isAuthenticated = false;
            $rootScope.currentUser = '';
            $location.url('/');
        }
});

matApp.config(function($routeProvider){
    $routeProvider.when('/signup', {
        templateUrl: '../views/signup.html',
        controller: 'authCtrl'
    });
    
    $routeProvider.when('/login', {
        templateUrl: '../views/login.html',
        controller: 'authCtrl'
    })
    
//    $routeProvider.otherWise('/')
})

matApp.controller('authCtrl', authCtrl);