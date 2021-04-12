// Time complexity 0(n^2) as there are two nested loops
// Space Complexity 0(1)

// Selection Sort loops through the entire array to find the smallest value and places it at the beginning. It does this until it reaches the end of the array.
// On avereage this sorting method time complexity is n^2, but what it lacks in speed it makes up for in Space as it never makes for than 0(n) swaps making
// it useful when working with limited memory. 

function selectionSort (arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIdx = i
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[minIdx] > arr[j]) {
                minIdx = j
            }
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
    }
    return arr
}

const arr = [4, 1, 5, 2, 7, 4, 10]

console.log(selectionSort(arr))