#!/usr/bin/env node

"use strict";
var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');
var path = require('path');
var program = require('commander');
var moment = require('moment')
var api = require('./package-details.js');
var currentDate = moment().format("YYYY-MM-DD");
var endDate = moment().subtract(1, "year").format("YYYY-MM-DD");
clear();
console.log(
    chalk.red(
        figlet.textSync('Get Stat', {
            horizontalLayout: 'full'
        })
    )
);

function details(data) {
    if (undefined == data.package) {
        const error = chalk.bold.red;
        console.log(
            error(program.args[0] +
                ' Could not be found. Try a Different Package Name')
        )
    } else {
        console.log(
            chalk.red('\n Package : \t' +
                chalk.blue.underline.bold(data.package) +
                '\n Downloads : \t' +
                chalk.blue.underline.bold(data.downloads) +
                '\n Start Date : \t' +
                chalk.blue.underline.bold(moment(data.start).format("DD-MM-YY")) +
                '\n End Date : \t' +
                chalk.blue.underline.bold(moment(data.end).format("DD-MM-YY"))
            )
        )
    }

}

program
    .version('0.0.1')
    .description("Get Stats Of NPM Packages")
    .option('-p, --package <type>', 'Package Name')
    .parse(process.argv);

if (!program.package && program.args[0]) {

    api.getQuickDetails(program.args[0], endDate, currentDate, details);
}

if (program.package) {
    api.getQuickDetails(program.package, endDate, currentDate, details);

}

if (!process.argv.slice(2).length) {
    program.outputHelp();
}