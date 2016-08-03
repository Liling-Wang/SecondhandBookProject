/**
 * Created by liling on 8/2/16.
 */
var db = require('./connection/MysqlDb.js');

function queryBookType(params, callback) {
    var query = "select * from bookType where id is not null";
    var paramArray=[], i=0;
   db.dbQuery(query, paramArray, function(error, rows){
       console.log(' queryCourseType');
       return callback(error, rows);
   })

}

module.exports ={
    queryBookType:queryBookType
}