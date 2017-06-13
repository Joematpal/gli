#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2), {
    alias: {
       m: 'message',
       n: 'message',
       x: 'dry-run',
       b: 'branch',
       h: 'help',
       r: 'rename',
       d: 'delete'
    }
});

const { frmtBranchName, frmtCommitMessage } = require('./lib/format');
const { exec:{execCmd:exec, execCb}, strCmds } = require('./lib/bash');

if (argv.delete) {
  argv.x && console.log(deleteBranch(argv.delete))
  !argv.x && exec(deleteBranch(argv.delete));
}

if(argv.rename) {
  if (argv.message) {

    argv.message = frmtCommitMessage(argv.message);
    argv.branchName = argv.b ? argv.b : frmtBranchName(argv.message);
    const { current_branch, deleteBranch, renameCommitPush } = strCmds(argv);

    argv.x && console.log(deleteBranch(), renameCommitPush);
    !argv.x && exec(deleteBranch(), exec.bind(null, renameCommitPush))
  }
}
