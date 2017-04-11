// https://en.wikipedia.org/wiki/Bubble_sort

let bubbleSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {

    for (let j = i + 1; j < arr.length; j++) {

      if (arr[i] > arr[j]) {
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
    }
  }

  return arr
}

const test = require('tape')

test('Bubble sort', assert => {
  assert.deepEqual(bubbleSort([2, 4, 6, 5, 1, 3]), [1, 2, 3, 4, 5, 6])
  assert.deepEqual([1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6])
  assert.deepEqual(bubbleSort([-2, 4, 6, -5, 1, 3]), [-5, -2, 1, 3, 4, 6])
  assert.deepEqual(bubbleSort([40, 12, 5, 34, 8, 35]), [5, 8, 12, 34, 35, 40])
  assert.end()
})
