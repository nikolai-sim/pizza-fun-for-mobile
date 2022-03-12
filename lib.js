export function check  (guess , arr , answer) {
  const correct = []
  const answerArr = answer.split('')
  for (let i = 0 ; i < arr.length; i++) {
    if (guess === arr[i]) {
      correct.push(i)
    }
  }
  for (let i = 0 ; i < correct.length; i ++){
    answerArr[correct[i]] = guess
  }

  return answerArr.join('')
}

function checkWin (current, next) {
  if( current === next) {
    return true
  }
  else {
    return false
  }
}

export function selectWord (arr) {
  const i = Math.floor(Math.random() * arr.length)
  return arr[i]
}