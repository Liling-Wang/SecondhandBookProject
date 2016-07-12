/**
 * Created by liling on 7/3/16.
 */
var crypto = require('crypto');

function getNumberRandomKey(max, min){
    var Range = max - min;
    var Rand = Math.random();
    return (min + Math.round(Rand * Range));
    
}

function getSmsRandomKey(){
    return getNumberRandomKey(9999,1000);
}

function encryptByMd5(clearText){
    var md5 = crypto.createHmac('md5',md5Key);
    return md5.update(clearText).digest('hex').toUpperCase();
}

module.exports = {
    getSmsRandomKey : getSmsRandomKey,
    encryptByMd5:encryptByMd5
}