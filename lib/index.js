#!/usr/bin/env node

"use strict";
var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');
var path = require('path');
var program = require('commander');
var moment = require('moment');
var api = require('./package-details.js');
var currentDate = moment().format("YYYY-MM-DD");
var endDate = moment().subtract(1, "year").format("YYYY-MM-DD");
clear();
console.log(
    chalk.blue(
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
                ' Package Not Found')
        )
    } else {
        console.log(
            chalk.red(chalk.green("NPM" +
                chalk.red('\n Downloads : \t' +
                    chalk.blue.bold(data.downloads) +
                    '\n Start Date : \t' +
                    chalk.blue.bold(moment(data.start).format("DD-MM-YY")) +
                    '\n End Date : \t' +
                    chalk.blue.bold(moment(data.end).format("DD-MM-YY"))
                )))
        )
    }

}

function fullStats(data) {
    api.getQuickDetails(program.args[0], endDate, currentDate, details);
    if (data.message == 'Module not found') {
        const error = chalk.bold.red;
        console.log(
            error(program.args[0] +
                ' Package Not Found')
        )
    } else {
        console.log(chalk.white.bgRed.bold(data.collected.metadata.description))
        console.log(
            chalk.red('\n Name : \t' +
                chalk.blue.bold(data.collected.metadata.name) +
                '\n version : \t' +
                chalk.blue.bold(data.collected.metadata.version) +
                '\n Publisher : \t' +
                chalk.blue.bold(data.collected.metadata.publisher.username + ' ' + data.collected.metadata.publisher.email) +
                '\n Repository : \t' +
                chalk.blue.bold(data.collected.metadata.repository.url.split("+").pop())
            ))
        console.log(chalk.green("GitHub" +
            chalk.red('\n Home Page : \t' +
                chalk.blue.bold(data.collected.github.homepage ? data.collected.github.homepage : 'Not Available') +
                '\n stars : \t' +
                chalk.blue.bold(data.collected.github.starsCount) +
                '\n Forks : \t' +
                chalk.blue.bold(data.collected.github.forksCount) +
                '\n Subscriber : \t' +
                chalk.blue.bold(data.collected.github.subscribersCount) +
                '\n Open Issues : \t' +
                chalk.blue.bold(data.collected.github.issues.openCount)
            )))

    }
}

program
    .version('1.0.1')
    .description("Get Stats Of NPM Packages")
    .option('-d, --details', 'Get Full Details')

    .parse(process.argv);

if (!program.details && program.args.length > 0) {

    api.getQuickDetails(program.args[0], endDate, currentDate, details);
}

if (program.details && program.args.length > 0) {
    api.getFullDetails(program.args[0], fullStats)

}
if (program.details && !program.args.length > 0) {
    program.outputHelp();
}

if (!process.argv.slice(2).length) {
    program.outputHelp();
}