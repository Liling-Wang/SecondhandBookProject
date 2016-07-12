/**
 * Created by liling on 6/24/16.
 */


app.controller("homeController", ['$rootScope','$scope','$Ajax',
    function($rootScope,$scope ,$Ajax) {
        //console.log("in home controller");
        $scope.registerFunct = function () {
            
            if($scope.email == null || $scope.email ==""){
               console.log('please enter email address');
            }else if($scope.smsCode == null || $scope.smsCode == ""){
                console.log('please enter sms code');
            }else if($scope.registerName == null || $scope.registerName == ""){
                console.log(('please enter your name'));
            }else if($scope.password == null || $scope.password == ""){
                console.log(('please enter password'));
            }
            var params ={
                email:$scope.email,
                code:$scope.smsCode,
                name:$scope.registerName,
                password:$scope.password
            }
            $Ajax.post('/addCustomer', params).then(function (data){
                console.log("ajax post");
                if(data.success){
                    console.log("success");
                }else{
                    WarningBox(data.msg);
                }
            })

        }

        $scope.getCode = function () {
            if($scope.email == null || $scope.email == ''){
                console.log("email is empty");
            }else{
                var params={
                    email:$scope.email
                }
                $Ajax.post('/sms/' +$scope.email + '/sign',params).then(function(result){
                    console.log("in sms controller");
                    if(result.success){
                        console.log('successful to send out sms code');
                    }else{
                        console.log('unsuccessful to send out sms code');
                        WarningBox(result.msg);
                    }
                }).catch(function(error){
                    console.log('system error');
                })
            }

        }

    }


]);


