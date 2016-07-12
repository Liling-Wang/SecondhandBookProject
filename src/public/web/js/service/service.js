/**
 * Created by liling on 6/27/16.
 */
app.factory('$Ajax',['$http','$location','$q',function ($http,$location,$q) {
    
    var _this = {};
    _this.ADMIN_AUTH_NAME = "admin-token";
    
    _this.setHeader = function(name, value){
        $http.defaults.headers.common[name] =value;
    };
    
    _this.setHeader('Content-Type','application/json');

    var fnArray = ['get','delete','jsonp','head','post','put'];
    for(var i in fnArray) {
        (function(fn) {
            _this[fn] = function(url,param) {
                url = 'liling/api' + (url[0]==='/'?'':'/') + url;
                var deferred = $q.defer();
                //only 'post,put' need 2nd parameter
                $http[fn](url,param).success(function(data){
                    deferred.resolve(data);
                }).error(function(data){
                    //checkAuthorizedStatus(data);
                    deferred.reject(data);
                });
                return deferred.promise;
            };
        })(fnArray[i]);
    }

   // function checkAuthorizedStatus(data) {
     //   if(!angular.isUndefined(data.outMsg) && data.outMsg=="Access token error ,the Api can't be accessed") {
          //  $.cookie(_this.ADMIN_AUTH_NAME,"");
          //  window.location.href="admin_login.html";
       // }
   // }

    return _this;
}]);