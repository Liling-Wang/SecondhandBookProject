/**
 * Created by liling on 7/15/16.
 */
app.controller("mainController", ['$rootScope','$scope','$Ajax','$location',
    function($rootScope,$scope ,$Ajax,$location) {
        //console.log("in home controller");
        $scope.userName = $.cookie('userName');
        $rootScope.go = function(path) {
            $location.url(path);
        };

        $scope.logOut = function(){
            
        }
        

    }


]);
