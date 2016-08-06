/**
 * Created by liling on 7/15/16.
 */
app.controller("mainController", ['$rootScope','$scope','$Ajax','$location','$ajax',
    function($rootScope,$scope ,$Ajax,$location,$ajax) {
        //console.log("in home controller");
        $scope.userName = $.cookie('userName');
        $rootScope.go = function(path) {
            $location.url(path);
        };

        $scope.logOut = function(){
            
        }
       
        $ajax.get('/bookType').then(function (data) {
            console.log("data", data);
            $scope.bookTypeArray = data.data.result;
            if(data.success){
                console.log("data.result: ",data.result);
                $scope.bookTypeArray = data.result;
            }
            
        }).catch(function (error) {
            WarningBox('bookType: 服务器内部错误');
        });

        $scope.text = {};
        $scope.sendText = function () {
            var params = {
                "subject": $('#subjectSelect').val(),
                "textTitle": $scope.text.title,
                "textContent":$scope.text.content
            }

            console.log("params", params);

        }


        

    }


]);
