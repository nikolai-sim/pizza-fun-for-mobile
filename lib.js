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

export function checkWin (current, next) {
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

export const letters = [ 
  {letter: 'a'}, 
  {letter: 'b'},
  {letter: 'c'},
  {letter: 'd'},
  {letter: 'e'}, 
  {letter: 'f'}, 
  {letter: 'g'}, 
  {letter: 'h'}, 
  {letter: 'i'}, 
  {letter: 'j'}, 
  {letter: 'k'},
  {letter: 'l'}, 
  {letter: 'm'}, 
  {letter: 'n'}, 
  {letter: 'o'}, 
  {letter: 'p'}, 
  {letter: 'q'}, 
  {letter: 'r'},  
  {letter: 's'}, 
  {letter: 't'}, 
  {letter: 'u'}, 
  {letter: 'v'}, 
  {letter: 'w'}, 
  {letter: 'x'}, 
  {letter: 'y'}, 
  {letter: 'z'}
]