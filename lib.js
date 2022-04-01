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

export function updateStats (currentStats, result) {
  let newStats = {}
  if (result === 'win') {
    newStats.wins = currentStats.wins + 1
    newStats.losses = currentStats.losses
    newStats.currentStreak = currentStats.currentStreak + 1
    if (newStats.currentStreak > currentStats.bestStreak) {
      newStats.bestStreak = newStats.currentStreak
    }
    else {
      newStats.bestStreak = currentStats.bestStreak
    }
  }
  else if (result === 'lose') {
    newStats.wins = currentStats.wins
    newStats.losses = currentStats.losses + 1
    newStats.currentStreak = 0
    newStats.bestStreak = currentStats.bestStreak
  }
  return newStats
}

export function endStatements (count) {
  switch (count) {
    case 7 : 
      return 'Perfect!' 
    case 6 : 
      return 'Amazing!'
    case 5 : 
      return 'Great!'
    case 4 :
      return 'Nice!'
    case 3 : 
      return 'You got it!'
    case 2 :
      return 'Phew!'
    case 1: 
      return 'Close one...'
    case 0: 
      return 'Better luck next time...'
  }
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