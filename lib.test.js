const lib = require('./lib')

test('the check function returns pizza when that is the answer' , () => {
  const expected = "pizza"
  const actual = lib.check('z' , ['p' , 'i' , 'z' , 'z', 'a'] , "pi__a")
  expect(actual).toBe(expected)
})

test('the update stats function updates the statistic correctly for a win that increses the streak' , () => {
  const currentStats = {
    wins : 10,
    losses : 3,
    currentStreak: 3,
    bestStreak: 3,
  }
  const expected = {
    wins : 11,
    losses : 3,
    currentStreak: 4,
    bestStreak: 4,
  }
  const actual = lib.updateStats(currentStats, 'win')
  expect(actual).toEqual(expected)
})

test('the update stats function updates the statistic correctly for a win that does not increse the streak' , () => {
  const currentStats = {
    wins : 10,
    losses : 3,
    currentStreak: 3,
    bestStreak: 6,
  }
  const expected = {
    wins : 11,
    losses : 3,
    currentStreak: 4,
    bestStreak: 6,
  }
  const actual = lib.updateStats(currentStats, 'win')
  expect(actual).toEqual(expected)
})

test('the update stats function updates the statistic correctly for a loss' , () => {
  const currentStats = {
    wins : 10,
    losses : 3,
    currentStreak: 3,
    bestStreak: 6,
  }
  const expected = {
    wins : 10,
    losses : 4,
    currentStreak: 0,
    bestStreak: 6,
  }
  const actual = lib.updateStats(currentStats, 'lose')
  expect(actual).toEqual(expected)
})