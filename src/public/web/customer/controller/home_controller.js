/**
 * Created by liling on 6/24/16.
 */


app.controller("homeController", ['$rootScope','$scope','$Ajax',
    function($rootScope,$scope ,$Ajax) {
        //console.log("in home controller");
        $scope.registerFunct = function () {
            var params ={
                email:$scope.email,
                password:$scope.password,
            }
            $Ajax.post('/user/do/login', params).then(function (data){
                console.log("ajax post");
                if(data.success){
                    console.log("success");
                }else{
                    console.log("error")
                }
            })

        }

    }
]);


