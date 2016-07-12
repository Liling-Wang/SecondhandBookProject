/**
 * Created by liling on 7/3/16.
 */
var fs = require('fs');

function getCodeTemplate(newPassword,email, callback){

    var emailContent="";
    fs.readFile('./util/emailTemplate/getCode.html','utf8', function(err,data){
        if(err){
            console.log('getcodetemplate function error');
            throw err;
        }else{
            console.log("at getcodeTemplate");
            emailContent = data;
            emailContent = emailContent.toString().replace("$randomPassword$", newPassword);
           // console.log("emailContent",emailContent);
        }
        callback(err, emailContent);
    });
}

module.exports = {
    getCodeTemplate: getCodeTemplate
}