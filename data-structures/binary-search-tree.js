// https://en.wikipedia.org/wiki/Binary_search_tree

function Node(data) {
  this.key = data
  this.parent = null
  this.left = null
  this.right = null
}

function BST() {
  this.root = null
}

BST.prototype.insert = function(value) {
  let node = new Node(value),
      current = null,
      x = this.root

  while (x !== null) {
    current = x
    if (node.key < x.key) {
      x = x.left
    } else {
      x = x.right
    }
  }
  
  if (current === null) {
    this.root = node
  } else if (node.key < current.key) {
    current.left = node
  } else {
    current.right = node
  }
  node.parent = current
}

BST.prototype.delete = function(value) {
  let current = this.search(value)

  if (!current) {
    return null
  }

  if (!current.left) {
    this.transplant(current, current.right)
  } else if (!current.right) {
    this.transplant(current, current.left)
  } else {
    let y = this.min(current.right)

    if (y.parent !== current) {
      this.transplant(y, y.right)
      y.right = current.right
      y.right.parent = y
    }
    this.transplant(current, y)
    y.left = current.left
    y.left.parent = y
  }

  return current
}

BST.prototype.transplant = function(u, v) {
  if (!u.parent) {
    this.root = v
  } else if (u === u.parent.left) {
    u.parent.left = v
  } else {
    u.parent.right = v
  }
  if (v) {
    v.parent = u.parent
  }
}

BST.prototype.search = function(value) {
  let current = this.root
  while (current) {
    if (value === current.key) {
      return current
    } else if (value < current.key) {
      current = current.left
    } else {
      current = current.right
    }
  }

  return null
}

BST.prototype.min = function(node) {
  while (node.left) {
    node = node.left
  }

  return node
}

BST.prototype.max = function(node) {
  while (node.right) {
    node = node.right
  }

  return node
}

BST.prototype.sucessor = function(value) {
  let current = this.search(value)
  if (current.right) {
    return this.min(current.right)
  }

  while (current.parent && current === current.parent.right) {
    current = current.parent
  }

  return current.parent
}

BST.prototype.predecessor = function(value) {
  let current = this.search(value)
  if (current.left) {
    return this.max(current.left)
  }

  while (current.parent && current === current.parent.left) {
    current = current.parent
  }

  return current.parent
}

BST.prototype.length = function() {
  let count = 0
  this.inorderTreeWalk(this.root, function() {
    count++
  })

  return count
}

BST.prototype.toArray = function() {
  let result = []
  this.inorderTreeWalk(this.root, function(key) {
    result.push(key)
  })

  return result
}

BST.prototype.inorderTreeWalk = function(node, callback) {
  if (node) {
    this.inorderTreeWalk(node.left, callback)
    callback(node.key)
    this.inorderTreeWalk(node.right, callback)
  }
}

const test = require('tape')

test('BST insert', assert => {
  let bst = new BST()
  bst.insert(12)
  bst.insert(4)
  bst.insert(8)
  bst.insert(15)
  assert.deepEqual(bst.length(), 4, 'length should be 4')
  assert.end()
})

test('BST delete', assert => {
  let bst = new BST()
  bst.insert(12)
  bst.insert(4)
  bst.insert(8)
  bst.insert(15)
  assert.deepEqual(bst.delete(2), null, 'should return null')
  assert.deepEqual(bst.delete(8).key, 8, 'should return 8')
  assert.deepEqual(bst.length(), 3, 'length should be 3')
  assert.end()
})

test('BST transplant', assert => {
  let bst = new BST(),
      el1,
      el2
  bst.insert(12)
  bst.insert(4)
  bst.insert(8)
  bst.insert(15)
  el1 = bst.search(4)
  el2 = bst.search(8)
  assert.deepEqual(el2.parent.key, 4, '8 parent´s should be 4')
  bst.transplant(el1, el2)
  assert.deepEqual(el2.parent.key, 12, '8 parent´s should be 12')
  assert.end()
})

test('BST search', assert => {
  let bst = new BST()
  bst.insert(12)
  bst.insert(4)
  bst.insert(8)
  bst.insert(15)
  assert.deepEqual(bst.search(8).key, 8, 'should find element with key 8')
  assert.deepEqual(bst.search(2), null, 'should return null if not found')
  assert.end()
})

test('BST min', assert => {
  let bst = new BST()
  bst.insert(12)
  bst.insert(4)
  bst.insert(8)
  bst.insert(2)
  assert.deepEqual(bst.min(bst.root).key, 2, 'should return min element')
  assert.end()
})

test('BST max', assert => {
  let bst = new BST()
  bst.insert(12)
  bst.insert(4)
  bst.insert(8)
  bst.insert(15)
  assert.deepEqual(bst.max(bst.root).key, 15, 'should return max element')
  assert.end()
})

test('BST sucessor', assert => {
  let bst = new BST()
  bst.insert(12)
  bst.insert(4)
  bst.insert(8)
  bst.insert(15)
  assert.deepEqual(bst.sucessor(12).key, 15, 'should return 15, sucessor for 12')
  assert.deepEqual(bst.sucessor(15), null, 'should return null if not found')
  assert.end()
})

test('BST predecessor', assert => {
  let bst = new BST()
  bst.insert(12)
  bst.insert(4)
  bst.insert(8)
  bst.insert(15)
  assert.deepEqual(bst.predecessor(12).key, 8, 'should return 8, predecessor for 12')
  assert.deepEqual(bst.predecessor(4), null, 'should return null if not found')
  assert.end()
})

test('BST length', assert => {
  let bst = new BST()
  bst.insert(12)
  bst.insert(4)
  bst.insert(8)
  bst.insert(15)
  assert.deepEqual(bst.length(), 4, 'should return length 4')
  bst.insert(21)
  bst.insert(13)
  assert.deepEqual(bst.length(), 6, 'should return length 6')  
  assert.end()
})

test('BST toArray', assert => {
  let bst = new BST()
  bst.insert(4)
  bst.insert(8)
  bst.insert(15)
  assert.deepEqual(bst.toArray(), [4, 8, 15], 'should return array representation of bst')
  assert.deepEqual(Array.isArray(bst.toArray()), true, 'should return an array')
  assert.end()
})
