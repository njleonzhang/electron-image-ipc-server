#!/usr/bin/env node

var electron = require('electron')

var { spawn } = require('child_process')
var path = require('path')

// The code you place here will be executed every time your command is executed
let scriptPath = path.join(__dirname, './clipboard.js');
let electronPath = path.join(__dirname, './node_modules/electron/cli.js');

var spawn_env = JSON.parse(JSON.stringify(process.env));

// start electron in non-node model, otherwise, the electron api can not be used.
delete spawn_env.ATOM_SHELL_INTERNAL_RUN_AS_NODE;
delete spawn_env.ELECTRON_RUN_AS_NODE;

electron = spawn(electronPath, [scriptPath, scriptPath], {
    env: spawn_env,
    stdio: ['pipe', 'pipe', 'pipe', 'ipc']
});
