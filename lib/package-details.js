var https = require('https');
var npmjsURL = "api.npmjs.org";
var npmsURL = "api.npms.io";


exports.getQuickDetails = function (name, endDate, currentDate, callback) {
    var path = '/downloads/point/' + endDate + ':' + currentDate + '/' + name;
    return https.get({
        host: npmjsURL,
        path: path
    }, function (response) {
        var body = '';
        response.on('data', function (value) {
            body += value;
        });
        response.on('end', function () {
            callback(JSON.parse(body));
        });
    });
}
exports.getFullDetails = function (name, callback) {
    var path = '/v2/package/' + name;
    return https.get({
        host: npmsURL,
        path: path
    }, function (response) {
        var body = '';
        response.on('data', function (value) {
            body += value;
        });
        response.on('end', function () {
            callback(JSON.parse(body));
        });
    });
}