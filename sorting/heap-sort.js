// https://en.wikipedia.org/wiki/Heapsort

let swap = (arr, orig, dest) => {
  let temp = arr[orig]
  arr[orig] = arr[dest]
  arr[dest] = temp
}

let maxHeapify = (arr, i, n) => {
  let left = 2 * i + 1,
      rigth = 2 * i + 2,
      largest = i

  if (left < n && arr[left] > arr[i]) {
    largest = left
  }

  if (rigth < n && arr[rigth] > arr[largest]) {
    largest = rigth
  }

  if (largest !== i) {
    swap(arr, i, largest)
    maxHeapify(arr, largest, n)
  }
}

let buildMaxHeap = (arr, n) => {
  let len = Math.floor((n - 1) / 2)
  for (let i = len; i >= 0; i--) {
    maxHeapify(arr, i, n)
  }
}

let heapSort = (arr) => {
  let n = arr.length
  buildMaxHeap(arr, n)
  for (let i = arr.length - 1; i > 0; i--) {
    swap(arr, i, 0)
    maxHeapify(arr, 0, --n)
  }

  return arr
}

const test = require('tape')

// test('maxHeapify', assert => {
//   assert.deepEqual(maxHeapify([27,17,3,16,13,10,1,5,7,12,4,8,9,0], 2),
//                               [27,17,10,16,13,9,1,5,7,12,4,8,3,0])
//   assert.deepEqual(maxHeapify([16,4,10,14,7,9,3,2,8,1], 1),
//                               [16,14,10,8,7,9,3,2,4,1])
//   assert.deepEqual(maxHeapify([16,14,10,8,1,9,3,2,4,7], 4),
//                               [16,14,10,8,7,9,3,2,4,1])
//   assert.end()
// })

// test('buildMaxHeap', assert => {
//   assert.deepEqual(buildMaxHeap([4,1,3,2,16,9,10,14,8,7]),
//                                 [16,14,10,8,7,9,3,2,4,1])
//   assert.end()
// })

test('heapSort', assert => {
  assert.deepEqual(heapSort([4, 1, 3, 2, 16, 9, 10, 14, 8, 7]),
                            [1, 2, 3, 4, 7, 8, 9, 10, 14, 16])
  assert.end()
})
