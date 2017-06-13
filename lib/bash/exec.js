const strCmds = require('./strCmds');
const { exec } = require('child_process');

function execCb(boundfn, error, stdout, stderr){
  if (error) console.log(error);
  if (boundfn) boundfn();
  
  console.log(`stdout: ${stdout}`);
  if (stderr) console.log(`stderr: ${stderr}`);
}
function execCmd(str, cb) {
  return exec(str, execCb.bind(null, cb));
}

module.exports = {execCmd, execCb};
