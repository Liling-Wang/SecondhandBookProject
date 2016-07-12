/**
 * Created by liling on 7/7/16.
 */
var listOfValue = require('../util/ListOfValue.js');
var smsDao = require('../dao/SmsDAO.js');
var userDao = require('../dao/UserDAO.js');
var encrypt = require('../util/Encrypt');
var Seq = require('seq');

function  addCustomer(req, res, next) {
    var params = req.params;
    //console.log(params);
    params.smsType = listOfValue.SMS_REG_TYPE;
    Seq().seq(function(){
        var that = this;
        smsDao.querySms(params,function(error,rows){
            if(error){
                console.log('addCustomer error');
            }else{
                if(rows && rows.length < 1){
                    console.log('addCustomer do not have email or sms code');
                    res.send(200, {success:false, msg:'query sms system error'});
                    return next();
                }else{
                    that();
                }
            }

        })
    }).seq(function(){
        var that = this;
        userDao.queryUser(params,function(error, rows){
            if(error){
                console.log('queryuser error');
                return next();
            }else{
                if(rows && rows.length > 0){
                    console.log("email had been register");
                    res.send(200, {success:false, error:'query user system error'});
                    return next();
                }else{
                    that();
                }
            }
        })
    }).seq(function () {
        params.password = encrypt.encryptByMd5(params.password);
        userDao.addUser(params, function(error, result){
            if(error){
                console.log(' add user error');
            }else{
                if(result && result.insertId > 0){
                    userDao.updateUserLoginDate({userId:result.insertId},function(error,result){
                        if (error) {
                            logger.error(' createAccessToken  updateUserLoginDate ' + error.message);
                        } else {
                            logger.info(' createAccessToken  updateUserLoginDate ' + result.affectedRows>0);
                        }
                    });
                }else{
                    console.log('adduser false');
                }
                return next();
            }
        })
        
    })
    
}

module.exports={
    addCustomer:addCustomer
}