#!/usr/bin/env node
const { exec } = require('child_process');

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
const {log, error} = console;

const {frmtBranchName} = require('./lib/format');

function frmtMessage(message) {
  return message.replace(/\./g, '').slice(0,1).toUpperCase() + message.slice(1) + '.';
}

if (argv.help) log(
`
Options:
  -h, --help              usage information
  -rn, -rm ,--rename + -m how to rename
  -b, --branch            add branch name
`
);

if (argv.delete) {
  !argv.x && exec(`git push origin :${argv.delete} && git branch -D ${argv.delete} && echo bob && echo test`,
    (er, so, se) => {
      if (er) {
        console.error(`exec error: ${er}`);
        return;
      }
      log(`stdout: ${so}`)
      log(`stderr: ${se}`);
    }
  );
}

if (argv.help) console.log('--rename + -m or -rn or -rm');

if(argv.rename) {
  if (argv.message) {
    const message = frmtMessage(argv.message);
    const branchName = argv.b ? arg.b : frmtBranchName(message);
    argv.x && console.log(`git branch -m ${branchName}  && git commit --amend -m\'${message}\' && git push --set-upstream origin ${branchName}`)
    !argv.x && exec(`git symbolic-ref --short HEAD`, (er, current_branch, se) => {
      log('current_branch', current_branch);
      if (er) {
        console.error(`exec error: ${er}`);
        return;
      }

      !argv.x && exec(`git push origin :${current_branch}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        log(`stdout: ${stdout}`);
        log(`stderr: ${stderr}`);

        exec(`git branch -m ${branchName}  && git commit --amend -m\'${message}\' && git push --set-upstream origin ${branchName}`, (err, stdo, stde) => {
          if (err) {
            console.error(`exec error: ${err}`);
            return;
          }
          log(`stdout: ${stdo}`);
          log(`stderr: ${stde}`);
        })
      });
      log(`stderr: ${se}`);
    })
  }
}
