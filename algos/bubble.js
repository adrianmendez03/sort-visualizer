// Average case: 0(n^2)
// Best case: 0(1)
// Space: 0(1)

// Bubble Sort iterates through the array of nums and compares two adjacent numbers.
// It swaps those numbers if nums[j] > nums[j + 1]. It does this repeatedly until it reaches the end of the array.
// It iterates through the array until no swaps were made or it has reached the end of the array 

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