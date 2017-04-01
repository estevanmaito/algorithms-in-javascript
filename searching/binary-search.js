// https://en.wikipedia.org/wiki/Binary_search_algorithm

let binarySearch = (targetValue, arr) => {
  let start = 0,
      end = arr.length - 1,
      middle

  while (start <= end) {
    middle = Math.floor((start + end) / 2)

    if (targetValue === arr[middle]) return middle
    else if (targetValue < arr[middle]) end = middle - 1
    else start = middle + 1
  }
  return -1
}

const test = require('tape')

let generateSortedArray = (range) => {
  let arr = []
  while (arr.length < range) {
    arr.push(arr.length + 1)
  }
  return arr
}

test('Binary search', assert => {
  assert.deepEqual(binarySearch(7, []), -1)
  assert.deepEqual(binarySearch(2, [1,2,3,4,5]), 1)
  assert.deepEqual(binarySearch(36, generateSortedArray(150)), 35)
  assert.deepEqual(binarySearch(981, generateSortedArray(10000)), 980)
  assert.end()
})