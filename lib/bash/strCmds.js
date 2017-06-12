function deleteBranch() {
  if (arguments > 0) {
    console.log('test')
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
  current_branch: 'git rev-parse --abbrev-ref HEAD',
  pushBranch: `git push --set-upstream origin ${argv.branchName}`,
  renameBranch: `git branch -m ${argv.branchName}`,
  commitBranch: `git branch -m ${argv.branchName}`,
  renameCommitPush: `${renameBranch} && ${commitBranch} && ${pushBranch}`,
}};

module.exports = exports;
