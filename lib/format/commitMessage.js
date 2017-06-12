function frmtCommitMessage(message) {
  return message.replace(/\./g, '').slice(0,1).toUpperCase() + message.slice(1) + '.';
}

module.exports = frmtCommitMessage
