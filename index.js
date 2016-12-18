var express = require("express");
var uaParser = require('ua-parser-js');

var app = express();
var port = process.env.PORT || 8080;

app.get('/', function (req, res) {
    var userAgent = uaParser(req.headers['user-agent']);

    var language = req.get('accept-language').split(',')[0];
    var ipaddress = getIP(req);
    var os = userAgent.os.name + ' ' + userAgent.os.version;
    var browser = userAgent.browser.name + ' ' + userAgent.browser.major;

    res.json({
        ipaddress, language, os, browser
    });
});

app.listen(port, function() {
    console.log('Listening on port ' + port + '!');
});

function getIP(req) {
    var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
    return ip;
}
