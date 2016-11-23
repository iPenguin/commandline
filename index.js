#!/usr/bin/env node

let co = require('co');
let prompt = require('co-prompt');
let program = require('commander');

program
    .arguments('<file>')
    .option('-u, --username <username>', 'The user to authenticate as')
    .option('-p, --password <password>', 'The user\'s password')
    .action(function(file) {
        co(function *() {
            let username = yield prompt('username: ');
            let password = yield prompt.password('password: ');
            console.log('user: %s pass: %s file: %s', username, password, file);
        });
    })
    .parse(process.argv);
