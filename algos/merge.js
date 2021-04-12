// Time Complexity: 0(nlogn)
// Space Complexity: 0(n)

// Merge Sort is a recursice sorting method. The idea is to recursively split an array in half until you are left with one element, from there you build your
// sorted array. The actual sorting happens by looping through both halves and comparing them and finally returning your sorted half. This process repeats until
// it reaches the top of the recursive stack.

function mergeSort (arr) {
    if (arr.length > 1) {
        const mid = Math.floor(arr.length / 2)

        const left = arr.slice(0, mid)
        const right = arr.slice(mid)

        mergeSort(left)
        mergeSort(right)

        let i = j = k = 0
        
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                arr[k] = left[i]
                i++
            } else {
                arr[k] = right[j]
                j++
            }
            k++
        }

        while (i < left.length) {
            arr[k] = left[i]
            i++, k++
        }

        while (j < right.length) {
            arr[k] = right[j]
            j++, k++
        }

    }
    return arr
}

const arr = [5, 4, 3, 2, 1]

console.log("Result: ", mergeSort(arr))