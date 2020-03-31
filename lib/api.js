"use strict";
var https = require('https');
var url = "coronavirus-19-api.herokuapp.com";
function getLatestData(callback) {
    return https.get({
        host: url,
        path: '/all'
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
function getCountryWiseData(param, callback) {
    return https.get({
        host: url,
        path: "/countries/" + param
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
exports.getLatestData = getLatestData;
exports.getCountryWiseData = getCountryWiseData;
