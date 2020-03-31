#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const program = require('commander');
const api = require('./api');
const Table = require('cli-table');
var table = new Table({
  colWidths: [25, 25],
  chars: {
    'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
    , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
    , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
    , 'right': '║', 'right-mid': '╢', 'middle': '│',
  },
});
clear();
console.log(
  chalk.blue(
    figlet.textSync('Covid19', {
      font: 'Ghost',
      horizontalLayout: 'full',
      verticalLayout: 'default'
    })
  )
);

function getCovidDetails(response: any) {
  var data = [];
 if(response == 'Country not found') {
   console.log('No matched data found')
 } else {
  for (let key in response) {
    if (response.hasOwnProperty(key)) {
      data.push([chalk.cyan.bold(key),chalk.green.bold(response[key])]
    );
    }
  }
  table.push(...data);
  console.log(table.toString());
}
}

program
  .version('1.0.0')
  .description("Track corona virus in your terminal")
  .option('-a, --all', 'Get Summary details')
  .parse(process.argv);
if (!program.all  && program.args.length > 0) {
  api.getCountryWiseData(program.args[0],getCovidDetails);
}

if (program.all) {
  api.getLatestData(getCovidDetails)
}

if (!process.argv.slice(2).length) {
  program.outputHelp();
}