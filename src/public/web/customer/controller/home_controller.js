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
        
        $scope.onLogin = function(){

            if($scope.email == null || $scope.email ==''){
                WarningBox(result.msg);
            }else if($scope.password == null || $scope.password == ''){
                WarningBox(result.msg);
            }else{
                var params = {
                    email: $scope.email,
                    password:$scope.password
                }
                $Ajax.post('/user/do/login',params).then(function(result){
                    console.log("result",result);
                    if(result.success){
                        console.log('successful to log in');
                        $.cookie('userId', result.userId,{path:'/',expires: 30});
                        $.cookie('userName', $scope.email,{path:'/',expires: 30});
                        $.cookie('userStatus', result.userStatus,{path:'/',expires: 30});
                        window.location.href = "/main.html#/searchPage";
                    }else{
                        console.log("result",result);
                        console.log("result.success",result.success);
                        console.log('unsuccessful to log in');
                    }
                }).catch(function (error) {
                    console.log("error", error);
                    console.log('服务器内部错误');

                })
            }
        }

    }


]);


