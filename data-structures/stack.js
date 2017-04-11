 // https://en.wikipedia.org/wiki/Stack_(abstract_data_type)

function Stack() {
  this.length = 0
  this.items = {}
}

Stack.prototype.push = function(value) {
  this.items[this.length++] = value
}

Stack.prototype.pop = function() {
  if (this.length === 0) return undefined
  let top = this.items[--this.length]
  delete this.items[this.length]
  return top
}

const test = require('tape')

test('Stack add', assert => {
  let s = new Stack()
  s.push(1)
  s.push(3)
  assert.deepEqual(s.length, 2)
  assert.deepEqual(s.pop(), 3)
  assert.deepEqual(s.length, 1)
  assert.deepEqual(s.pop(), 1)
  assert.deepEqual(s.pop(), undefined)
  s.push(2)
  assert.deepEqual(s.length, 1)
  assert.end()
})
