/**
 * Created by liling on 6/27/16.
 */
var userDao = require('../dao/UserDAO.js');
var encrypt = require('../util/Encrypt');

//console.log("userdao",userDao);

function custLogin(req, res,next){
//console.log("res++++++++++++++++++",res.send());
   // res.send(200,{result:true});
   // res.send(200,{msg:'customer log in error'});

    var params = req.params;
    console.log("params:",11);
    
    userDao.queryUser(params, function(error, rows){
        console.log("rows", 1);
        if(error){
            console.log('custLogin error: ' + 'system internal error');
        }else{
            console.log("rows", 2);
            if(rows && rows.length < 1){
                console.log('customer do not register');
                return  next();
            }else{
                //console.log('welcome to shoppingshopping website!!!!');
                console.log("rows", rows);
                var passwordMd5 = encrypt.encryptByMd5(params.password);
                if(passwordMd5 != rows[0].password){
                    res.send(200, {success:false, msg:'customer log in error'});
                    return next();
                }else{
                    console.log("in login");
                    var user = {
                        userId : rows[0].id,
                        userStatus : rows[0].use

                    };
                    res.send(200,{success: true, user:user});
                    return next();
                }
            }
        }
    })

    //res.send(200,{success: true});
}

module.exports = {
    custLogin:custLogin,
}
