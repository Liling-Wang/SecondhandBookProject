/**
 * Created by liling on 8/6/16.
 */

var message = require('../dao/MessageDAO.js');
var Seq = require('seq');

function sendMessage(req, res, next) {

    var params = req.params;
   // var id;

    Seq().seq(function () {
        var that = this;
        message.newMessage(params, function(error, result){

            if(error){
                console.log('new message error');
            }else{
               // console.log("row:", result);
                if(result && result.affectedRows > 0){
                    console.log('successful add new message');
                    params.insertId = result.insertId;
                   // console.log("params.insertId", params.insertId);
                }else{
                    console.log('query new message error');

                }
                that();
            }

        })
    }).seq(function(){
        var that = this;
       // params.insertId = id;
        //console.log("111111111111");

        message.queryMessage(params, function(error,rows){

            if(error){
                console.log("query message error");
            }else{
                console.log("rows3333333.", rows);
                if(rows && rows.length > 0){
                    //console.log("rows...", rows);
                    //console.log("rows...", rows[0].title);
                    res.send(200,{success:true, rows: rows});
                }else{
                    that();
                    return next;
                }

            }

        })
    })

}

module.exports ={
    sendMessage:sendMessage
}