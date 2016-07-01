/**
 * Created by liling on 6/22/16.
 */
var getopt = require('posix-getopt');
var restify = require('restify');
var loginServer = require('./server.js');

var logger = serverLogger.createLogger('main.js');


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

function usage(msg) {
    if (msg)
        console.error(msg);

    var str = 'usage: ' +
        NAME +
        '[-p port] [-h]';
    console.error(str);
    process.exit(msg ? 1 : 0);
}

(function main() {
    var options = parseOptions();
    var server = loginServer.createServer();

    // At last, let's rock and roll
    server.listen((options.port || 8090), function onListening() {
        logger.info('listening at %s', server.url);
    });
})();