/**
 * Created by liling on 6/29/16.
 */


function queryUser(params, callback){
    var query = "select * from register when id is not null";
    var paramArray=[], i=0;
    if(params.email){
        query = query + " and id = ? "
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
    if(params.password){
        query = query + " and password = ? "
        paramArray[i++] = params.password;
    }
    query = query + " order by id desc ";
    db.dbQuery(query, paramArray, function(error, rows){
       logger.debug('queryUser');
        return callback(error, rows);
    });

}