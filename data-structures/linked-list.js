// https://en.wikipedia.org/wiki/Linked_list

function Node(data) {
  this.data = data
  this.next = null
}

function LinkedList() {
  this.length = 0
  this.head = null
}

LinkedList.prototype.add = function (value) {
  let node = new Node(value)
  current = this.head

  if (!current) {
    this.head = node
  } else {
    while (current.next) current = current.next
    current.next = node
  }
  this.length++

  return node
}

LinkedList.prototype.findAt = function (position) {
  if (position > -1 && position < this.length) {
    let current = this.head

    for (let i = 0; i++ < position; current = current.next);

    return current.data
  }
  return null
}

LinkedList.prototype.remove = function (position) {
  if (position > -1 && position < this.length) {
    let current = this.head

    if (position === 0) {
      current = current.next
    } else {
      let i = 0
      let previous
      while (i++ < position) {
        previous = current
        current = current.next
      }
      previous.next = current.next
    }
    this.length--
    return current.data
  }
  return null
}

const test = require('tape')

test('Linked list add', assert => {
  let ll = new LinkedList()
  ll.add('Hello world!')
  assert.deepEqual(ll.head.data, 'Hello world!')
  assert.deepEqual(ll.length, 1)

  ll.add('Can you see me?')
  assert.deepEqual(ll.length, 2)
  assert.end()
})

test('Linked list findAt', assert => {
  let ll = new LinkedList()
  ll.add('Hello world!')
  ll.add('Can you see me?')
  ll.add('Now you don\'t')
  assert.deepEqual(ll.findAt(2), 'Now you don\'t')
  assert.deepEqual(ll.findAt(0), 'Hello world!')
  assert.deepEqual(ll.findAt(3), null)
  assert.end()
})

test('Linked list remove', assert => {
  let ll = new LinkedList()
  ll.add('Hello world!')
  ll.add('Can you see me?')
  ll.add('Now you don\'t')
  ll.remove(2)
  assert.deepEqual(2, ll.length)
  ll.remove(1)
  assert.deepEqual(1, ll.length)
  assert.end()
})