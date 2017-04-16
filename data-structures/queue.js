// https://en.wikipedia.org/wiki/Queue_(abstract_data_type)

function Queue() {
  this.front = 0
  this.rear = 0
  this.items = {}
}

Queue.prototype.size = function() {
  return this.rear - this.front
}

Queue.prototype.enqueue = function(value) {
  this.items[this.rear++] = value
}

Queue.prototype.dequeue = function() {
  if (this.rear === this.front) return undefined
  let front = this.items[this.front]
  delete this.items[this.front++]

  return front
}

module.exports = Queue

const test = require('tape')

test('Queue enqueue', assert => {
  let q = new Queue()
  assert.deepEqual(q.dequeue(), undefined)
  q.enqueue(1)
  q.enqueue(3)
  assert.deepEqual(q.size(), 2)
  assert.deepEqual(q.dequeue(), 1)
  assert.deepEqual(q.size(), 1)
  q.enqueue(4)
  q.enqueue(5)
  assert.deepEqual(q.size(), 3)
  assert.deepEqual(q.dequeue(), 3)
  assert.deepEqual(q.size(), 2)
  assert.deepEqual(q.dequeue(), 4)
  assert.deepEqual(q.dequeue(), 5)
  assert.deepEqual(q.dequeue(), undefined)
  q.enqueue(1)
  q.enqueue(2)
  assert.deepEqual(q.dequeue(), 1)
  assert.end()
})
