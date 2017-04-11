// https://en.wikipedia.org/wiki/Merge_sort

let merge = (left, right) => {
  let arr = [],
      i = 0,
      j = 0

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      arr.push(left[i++])
    } else {
      arr.push(right[j++])
    }
  }
  
  return arr.concat(left.slice(i)).concat(right.slice(j))
}

let mergeSort = (arr) => {
  if (arr.length > 1) {
    let middle = Math.floor(arr.length / 2),
        left = mergeSort(arr.slice(0, middle)),
        rigth = mergeSort(arr.slice(middle))
    return merge(left, rigth)
  }

  return arr
}

const test = require('tape')

test('Merge sort', assert => {
  assert.deepEqual(mergeSort([2, 4, 5, 7, 1, 2, 3, 6]), [1, 2, 2, 3, 4, 5, 6, 7])
  assert.deepEqual(mergeSort([2, 22, 5, -3, 4, 9, 3, 6]), [-3, 2, 3, 4, 5, 6, 9, 22])
  assert.deepEqual(mergeSort([]), [])
  assert.deepEqual(mergeSort([1]), [1])
  assert.end()
})
