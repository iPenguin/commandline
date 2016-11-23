#!/usr/bin/env node

// Get input from the console.
// let co = require( 'co' );
// let prompt = require( 'co-prompt' );

// Colorize output
// let chalk = require( 'chalk' );
// console.log( chalk.bold.cyan( 'Text: ' ) );

let spawn = require( 'child_process' ).spawn;

// Get command line options.
let program = require( 'commander' );

program
    .arguments( '' )
    //.option( '-u, --username <username>', 'The user to authenticate as' )
    .option( '-p, --path', 'Path' )
    .action( function () {

    } )
    .parse( process.argv );
