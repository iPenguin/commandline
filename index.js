#!/usr/bin/env node

// Get input from the console.
// let co = require( 'co' );
// let prompt = require( 'co-prompt' );

// Colorize output
// let chalk = require( 'chalk' );
// console.log( chalk.bold.cyan( 'Text: ' ) );

let execFile = require( 'child_process' ).execFileSync;
const fs = require( 'fs' );

// Get command line options.
let program = require( 'commander' );

program
    .arguments( '<path>' )
    .option( '-p, --path <path>', 'Working path' )
    .parse( process.argv );

/**
 * Get a list of existing minified js and css files
 */
let existingFiles  = execFile( 'find', [
    program.path + 'min/',
    '-type', 'f',
    '(', '-name', '*.js',
    '-or',
    '-name', '*.css', ')',
] );

existingFiles = existingFiles.toString().split( '\n' );

let outputPath = program.path + 'min/';
let jsPath =  program.path + 'js/';
let cssPath = program.path + 'include/';
let pathMap = {};

//Minify all JavaScript files.
let files = fs.readdirSync( jsPath );

files.forEach( file => {
    let sha = execFile( 'sha1sum', [ jsPath + file ] );
    sha = sha.toString().split( ' ' )[ 0 ];

    execFile( 'packer', [
        '-i', jsPath + file,
        '-o', outputPath + sha + '.js'
    ] );

    pathMap[ '/js/' + file ] = '/min/' + sha + '.js';
} );

//Minfiy all CSS files.
files = fs.readdirSync( cssPath );

files.forEach( file => {
    let sha = execFile( 'sha1sum', [ cssPath + file ] );
    sha = sha.toString().split( ' ' )[ 0 ];

    execFile( 'cleancss', [
        '-o', outputPath + sha + '.css',
        cssPath + file,
    ] );

    pathMap [ '/css/' + file ] = '/min/' + sha + '.css';
} );

// create path map file.
fs.writeFileSync( outputPath + '/path_map.json', JSON.stringify( pathMap ) );

//
// let newCssFiles = execFile( 'cleancss', [
//     program.path + 'include/',
//
// ] );


//let output = execFile( 'generate_cached_files' );
