/**
 * Created by liling on 6/23/16.
 */
var restify = require('restify');
var getopt = require('posix-getopt');
var loginServer = require('./server.js');

//function respond(req, res, next){
   // res.send('hello ' + req.params.name);
//}

var server = restify.createServer();
//server.get('/hello/:name', respond);
//server.head('/hello/:name', respond);

server.get(/.*/, restify.serveStatic({
    directory:'./src',
    default: 'index.html',
    maxAge: 0
}));

var server = loginServer.createServer();

server.listen(8099, function() {
    console.log('%s listening at %s', server.name, server.url);
});

/*
function parseOptions() {
    var option;
    var opts = {}
    var parser = new getopt.BasicParser(':h:p:(port)', process.argv);

    while ((option = parser.getopt()) !== undefined) {
        switch (option.option) {
            case 'p':
                opts.port = parseInt(option.optarg, 10);
                break;
            case 'h':
                usage();
                break;

            default:
                usage('invalid option: ' + option.option);
                break;
        }
    }

    return (opts);
}

(function(){
    var opt = parseOptions();
    console.log("opt",opt);

    server.listen((opt.port?opt.port:3800), function(){
       // directory:'./src/public/web',
        
        console.log('%s listening at %s', server.name, server.url);
    })
})();
*/