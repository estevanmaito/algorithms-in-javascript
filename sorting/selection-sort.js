// https://en.wikipedia.org/wiki/Selection_sort

let selectionSort = (array) => {
  let min

  for (let i = 0; i < array.length; i++) {
    min = i

    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[min])
        min = j
    }

    if (i !== min) {
      let temp = array[i]
      array[i] = array[min]
      array[min] = temp
    }
    
  }
  return array
}

const test = require('tape')

test('Selection sort', assert => {
  assert.deepEqual(selectionSort([2, 4, 6, 5, 1, 3]), [1, 2, 3, 4, 5, 6])
  assert.deepEqual([1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6])
  assert.deepEqual(selectionSort([-2, 4, 6, -5, 1, 3]), [-5, -2, 1, 3, 4, 6])
  assert.deepEqual(selectionSort([40, 12, 5, 34, 8, 35]), [5, 8, 12, 34, 35, 40])
  assert.end()
})