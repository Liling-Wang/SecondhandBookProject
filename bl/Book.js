/**
 * Created by liling on 8/2/16.
 */
var bookType = require('../dao/BookTypeDAO.js');

function queryBookType(req, res, next) {
   // console.log("in query book type");
    var params = req.params;
    bookType.queryBookType(params, function (error, rows) {

        if(error){
            console.log('query bookType error');
        }else{
           // console.log("rows", rows);
          //  console.log('query bookType success');
            res.send(200,{result:rows});
            return next;
        }

    })

}

module.exports ={
    queryBookType:queryBookType
}