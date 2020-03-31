#!/usr/bin/env node
"use strict";
var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');
var path = require('path');
var program = require('commander');
var api = require('./api');
var Table = require('cli-table');
var table = new Table({
    colWidths: [25, 25],
    chars: {
        'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗',
        'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝',
        'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼',
        'right': '║', 'right-mid': '╢', 'middle': '│',
    },
});
clear();
console.log(chalk.blue(figlet.textSync('Covid19', {
    font: 'Ghost',
    horizontalLayout: 'full',
    verticalLayout: 'default'
})));
function getCovidDetails(response) {
    var data = [];
    if (response == 'Country not found') {
        console.log('No matched data found');
    }
    else {
        for (var key in response) {
            if (response.hasOwnProperty(key)) {
                data.push([chalk.cyan.bold(key), chalk.green.bold(response[key])]);
            }
        }
        table.push.apply(table, data);
        console.log(table.toString());
    }
}
program
    .version('1.0.0')
    .description("Track corona virus in your terminal")
    .option('-a, --all', 'Get Summary details')
    .parse(process.argv);
if (!program.all && program.args.length > 0) {
    api.getCountryWiseData(program.args[0], getCovidDetails);
}
if (program.all) {
    api.getLatestData(getCovidDetails);
}
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
