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

BST.prototype.insert = function (value) {
  let node = new Node(value),
      current = null,
      x = this.root

  while (x !== null) {
    current = x
    if (node.key < x.key) x = x.left
    else x = x.right
  }
  
  if (current === null) this.root = node
  else if (node.key < current.key) current.left = node
  else current.right = node
  node.parent = current
}

BST.prototype.delete = function (value) {
  // Need help with this one
  // What would be a good implementation:
  // All these methods in the Node object
  // or in the Tree object?
  let current = this.search(value),
      parent = null,
      found = false
  
  // while (!found && current) {
  //   parent = current
  //   if (value < current.key) current = current.left
  //   else if (value > current.key) current = current.right
  //   else found = true
  // }

  // if (!found) return

  if (!current) return null

  if (current === this.root) {
    let pseudoRoot = new Node(0)
    pseudoRoot.left = this.root
    this.root.parent = pseudoRoot
    let deleted = this.delete(this.root.key)
    this.root = pseudoRoot.left
    if (this.root) this.root.parent = null

    return deleted
  } else {
    return this.delete(current)
  }

  // delete a node with no children
  if (!current.left || !current.right) {
    if (current === parent.left) {
      parent.left = current.left || current.right
      if (parent.left) {
        parent.left.parent = parent
      }
    } else {
      parent.right = current.left || current.right
      if (parent.right) {
        parent.right.parent = parent
      }
    }
    return current
  } else {
    let s = this.sucessor(current.key),
        temp = current.key
    
    current.key = s.key
    s.key = temp
    return this.delete(s.key)
  }
}

BST.prototype.search = function (value) {
  let current = this.root
  while (current) {
    if (value === current.key) return current
    else if (value < current.key) current = current.left
    else current = current.right
  }
  return null
l}

BST.prototype.min = function (node) {
  while (node.left) node = node.left
  return node
}

BST.prototype.max = function (node) {
  while (node.right) node = node.right
  return node
}

BST.prototype.sucessor = function(value) {
  let current = this.search(value)
  if (current.right) {
    return this.min(current.right)
  }
  while (current.parent && current === current.parent.right)
    current = current.parent
  return current.parent
}

BST.prototype.predecessor = function(value) {
  let current = this.search(value)
  if (current.left) {
    return this.max(current.left)
  }
  while (current.parent && current === current.parent.left)
    current = current.parent
  return current.parent
}

BST.prototype.length = function () {
  let count = 0
  this.inorderTreeWalk(this.root, function() {
    count++
  })
  return count
}

BST.prototype.toArray = function () {
  let result = []
  this.inorderTreeWalk(this.root, function(key) {
    result.push(key)
  })
  return result
}

BST.prototype.inorderTreeWalk = function (node, callback) {
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
  assert.deepEqual(bst.toArray(), [4,8,12,15])
  assert.deepEqual(bst.length(), 4)
  assert.deepEqual(bst.root.left.parent.key, 12)
  assert.deepEqual(bst.sucessor(12).key, 15)
  assert.deepEqual(bst.sucessor(8).key, 12)
  assert.deepEqual(bst.sucessor(15), null)
  assert.deepEqual(bst.predecessor(12).key, 8)
  assert.deepEqual(bst.predecessor(8).key, 4)
  assert.deepEqual(bst.predecessor(4), null)
  assert.end()
})
