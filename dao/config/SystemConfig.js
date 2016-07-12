/**
 * Created by liling on 6/29/16.
 */

var mysqlConnectOptions ={
    user:'root',
    password:'',
    database:'lilingFirstProject',
    host:'127.0.0.1',
    charset:'utf8mb4'

};

function getMysqlConnectOptions(){
    console.log("get mysql connect options in systemconfig");
    return mysqlConnectOptions;
}

module.exports = {
    getMysqlConnectOptions: getMysqlConnectOptions
}