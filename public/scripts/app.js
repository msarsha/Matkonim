var matApp = angular.module('matApp', ['ngRoute', 'ngCookies']).run(
    function($rootScope, $http, $cookieStore){
        if(!$cookieStore.get('matAppAuth')){
            $rootScope.isAuthenticated = false;
            $rootScope.currentUser = '';
        }
        else{
            $rootScope.isAuthenticated = true;
            $rootScope.currentUser = $cookieStore.get('currentUser');
        }

        
        $rootScope.signout = function(){
            $http.get('auth/signout');
            $rootScope.isAuthenticated = false;
            $rootScope.currentUser = '';
            $cookieStore.remove('matAppAuth');
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
                                    console.log(result.data)
                                    return result.data;
                                })
                            
                                return promise;
            }
        }
    })
})


matApp.factory('matkonimService', matkonimService);

matApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

matApp.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);