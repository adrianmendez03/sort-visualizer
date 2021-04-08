// Average case: 0(n^2)
// Best case: 0(1)
// Space: 0(1)


function bubbleSort (arr) {
    const length = arr.length
    for (let i = 0; i < length; i++) {
        let swapped = false
        for (let j = 0; j < length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                swapped = true
            }
        }
        if (!swapped) {
            break
        }
    }
    return arr
}

const arr = [4, 1, 5, 2, 7, 4, 10]

console.log(bubbleSort(arr))