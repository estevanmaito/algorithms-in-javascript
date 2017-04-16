// https://en.wikipedia.org/wiki/Breadth-first_search

const Queue = require('../data-structures/queue.js')

let BFS = (graph, source, value) => {
  let queue = new Queue(),
      searched = []
      
  queue.enqueue(source)

  while (queue.size()) {
    let current = queue.dequeue()
    
    for (let i = 0; i < graph[current].length; i++) {
      if (!searched.includes(graph[current][i])) {
        if (graph[current][i] === value) {
          return true
        } else {
          queue.enqueue(graph[current][i])
        }
      }
    }
    searched.push(current)
  }

  return false
}

const test = require('tape')

test('Breadth first search', assert => {
  let graph = [
    [1],
    [0, 3],
    [4],
    [1, 5],
    [2, 7],
    [1, 3, 6],
    [3, 5, 7],
    [4, 6]
  ]
  assert.true(BFS(graph, 1, 7))
  assert.false(BFS(graph, 0, 8))
  assert.end()
})
