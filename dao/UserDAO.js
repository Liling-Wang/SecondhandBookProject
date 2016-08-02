/**
 * Created by liling on 6/29/16.
 */
var db = require('./connection/MysqlDb.js');

function queryUser(params, callback){
    console.log("in query user");
    var query = "select * from register where id is not null";
    var paramArray=[], i=0;
    if(params.email){
        query = query + " and email = ? "
        paramArray[i++] = params.email;
    }
    if(params.sms){
        query = query + " and sms = ? "
        paramArray[i++] = params.sms;
        
    }
    if(params.name){
        query = query + " and name = ? "
        paramArray[i++] = params.name;
    }

    query = query + " order by id desc ";
    db.dbQuery(query, paramArray, function(error, rows){
       console.log('queryUser');
        return callback(error, rows);
    });

}

function addUser(params,callback){
    console.log("params",params);
    var query = " insert into register (email, sms,name,password) values (?,?,?,?)";
    var paramArray=[], i =0;
    paramArray[i++] = params.email;
    paramArray[i++] = params.code;
    paramArray[i++] = params.name;
    paramArray[i++] = params.password;
    db.dbQuery(query, paramArray, function(error,rows){
        return callback(error, rows);
    })
}

function updateUserLoginDate(params, callback){
    var query = "update register set last_login_on = CURRENT_TIMESTAMP where id =?";
    var paramArray=[], i = 0;
    paramArray[i]=params.userId;
    db.dbQuery(query, paramArray, function(error, rows){
        console.log('update user login date dao');
        return callback(error, rows);
    })
}


module.exports = {
    queryUser : queryUser,
    addUser:addUser,
    updateUserLoginDate:updateUserLoginDate
    
}