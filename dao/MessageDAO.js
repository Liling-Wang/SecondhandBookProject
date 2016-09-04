/**
 * Created by liling on 8/6/16.
 */
var db = require('./connection/MysqlDb.js');

function newMessage(params, callback) {
   // console.log("params",params);
    var query = " insert into message (subject, title,content) values (?,?,?)";
    var paramArray=[], i =0;
    paramArray[i++] = params.subject;
    paramArray[i++] = params.textTitle;
    paramArray[i++] = params.textContent;
    db.dbQuery(query, paramArray, function(error,rows){
        return callback(error, rows);
    })

}

function queryMessage(params, callback) {
    var query =" select * from message where id is not null";
    var paramArray=[],i=0;
    if(params.insertId){
        query = query + " and id = ? "
        paramArray[i++] = params.insertId;
    };
    query = query + " order by id desc ";
    db.dbQuery(query, paramArray, function(error,rows){
        return callback(error, rows);
    })
}

module.exports = {
    newMessage : newMessage,
    queryMessage:queryMessage
}