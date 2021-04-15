const speed  = 50
// Average case: 0(n^2)
// Best case: 0(1)
// Space: 0(1)

// Bubble Sort iterates through the array of nums and compares two adjacent numbers.
// It swaps those numbers if nums[j] > nums[j + 1]. It does this repeatedly until it reaches the end of the array.
// It iterates through the array until no swaps were made or it has reached the end of the array 

export async function bubbleSort (arr) {
    console.log(o)
    const length = arr.length
    for (let i = 0; i < length; i++) {
        let swapped = false
        for (let j = 0; j < length - i - 1; j++) {

            const currentVal = arr[j], 
                nextVal = arr[j + 1],
                $current = $("#" + currentVal),
                $next = $("#" + nextVal)
            
            $current.addClass("selected")
            await sleep(speed)
            $current.removeClass("selected").addClass("comparing")
            $next.addClass("comparing")
            await sleep(speed)
            if (currentVal > nextVal) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                $current.insertAfter($next)
                swapped = true
            }
            $current.removeClass("comparing")
            $next.removeClass("comparing")
        }
        if (!swapped) {
            break
        }
    }
    finalPass(arr)
}

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

// Time Complexity: 0(nlogn)
// Space Complexity: 0(n)

// Merge Sort is a recursice sorting method. The idea is to recursively split an array in half until you are left with one element, from there you build your
// sorted array. The actual sorting happens by looping through both halves and comparing them and finally returning your sorted half. This process repeats until
// it reaches the top of the recursive stack.

export function mergeSort (arr) {
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

// Time complexity 0(n^2) as there are two nested loops
// Space Complexity 0(1)

// Selection Sort loops through the entire array to find the smallest value and places it at the beginning. It does this until it reaches the end of the array.
// On avereage this sorting method time complexity is n^2, but what it lacks in speed it makes up for in Space as it never makes for than 0(n) swaps making
// it useful when working with limited memory. 

export function selectionSort (arr) {
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

async function finalPass (arr) {
    for (let num of arr) {
        $("#" + num).addClass("sorted")
        await sleep(speed)
    }
}

function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}