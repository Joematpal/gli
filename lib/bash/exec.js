const strCmds = require('./strCmds');
const { exec } = require('child_process');

function execCb(bindfn, error, stdout, stderr){
  if (error) throw error;
  if (bindfn) bindfn;
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
}
function execCmd(str, cb) {
  return exec(str, execCb.bind(cb));
}

module.exports = {execCmd, execCb};
