/**
 * Created by liling on 7/3/16.
 */
var crypto = require('crypto');
var key ="wl".toString('ascii');

function getNumberRandomKey(max, min){
    var Range = max - min;
    var Rand = Math.random();
    return (min + Math.round(Rand * Range));
    
}

function getSmsRandomKey(){
    return getNumberRandomKey(9999,1000);
}

function encryptByMd5(clearText){
    //console.log("cleartext", clearText);
    var md5 = crypto.createHmac('md5',key);
    //console.log("md5", md5);
    return md5.update(clearText).digest('hex').toUpperCase();
}

module.exports = {
    getSmsRandomKey : getSmsRandomKey,
    encryptByMd5:encryptByMd5
}