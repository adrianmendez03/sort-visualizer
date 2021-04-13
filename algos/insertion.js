// Time Complexity 0(n^2)
// Space Complexity 0(1)

// Insertion Sort works similiarly to the way you would sort playing cards in your hands.
// Given a list of numbers it starts at arr[1] and compares the current number to the previous number.
// If the current number is less than, it swaps places until the current number is greater than the previous.
// This process continues until it has iterated through the entire array.

export function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i]
        let j = i - 1
        while (j >= 0 && key < arr[j]) {
            arr[j + 1] = arr[j]
            j--
        }
        arr[j + 1] = key 
    }
    return arr
}