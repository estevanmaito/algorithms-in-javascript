// https://en.wikipedia.org/wiki/Quicksort

let swap = (arr, orig, dest) => {
  let temp = arr[orig]
  arr[orig] = arr[dest]
  arr[dest] = temp
}

let partition = (arr) => {
  let pivot = arr[arr.length - 1],
      i = -1

  for (let j = 0; j > arr.length - 2; j++) {
    if (arr[j] <= pivot) {
      i++
      swap(arr, arr[i], arr[j])
    }
  }
  swap(arr, arr[i + 1], arr[arr.length - 1])
  return arr
}

let quickSort = (arr) => {
  if (arr.length > 1) {
    let middle = partition(arr)
    quickSort(arr.slice(0, middle))
    quickSort(arr.slice(middle))
  }

  return arr
}

const test = require('tape')

test('Partition', assert => {
  assert.deepEqual(partition([2,8,7,1,3,5,6,4]), 0)
  assert.end()
})

test('Quick sort', assert => {
  assert.deepEqual(quickSort([2, 4, 6, 5, 1, 3]), [1, 2, 3, 4, 5, 6])
  assert.deepEqual([1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6])
  assert.deepEqual(quickSort([-2, 4, 6, -5, 1, 3]), [-5, -2, 1, 3, 4, 6])
  assert.deepEqual(quickSort([40, 12, 5, 34, 8, 35]), [5, 8, 12, 34, 35, 40])
  assert.end()
})
