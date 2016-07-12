/**
 * Created by liling on 7/3/16.
 */

var db = require('./connection/MysqlDb.js');

function querySms(params,callback){
    console.log("params", params);
    var query = "select * from user_sms where email = ? "
    var paramArray=[], i =0;
    paramArray[i++] = params.email;
    if(params.code){
        paramArray[i++] = params.code;
        query += " and code = ?"
    }
    if(params.smsType){
        paramArray[i++]=params.smsType;
        query += " and sms_type = ?"
    }
    db.dbQuery(query, paramArray, function (error, rows) {
        console.log('querySms');
        return callback(error, rows);
    });
}

function addSms(params, callback){
    var query = " insert into user_sms (email,code,sms_type) values (?,?,?) ";
    var paramArray=[],i=0;
    paramArray[i++]=params.email;
    paramArray[i++]=params.code;
    paramArray[i]=params.smsType;

    db.dbQuery(query,paramArray,function(error,rows){
        console.log("addSms dao ")
        return callback(error,rows);
    });
}

function updateSms(params,callback){
    var query = " update user_sms set code=? where email = ? and sms_type = ? "
    var paramArray=[],i=0;
    paramArray[i++]=params.code;
    paramArray[i++]=params.email;
    paramArray[i]=params.smsType;

    db.dbQuery(query,paramArray,function(error,rows){
        console.log("update dao");
        return callback(error,rows);
    });
}

module.exports = {
    querySms:querySms,
    addSms:addSms,
    updateSms:updateSms
}