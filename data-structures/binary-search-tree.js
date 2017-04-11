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

test('BST', assert => {
  let bst = new BST()
  bst.insert(12)
  bst.insert(4)
  bst.insert(8)
  bst.insert(15)
  assert.deepEqual(bst.search(15).key, 15)
  assert.deepEqual(bst.min(bst.root).key, 4)
  assert.deepEqual(bst.max(bst.root).key, 15)
  assert.deepEqual(bst.toArray(), [4, 8, 12, 15])
  assert.deepEqual(bst.length(), 4)
  assert.deepEqual(bst.root.left.parent.key, 12)
  assert.deepEqual(bst.sucessor(12).key, 15)
  assert.deepEqual(bst.sucessor(8).key, 12)
  assert.deepEqual(bst.sucessor(15), null)
  assert.deepEqual(bst.predecessor(12).key, 8)
  assert.deepEqual(bst.predecessor(8).key, 4)
  assert.deepEqual(bst.predecessor(4), null)
  bst.delete(12)
  assert.deepEqual(bst.search(12), null)
  assert.deepEqual(bst.toArray(), [4, 8, 15])
  assert.deepEqual(bst.root.left.parent.key, 15)
  assert.deepEqual(bst.length(), 3)
  assert.end()
})
