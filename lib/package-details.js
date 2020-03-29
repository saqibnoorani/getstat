var https = require('https');
var npmjsURL = "api.npmjs.org";



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
            var parse = JSON.parse(body);
            callback(parse);
        });
    });
}