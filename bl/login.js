/**
 * Created by liling on 6/27/16.
 */
var userDao = require('../dao/UserDAO.js');
var encrypt = require('../util/Encrypt');

function custLogin(req, res,next){

    var params = req.params;
    
    userDao.queryUser(params, function(error, rows){
        if(error){
            console.log('custLogin error: ' + 'system internal error');
        }else{
            if(rows && rows.length < 1){
                console.log('customer do not register');
                return  next();
            }else{
                //console.log('welcome to shoppingshopping website!!!!');
                var passwordMd5 = encrypt.encryptByMd5(params.password);
                if(passwordMd5 != rows[0].password){
                    res.send(200, {success:false, msg:'customer log in error'});
                    return next();
                }else{
                    var user = {
                        userId : rows[0].id,
                        userStatus : rows[0].use

                    }
                    res.send(200,{success: true, user:user});
                    return next();
                }
            }
        }
    })

    
}

module.exports = {
    custLogin:custLogin,
}
