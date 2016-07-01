/**
 * Created by liling on 6/22/16.
 */
var fs = require('fs');
var restify = require('restify');
var path = require('path');
var login = require('./bl/login.js');


function createServer(){
    var server = restify.createServer({
        name:'LFS',//liling`s first one server
        version:'1.0.0'
    });

    // Clean up sloppy paths like
    server.pre(restify.pre.sanitizePath());

    // Handles annoying user agents (curl)
    server.pre(restify.pre.userAgentConnection());

    server.use(restify.throttle({
        burst: 100,
        rate: 50,
        ip: true
    }));

    restify.CORS.ALLOW_HEADERS.push('Access-Control-Allow-Origin');
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Methods","GET");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Methods","POST");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Methods","PUT");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Methods","DELETE");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Headers","x-requested-with,content-type");
    server.use(restify.CORS());

    // Use the common stuff you probably want
    //hard code the upload folder for now
    server.use(restify.bodyParser({uploadDir:__dirname+'/../uploads/'}));
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.dateParser());
    server.use(restify.authorizationParser());
    server.use(restify.queryParser());
    server.use(restify.gzipResponse());

    var STATIS_FILE_RE = /\.(css|js|jpe?g|png|gif|less|eot|svg|bmp|tiff|ttf|otf|woff|pdf|ico|json|wav|ogg|mp3?|xml)$/i;
    server.get(/\/apidocs\/?.*/, restify.serveStatic({
        directory: './public'
    }));
    // server.get('/', function (req, res, next) {
    //  sysError.resNoAuthorizedError(null, res, next);
    // });
    server.get(/.*/, restify.serveStatic({
        directory:'./src',
        default: 'index.html',
        maxAge: 0
    }));

    console.log("11111111111");

    server.post({path:'/liling/api/user/do/login', contentType:'application/json'}, login.custLogin);
    console.log("12222222221");
    
    server.on('NotFound', function (req, res, next) {
        console.log("not found error");
        res.send(404);
        next();
    });
    return (server);

}

module.exports = {
  createServer: createServer  
};

