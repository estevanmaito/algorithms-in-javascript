// https://en.wikipedia.org/wiki/Binary_search_tree

function Node(data) {
  this.key = data
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
}

BST.prototype.delete = function (value) {
  // Need help with this one, as most other languages implementations
  // depend on the parent being stored in the node
  // Is there another way of traversing the three in O(lg n) without
  // that?
  let current = this.root,
      parent = null,
      found = false
  
  while (!found && current) {
    parent = current
    if (value < current.key) current = current.left
    else if (value > current.key) current = current.right
    else found = true
  }

  if (!found) return

  // delete a node with no children
  // if (!current.left || !current.right) {
  //   if (current === parent.left) {
  //     parent.left = current.left || current.right
  //     if (!parent.left) {
  //       parent.left.parent = parent
  //     }
  //   }
  // }
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

BST.prototype.min = function () {
  let current = this.root.left
  while (current.left) current = current.left
  return current
}

BST.prototype.max = function () {
  let current = this.root.right
  while (current.right) current = current.right
  return current
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
  assert.deepEqual(bst.min().key, 4)
  assert.deepEqual(bst.max().key, 15)
  assert.deepEqual(bst.toArray(), [4,8,12,15])
  assert.deepEqual(bst.length(), 4)
  assert.end()
})
