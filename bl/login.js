/**
 * Created by liling on 6/27/16.
 */
var userDao = require('../dao/UserDAO.js');

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
                console.log('welcome to shoppingshopping website!!!!');
            }
        }
    })

    
}

module.exports = {
    custLogin:custLogin,
}
