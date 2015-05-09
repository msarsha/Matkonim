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

matApp.controller('authCtrl', authCtrl);
matApp.controller('matkonCtrl', matkonCtrl);
matApp.controller('matkonDetailsCtrl', matkonDetailsCtrl);

matApp.config(function($routeProvider){
    
    $routeProvider.when('/', {
        templateUrl: '../views/index.html'
    });
    
    $routeProvider.when('/signup', {
        templateUrl: '../views/signup.html',
        controller: 'authCtrl'
    });
    
    $routeProvider.when('/login', {
        templateUrl: '../views/login.html',
        controller: 'authCtrl'
    })
    
    $routeProvider.when('/addMatkon', {
        templateUrl: '../views/matkonForm.html',
        controller: 'matkonCtrl'
    })
    
    $routeProvider.when('/matkons', {
        templateUrl: '../views/matkonimView.html',
        controller: 'matkonCtrl'
    })
    
    $routeProvider.when('/matkonDetails/:title', {
        templateUrl: '../views/matkonDetails.html',
        controller: 'matkonDetailsCtrl',
        resolve: {
            matkonResolve: function($route, matkonimService){
                            var promise = matkonimService.getMatkon($route.current.params.title);
                            promise.then(function(result, data){
                                return result.data;
                    })
                            
                            return promise;
            }
        }
    })
})


matApp.factory('matkonimService', matkonimService);