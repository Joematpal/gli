const strCmds = require('./strCmds');
const { exec } = require('child_process');

function execCb(boundfn, error, stdout, stdres){
  if (error) throw error;
  if (typeof boundfn === "object") {
    if (typeof boundfn.suc === "string") {
      boundfn.suc = nextExec(boundfn.suc)
    }
    if (typeof boundfn.thn === "string") {
      boundfn.thn = nextExec(boundfn.thn)
    }
  }
  if (typeof boundfn === "function") boundfn = boundfn.suc = boundfn;

  if (stdout) {
    console.log(`stdout: ${stdout}`);
    if (boundfn.suc) boundfn.suc();
    // This is going to break.
    if (boundfn.thn) boundfn.thn();
    // ^^^^^^^^^^^^^^^^^^^^^^^
  }
  if (!stdout && boundfn.thn) boundfn.thn();

  if (stdres) {
    console.log(`stdres: ${stdres}`);
  }
}
function execCmd(str, cb = x => "Empty Function") {
  return exec(str, execCb.bind(null, cb));
}

function nextExec(x) {
  return execCmd.bind(null, x)
}

module.exports = { execCmd, execCb, nextExec };
