function frmtCommitMessage(message) {
  function sort(ele){
    switch(ele) {
      case '/': return ' ';
      case '.': return '';
      case '-': return ' ';
    }
  }
  message = message.replace(/[\.\-\/]/g, sort)
  return message.slice(0,1).toUpperCase() + message.slice(1) + '.';
}

module.exports = frmtCommitMessage
