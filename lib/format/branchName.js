function frmtBranchName(message) {
  let counter = 0
  function sort(ele){
    switch(ele) {
      case ' ': return '-';
      case '.': return '';
    }
  }
  return message.replace(/\s/, '/').replace(/[\s.]/g, sort).toLowerCase();
}

module.exports = frmtBranchName;
