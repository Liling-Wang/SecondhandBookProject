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
console.log('in main controller');
        $Ajax.post('/bookType').then(function (data) {
            console.log("data", data);
            $scope.bookTypeArray = data.result;
            if(data.success){
                console.log("data.result: ",data.result);
                $scope.bookTypeArray = data.result;
            }
            
        }).catch(function (error) {
            WarningBox('bookType: 服务器内部错误');
        })
        

    }


]);
