/**
 * Created by liling on 6/24/16.
 */
app.config(['$routeProvider',function($routeProvider) {
    $routeProvider

        .when('/register',{

            templateUrl:'/public/web/customer/view/register.html',
            controller:'homeController'
            
        })
        .when('/login',{
            templateUrl:'/public/web/customer/view/loginContent.html',
            controller:'homeController'
        })
        .otherwise({
           // templateUrl: '/register'

        });

}]);