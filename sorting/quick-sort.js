// https://en.wikipedia.org/wiki/Quicksort

let swap = (arr, orig, dest) => {
  let temp = arr[orig]
  arr[orig] = arr[dest]
  arr[dest] = temp
}

let partition = (arr, start, end) => {
  let pivot = arr[end],
      i = start - 1

  for (let j = start; j < end; j++) {
    if (arr[j] <= pivot) {
      swap(arr, ++i, j)
    }
  }
  swap(arr, i + 1, end)
  return i + 1
}

let quickSort = (arr, start, end) => {
  if (start < end) {
    let middle = partition(arr, start, end)
    quickSort(arr, start, middle - 1)
    quickSort(arr, middle + 1, end)
  }
}

const test = require('tape')

test('Partition', assert => {
  let arr = [2, 8, 7, 1, 3, 5, 6, 4]
  assert.deepEqual(partition(arr, 0, arr.length - 1), 3)
  assert.end()
})

test('Quick sort', assert => {
  let arr = [1, 4, 3, 5, 2]
  quickSort(arr, 0, arr.length - 1)
  assert.deepEqual(arr, [1, 2, 3, 4, 5])
  arr = [2, 8, 7, 1, 3, 5, 6, 4]
  quickSort(arr, 0, arr.length - 1)
  assert.deepEqual(arr, [1, 2, 3, 4, 5, 6, 7, 8])
  assert.end()
})
