var https = require('https');
var url = "coronavirus-19-api.herokuapp.com";

function getLatestData(callback: (arg0: any) => void) {
    return https.get({
        host: url,
        path: '/all'
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

function getCountryWiseData(param: string,callback: (arg0: any) => void) {
    return https.get({
        host: url,
        path: "/countries/"+ param
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

exports.getLatestData = getLatestData;
exports.getCountryWiseData = getCountryWiseData;
