/**
 * Created by liling on 6/29/16.
 */
var mysql = require('mysql');
var sysConfig = require('../config/SystemConfig.js');

var pool = mysql.createPool(sysConfig.getMysqlConnectOptions());

var getConnection = function(callback){
    pool.getConnection(function(err, connection){
        callback(err, connection);
    });
};

var dbQuery = function (sql, values, callback) {
  //  console.log("sql",sql);
  //  console.log("values",values);
    pool.getConnection(function(conError, con){
        if(conError){
            console.log("Connect mysql error:");
            callback(conError, null);
        }else{
            con.query(sql,values,function(error, rows){
                if(error){
                    console.log("Execute mysql query error:");
                    con.rollback();
                }
                con.release();
                callback(error, rows);
            })
        }
    })
}

exports.getCon = getConnection;

module.exports ={
    getCon: getConnection,
    dbQuery:dbQuery
}