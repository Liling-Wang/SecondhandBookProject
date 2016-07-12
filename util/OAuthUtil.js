/**
 * Created by liling on 7/8/16.
 */

var userDao = require('../dao/UserDAO.js');

function createAccessToken(clientType, userId, status){
    var out;
    out = _extend({},{
        access_token:serializer.stringify([clientType, userId, +new Date, status]),
        refresh_token:null
    });
    userDao.updateUserLoginDate({userId:userId}, function(error,result){
        if(error){
            console.log('createAccessToke updateUserLoginDate error');
        }else{
            console.log('createAccessToke updateUserLoginDate' + result.affectedRows > 0);
        }
    });
    return out.access_token;
}

module.exports= {
    createAccessToken: createAccessToken
}