function deleteBranch() {

  if (arguments.length < 1) {
    return `git push origin :$(git rev-parse --abbrev-ref HEAD)`
  }
  var [branch]= arguments;
  return `git push origin :${branch} && git branch -D ${branch}`
}

function exports (argv) {
  const pushBranch = `git push --set-upstream origin ${argv.branchName}`
  const commitBranch = `git commit --amend -m\'${argv.message}\'`
  const renameBranch = `git branch -m ${argv.branchName}`;

  return {
  deleteBranch,
  deleteRemoteBranch: `git push origin :${argv.check || argv.delete}`,
  deleteLocalBranch: `git branch -D ${argv.check || argv.delete}`,
  deleteCurrentRemoteBranch: `git push origin :$(git rev-parse --abbrev-ref HEAD)`,
  current_branch: 'git rev-parse --abbrev-ref HEAD',
  pushBranch: `git push --set-upstream origin ${argv.branchName}`,
  renameBranch: `git branch -m ${argv.branchName}`,
  commitBranch: `git branch -m ${argv.branchName}`,
  renameCommitPush: `${renameBranch} && ${commitBranch} && ${pushBranch}`,
  checkBranch: `git ls-remote --heads $(git config --get remote.origin.url) ${argv.check || argv.delete}`
}};

module.exports = exports;
