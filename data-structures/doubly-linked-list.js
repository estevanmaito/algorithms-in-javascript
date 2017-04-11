// https://en.wikipedia.org/wiki/Doubly_linked_list

function Node(data) {
  this.data = data
  this.next = null
  this.prev = null
}

function DoublyLinkedList() {
  this.length = 0
  this.head = null
  this.tail = null
}

DoublyLinkedList.prototype.add = function(value) {
  let node = new Node(value)
  
  node.next = this.head
  if (this.head) {
    this.head.prev = node
  } else {
    this.tail = node
  }
  this.length++
  this.head = node
  node.prev = null
}

DoublyLinkedList.prototype.remove = function(position) {
  let toRemove = this.findAt(position)

  if (!toRemove) return null

  if (toRemove === this.head) {
    this.head = toRemove.next
    if (!this.head) {
      this.tail = null
    } else {
      this.head.prev = null
    }
  } else if (toRemove === this.tail) {
    toRemove.prev.next = null
    this.tail = toRemove.prev
  } else {
    toRemove.prev.next = toRemove.next
    toRemove.next.prev = toRemove.prev
  }

  this.length--
  return toRemove
}

DoublyLinkedList.prototype.findAt = function(position) {
  if (position > -1 && position < this.length) {
    let current = this.head

    for (let i = 0; i++ < position; current = current.next);

    return current
  }
  return null
}

const test = require('tape')

test('Doubly linked list add', assert => {
  let dl = new DoublyLinkedList()
  dl.add('Hello world!')
  assert.deepEqual(dl.head.data, 'Hello world!')
  assert.deepEqual(dl.length, 1)

  dl.add('Can you see me?')
  assert.deepEqual(dl.length, 2)
  assert.deepEqual(dl.tail.data, 'Hello world!')
  assert.end()
})

test('Doubly linked list findAt', assert => {
  let dl = new DoublyLinkedList()
  dl.add('Hello world!')
  dl.add('Can you see me?')
  dl.add('Now you don\'t')
  assert.deepEqual(dl.findAt(0).data, 'Now you don\'t')
  assert.deepEqual(dl.findAt(2).data, 'Hello world!')
  assert.deepEqual(dl.findAt(3), null)
  assert.end()
})

test('Doubly linked list remove', assert => {
  let dl = new DoublyLinkedList(),
      removed
  dl.add('Hello world!')
  dl.add('Can you see me?')
  dl.add('Now you don\'t')
  removed = dl.remove(2)
  assert.deepEqual(dl.tail.data, 'Can you see me?')
  assert.deepEqual(removed.data, 'Hello world!')
  assert.deepEqual(2, dl.length)
  dl.remove(1)
  assert.deepEqual(1, dl.length)
  removed = dl.remove(0)
  assert.deepEqual(removed.data, 'Now you don\'t')
  assert.end()
})
