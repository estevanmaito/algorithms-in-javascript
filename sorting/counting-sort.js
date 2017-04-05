// Counting sort

let countingSort = (arr) => {
  let result = [],
      counting = [],
      maxArr = Math.max(...arr)

  for (let i = 0; i <= maxArr; i++) {
    counting[i] = 0
  }

  for (let j = 0; j < arr.length; j++) {
    counting[arr[j]] = counting[arr[j]] + 1
  }

  for (let i = 1; i <= maxArr; i++) {
    counting[i] = counting[i] + counting[i - 1]
  }

  for (let j = arr.length - 1; j >= 0; j--) {
    counting[arr[j]] = counting[arr[j]] - 1
    result[counting[arr[j]]] = arr[j]
  }

  return result
}

const test = require('tape')

test('Counting sort', assert => {
  assert.deepEqual(countingSort([2,5,3,0,2,3,0,3]), [0,0,2,2,3,3,3,5])
  assert.deepEqual(countingSort([2,4,6,5,1,3]), [1,2,3,4,5,6])
  assert.end()
})