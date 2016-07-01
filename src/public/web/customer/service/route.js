/**
 * Created by liling on 6/24/16.
 */
console.log("in route.js");
app.config(['$routeProvider',function($routeProvider) {
    console.log("in route.js2");
    $routeProvider

        .when('/register',{

            templateUrl:'/public/web/customer/view/register.html',
            controller:'homeController'
            
        })
        .when('/login',{
            templateUrl:'./src/login.html',
            controller:'homeController'
        })
        .otherwise({
           // templateUrl: '/register'

        });

}]);