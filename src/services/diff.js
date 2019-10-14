import DiffLib from './diff-match-patch'
let diff = new DiffLib()
function diffAnswer (correctAnswer, userAnser) {
  let diffMain = diff.diff_main(userAnser, correctAnswer)
  diff.diff_cleanupSemantic(diffMain)
  return diffMain
}

function prettyHtmlDiff (diffObject) {
  return diff.diff_prettyHtml(diffObject)
}

export {
  diffAnswer,
  prettyHtmlDiff
}
