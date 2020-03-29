#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const program = require('commander');

clear();
console.log(
  chalk.red(
    figlet.textSync('Get Stat', { horizontalLayout: 'full' })
  )
);

function details(data: any) {

  console.log(data);
}

program
  .version('0.0.1')
  .description("Get Stats Of NPM Packages")
  .option('-s, --stats', 'Get Quick Stats')
  .parse(process.argv);
if (!process.argv.slice(2).length) {

  program.outputHelp();
}
