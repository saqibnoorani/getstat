#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const program = require('commander');
const moment = require('moment');
const api = require('./package-details');
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

function details(data: any) {
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
          chalk.blue.bold(data?.downloads) +
          '\n Start Date : \t' +
          chalk.blue.bold(moment(data?.start).format("DD-MM-YY")) +
          '\n End Date : \t' +
          chalk.blue.bold(moment(data?.end).format("DD-MM-YY"))
        )))
    )
  }

}

function fullStats(data: any) {
  api.getQuickDetails(program.args[0], endDate, currentDate, details);
  if (data.message == 'Module not found') {
    const error = chalk.bold.red;
    console.log(
      error(program.args[0] +
        ' Package Not Found')
    )
  } else {
    const description = data?.collected?.metadata?.description;
    const homePage = data?.collected?.github?.homepage;
    const name = data?.collected?.metadata?.name;
    const version = data?.collected?.metadata?.version;
    const url = data?.collected?.metadata?.repository?.url;
    const starsCount = data?.collected?.github?.starsCount;
    const forksCount = data?.collected?.github?.forksCount;
    const subscriberCount = data?.collected?.github?.subscribersCount;
    const openCount = data?.collected?.github?.issues?.openCount;
    const userName = data?.collected?.metadata?.publisher?.username;
    const eMail = data?.collected?.metadata?.publisher?.email;
    console.log(chalk.white.bgRed.bold(description ? description : ''))
    console.log(
      chalk.red('\n Name : \t' +
        chalk.blue.bold(name ? name : 'Not Available') +
        '\n version : \t' +
        chalk.blue.bold(version ? version : 'Not Available') +
        '\n Publisher : \t' +
        chalk.blue.bold(userName ? userName : '' + ' ' + eMail ? eMail : '') +
        '\n Repository : \t' +
        chalk.blue.bold(url ? url.split("+").pop() : 'Not Available')
      ))
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
        chalk.blue.bold(openCount ? openCount : 'Not Available')
      )))

  }
}

program
  .version('1.2.0')
  .description("Get Stats Of NPM Packages")
  .option('-d, --details', 'Get Full Details')

  .parse(process.argv);

if (!program.details && program.args.length > 0) {

  api.getQuickDetails(program.args[0], endDate, currentDate, details);
}

if (program.details && program.args.length > 0) {
  api.getFullDetails(program.args[0], fullStats)

}
if (program.details && program.args.length <= 0) {
  program.outputHelp();
}

if (!process.argv.slice(2).length) {
  program.outputHelp();
}