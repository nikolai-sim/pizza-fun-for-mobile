const lib = require('./lib')

test('the check function returns pizza when that is the answer' , () => {
  const expected = "pizza"
  const actual = lib.check('z' , ['p' , 'i' , 'z' , 'z', 'a'] , "pi__a")
  expect(actual).toBe(expected)
})