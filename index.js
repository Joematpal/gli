#!/usr/bin/env node
const { exec:cmd } = require('child_process');

const argv = require('minimist')(process.argv.slice(2), {
    alias: {
      a: 'add',
      b: 'branch',
      d: 'delete',
      e: 'noedit',
      h: 'help',
      m: 'message',
      n: 'message',
      r: 'rename',
      x: 'dry-run',
    }
});

const { frmtBranchName, frmtCommitMessage } = require('./lib/format');
const { exec:
  { execCmd:
    exec,
    execCb,
    nextExec,
  },
  strCmds,
} = require('./lib/bash');


if (argv.check){
  if (argv.check === true){
    argv.check = '';
  }
  const { checkBranch } = strCmds(argv)
  argv.x && console.log(checkBranch)
  !argv.x && exec(checkBranch)
}

if (argv.delete) {

  const { checkBranch, deleteRemoteBranch, deleteLocalBranch } = strCmds(argv);

  argv.x && console.log(checkBranch, deleteLocalBranch, deleteRemoteBranch);

  !argv.x && exec(checkBranch, {
    thn: deleteLocalBranch,
    suc: deleteRemoteBranch,
  });
}

if (argv.add && argv.noedit && argv.commit)

if(argv.rename && argv.message) {

  argv.message = frmtCommitMessage(argv.message);
  argv.branchName = argv.b ? argv.b : frmtBranchName(argv.message);
  const { current_branch, deleteBranch, renameCommitPush, checkBranch, deleteRemoteBranch, renameBranch } = strCmds(argv);

  argv.x && console.log(deleteBranch(), renameCommitPush);

  !argv.x && exec(checkBranch, {
    suc: deleteRemoteBranch,
    thn: renameCommitPush,
  });
}
