/**
 * Created by liling on 7/2/16.
 */

var listOfValue = require('../util/ListOfValue.js');
var userDao = require('../dao/UserDao.js');
var encrypt = require('../util/Encrypt');
var Seq = require('seq');
var smsDao = require('../dao/SmsDAO.js');
var mailTemplateUtil = require('../util/MailTemplateUtil.js');
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

var transport = nodemailer.createTransport('SMTP',{
   host:"smtp.gmail.com",
    //secureConnection: true, // 使用 SSL
    port:587,//port for secure SMTP
    auth:{
        user:'yangyang0935@gmail.com',
        pass:"feckqqpbvlycpxia"
    }
});

function sendSignInSms(req, res, next){
    var params = req.params;
    params.smsType = listOfValue.SMS_REG_TYPE;
    var smsKey = "";
    var insertFlag = true;
    Seq().seq(function () {
        var that = this;
        userDao.queryUser(params, function (error, rows) {
            if (error) {
                console.log('send sign in sms');
            } else {
                if (rows && rows.length > 0) {
                    res.send(200, {success: false, msg: "customer signup phone registered"});
                    return next();
                } else {
                    console.log("rows", rows);
                    that();
                }
            }
        })
    }).seq(function(){
            smsKey = encrypt.getSmsRandomKey();
            var that = this;
            smsDao.querySms(params, function(error, rows){
                if(error){
                    console.log(' send sign in sms error');
                }else{
                    if(rows && rows.length > 0){
                        insertFlag = false;
                    }else{
                        insertFlag = true;
                    }
                    that();
                }

            })
        that();
        }).seq(function () {
            var that = this;
            mailTemplateUtil.getCodeTemplate(smsKey, req.params.email,function(error, data){
                transport.sendMail({
                    from:"yangyang0935@gmail.com",
                    to:req.params.email,
                    subject:"Sms code",
                    html:data

                },function(error, response){
                    if(error){
                        console.log("getCodeTamplate email error");

                    }else{
                        console.log("sucessful to send email $$$$$$$$$$$$$$$$$$$$$$$");
                        that();
                    }
                    transport.close();
                });
            });
        }).seq(function () {
            console.log("4444444");
            params.code = smsKey;
            if(insertFlag){
                smsDao.addSms(params, function(error, result){
                    if(error){
                        console.log("addSms error");
                    }else{
                        if(result && result.affectedRows>0){
                            res.send(200,{success : true});
                        }else{
                            res.send(200,{success : false,msg:errMsg});
                        }
                    }
                });
            }else{
                smsDao.updateSms(params,function(error, result){
                    if(error){
                        console.log("updateSms error");
                    }else{

                        if(result && result.affectedRows>0 ){
                            res.send(200,{success : true});
                        }else{
                            res.send(200,{success : false,msg:errMsg});
                        }
                    }
                })
            }
        })
}

module.exports ={
    sendSignInSms:sendSignInSms
}