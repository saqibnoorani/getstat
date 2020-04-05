#!/usr/bin/env node
"use strict";
var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');
var program = require('commander');
var moment = require('moment');
var api = require('./package-details');
var currentDate = moment().format("YYYY-MM-DD");
var endDate = moment().subtract(1, "year").format("YYYY-MM-DD");
clear();
console.log(chalk.blue(figlet.textSync('Get Stat', {
    font: 'Ghost',
    horizontalLayout: 'full',
    verticalLayout: 'default'
})));
function details(data) {
    if (undefined == data.package) {
        var error = chalk.bold.red;
        console.log(error(program.args[0] +
            ' Package Not Found'));
    }
    else {
        console.log(chalk.red(chalk.green("NPM" +
            chalk.red('\n Downloads : \t' +
                chalk.blue.bold(data === null || data === void 0 ? void 0 : data.downloads) +
                '\n Start Date : \t' +
                chalk.blue.bold(moment(data === null || data === void 0 ? void 0 : data.start).format("DD-MM-YY")) +
                '\n End Date : \t' +
                chalk.blue.bold(moment(data === null || data === void 0 ? void 0 : data.end).format("DD-MM-YY"))))));
    }
}
function fullStats(data) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
    api.getQuickDetails(program.args[0], endDate, currentDate, details);
    if (data.message == 'Module not found') {
        var error = chalk.bold.red;
        console.log(error(program.args[0] +
            ' Package Not Found'));
    }
    else {
        var description = (_b = (_a = data === null || data === void 0 ? void 0 : data.collected) === null || _a === void 0 ? void 0 : _a.metadata) === null || _b === void 0 ? void 0 : _b.description;
        var homePage = (_d = (_c = data === null || data === void 0 ? void 0 : data.collected) === null || _c === void 0 ? void 0 : _c.github) === null || _d === void 0 ? void 0 : _d.homepage;
        var name_1 = (_f = (_e = data === null || data === void 0 ? void 0 : data.collected) === null || _e === void 0 ? void 0 : _e.metadata) === null || _f === void 0 ? void 0 : _f.name;
        var version = (_h = (_g = data === null || data === void 0 ? void 0 : data.collected) === null || _g === void 0 ? void 0 : _g.metadata) === null || _h === void 0 ? void 0 : _h.version;
        var url = (_l = (_k = (_j = data === null || data === void 0 ? void 0 : data.collected) === null || _j === void 0 ? void 0 : _j.metadata) === null || _k === void 0 ? void 0 : _k.repository) === null || _l === void 0 ? void 0 : _l.url;
        var starsCount = (_o = (_m = data === null || data === void 0 ? void 0 : data.collected) === null || _m === void 0 ? void 0 : _m.github) === null || _o === void 0 ? void 0 : _o.starsCount;
        var forksCount = (_q = (_p = data === null || data === void 0 ? void 0 : data.collected) === null || _p === void 0 ? void 0 : _p.github) === null || _q === void 0 ? void 0 : _q.forksCount;
        var subscriberCount = (_s = (_r = data === null || data === void 0 ? void 0 : data.collected) === null || _r === void 0 ? void 0 : _r.github) === null || _s === void 0 ? void 0 : _s.subscribersCount;
        var openCount = (_v = (_u = (_t = data === null || data === void 0 ? void 0 : data.collected) === null || _t === void 0 ? void 0 : _t.github) === null || _u === void 0 ? void 0 : _u.issues) === null || _v === void 0 ? void 0 : _v.openCount;
        var userName = (_y = (_x = (_w = data === null || data === void 0 ? void 0 : data.collected) === null || _w === void 0 ? void 0 : _w.metadata) === null || _x === void 0 ? void 0 : _x.publisher) === null || _y === void 0 ? void 0 : _y.username;
        var eMail = (_1 = (_0 = (_z = data === null || data === void 0 ? void 0 : data.collected) === null || _z === void 0 ? void 0 : _z.metadata) === null || _0 === void 0 ? void 0 : _0.publisher) === null || _1 === void 0 ? void 0 : _1.email;
        console.log(chalk.white.bgRed.bold(description ? description : ''));
        console.log(chalk.red('\n Name : \t' +
            chalk.blue.bold(name_1 ? name_1 : 'Not Available') +
            '\n version : \t' +
            chalk.blue.bold(version ? version : 'Not Available') +
            '\n Publisher : \t' +
            chalk.blue.bold(userName ? userName : '' + ' ' + eMail ? eMail : '') +
            '\n Repository : \t' +
            chalk.blue.bold(url ? url.split("+").pop() : 'Not Available')));
        console.log(chalk.green("GitHub" +
            chalk.red('\n Home Page : \t' +
                chalk.blue.bold(homePage ? homePage : 'Not Available') +
                '\n stars : \t' +
                chalk.blue.bold(starsCount ? starsCount : 'Not Available') +
                '\n Forks : \t' +
                chalk.blue.bold(forksCount ? forksCount : 'Not Available') +
                '\n Subscriber : \t' +
                chalk.blue.bold(subscriberCount ? subscriberCount : 'Not Available') +
                '\n Open Issues : \t' +
                chalk.blue.bold(openCount ? openCount : 'Not Available'))));
    }
}
program
    .version('1.2.4')
    .description("Get Stats Of NPM Packages")
    .option('-d, --details', 'Get Full Details')
    .parse(process.argv);
if (!program.details && program.args.length > 0) {
    api.getQuickDetails(program.args[0], endDate, currentDate, details);
}
if (program.details && program.args.length > 0) {
    api.getFullDetails(program.args[0], fullStats);
}
if (program.details && program.args.length <= 0) {
    program.outputHelp();
}
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
