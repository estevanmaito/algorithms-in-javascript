// https://en.wikipedia.org/wiki/Bucket_sort

let insertionSort = require('./insertion-sort.js')

let bucketSort = (arr) => {
  let result = []

  for (let i = 0; i < arr.length; i++) {
    result[i] = []
  }

  for (let i = 0; i < arr.length; i++) {
    result[Math.floor(arr[i] / 10)].push(arr[i])
  }

  for (let i = 0; i < arr.length; i++) {
    insertionSort(result[i])
  }

  result = [].concat.apply([], result)

  return result
}

const test = require('tape')

test('Bucket sort', assert => {
  assert.deepEqual(bucketSort([32,45,37,68,12,94,91,90,97,9,62]),
                              [9,12,32,37,45,62,68,90,91,94,97])
  assert.end()
})