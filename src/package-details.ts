var https = require('https');
var npmjsURL = "api.npmjs.org";
var npmsURL = "api.npms.io";


function getQuickDetails(name: string, endDate: string, currentDate: string, callback: (arg0: any) => void) {
    var path = '/downloads/point/' + endDate + ':' + currentDate + '/' + name;
    return https.get({
        host: npmjsURL,
        path: path
    }, function (response: any) { 
        var body = '';
        response.on('data', (value: any) => {
            body += value;
        });
        response.on('end', () => {
            callback(JSON.parse(body));
        });
    });
}
function getFullDetails(name: string, callback: (arg0: any) => void) {
    var path = '/v2/package/' + name;
    return https.get({
        host: npmsURL,
        path: path
    }, (response: any) => {
        var body = '';
        response.on('data', (value: any) => {
            body += value;
        });
        response.on('end', () => {
            callback(JSON.parse(body));
        });
    });
}
exports.getFullDetails = getFullDetails;
exports.getQuickDetails = getQuickDetails;