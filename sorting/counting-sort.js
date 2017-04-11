// https://en.wikipedia.org/wiki/Counting_sort

let countingSort = (arr) => {
  let result = [],
      count = [],
      maxArr = Math.max(...arr),
      i,
      j

  for (i = 0; i <= maxArr; i++) {
    count[i] = 0
  }

  for (j = 0; j < arr.length; j++) {
    count[arr[j]] = count[arr[j]] + 1
  }

  for (i = 1; i <= maxArr; i++) {
    count[i] = count[i] + count[i - 1]
  }

  for (j = arr.length - 1; j >= 0; j--) {
    count[arr[j]] = count[arr[j]] - 1
    result[count[arr[j]]] = arr[j]
  }

  return result
}

const test = require('tape')

test('Counting sort', assert => {
  assert.deepEqual(countingSort([2, 5, 3, 0, 2, 3, 0, 3]), [0, 0, 2, 2, 3, 3, 3, 5])
  assert.deepEqual(countingSort([2, 4, 6, 5, 1, 3]), [1, 2, 3, 4, 5, 6])
  assert.end()
})
