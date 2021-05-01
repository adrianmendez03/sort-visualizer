import { updateComparisions } from './ui.js'
import { createFreq } from './audio.js'
let comparisons = 0

// Average case: 0(n^2)
// Best case: 0(1)
// Space: 0(1)

// Bubble Sort iterates through the array of nums and compares two adjacent numbers.
// It swaps those numbers if nums[j] > nums[j + 1]. It does this repeatedly until it reaches the end of the array.
// It iterates through the array until no swaps were made or it has reached the end of the array 

export async function bubbleSort (arr, speed) {

    updateComparisions(comparisons)

    for (let i = 0; i < arr.length; i++) {
        let swapped = false
        for (let j = 0; j < arr.length - i - 1; j++) {
            // Visual/Algo: Create values and reference segments
            const currentVal = arr[j], 
                nextVal = arr[j + 1],
                $current = $("#" + currentVal),
                $next = $("#" + nextVal)

            // Visual: add the compare class and change the pitch
            $current.addClass("comparing")
            $next.addClass("comparing")
            await sleep(speed)
            // Visual: update the comparisons
            comparisons++
            updateComparisions(comparisons)
            // Algo: Secret sauce for bubble sort
            if (currentVal > nextVal) {
                // Algo: Swap the nums if currentVal is bigger than nextVal
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                // Visual: Visually swap the segmmnts
                $current.insertAfter($next)
                // Algo: Let the algo know we swapped some values
                swapped = true
            }
            // Visual: Remove compare class
            $current.removeClass("comparing")
            $next.removeClass("comparing")
        }
        if (!swapped) {
            break
        }
    }
    await finalPass(arr, speed)
    comparisons = 0 
}

// Time Complexity 0(n^2)
// Space Complexity 0(1)

// Insertion Sort works similiarly to the way you would sort playing cards in your hands.
// Given a list of numbers it starts at arr[1] and compares the current number to the previous number.
// If the current number is less than, it swaps places until the current number is greater than the previous.
// This process continues until it has iterated through the entire array.

export async function insertionSort(arr, speed) {

    for (let i = 1; i < arr.length; i++) {
        // A: Store variables
        let key = arr[i], $key = $("#" + arr[i + 1]), j = i - 1
        // V: 
        $key.addClass("sorted")
        comparisons++
        updateComparisions(comparisons)
        await sleep(speed)
        while (j >= 0 && key < arr[j]) {
            comparisons++
            // V: update the UI
            updateComparisions(comparisons)
            // V: create variables to hold the values you're comparing
            let $current = $("#" + arr[j]), $next = $("#" + arr[j + 1])
            // V: add the class comparing, change the pitch and time the function out
            $current.addClass("comparing")
            // audio.frequency.value = createFreq(arr[j], length)
            $next.addClass("comparing")
            await sleep(speed);
            // A: this does the under the hood swap
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            // V: this does the visual swap
            $current.insertAfter($next)
            // V: remove the compare class
            $current.removeClass("comparing")
            $next.removeClass("comparing")
            // A:
            j--
        }
        // A:
        arr[j + 1] = key
        $key.removeClass("sorted")
    }
    await finalPass(arr, speed)
    comparisons = 0
}

// Time Complexity: 0(nlogn)
// Space Complexity: 0(n)

// Merge Sort is a recursice sorting method. The idea is to recursively split an array in half until you are left with one element, from there you build your
// sorted array. The actual sorting happens by looping through both halves and comparing them and finally returning your sorted half. This process repeats until
// it reaches the top of the recursive stack.

export async function mergeSort (arr, speed, tools) {
    const { length } = tools

    if (arr.length > 1) {
        // A: Find the middle of the array 
        const mid = Math.floor(arr.length / 2)
        // A: Create left and right array 
        const left = arr.slice(0, mid)
        const right = arr.slice(mid, arr.length)
        // A: Recursively call
        await mergeSort(left, speed, tools)
        await mergeSort(right, speed, tools)
        // A: Create pointers for left, right, and full arr
        // V: Anchor keeps track of the previous inserted element
        let i = 0, j = 0, k = 0, anchor = left[i] < right[j] ? left[i] : right[j]

        while (i < left.length && j < right.length) {
            // V: Create variables for left, right, and achor segments
            const $left = $("#" + left[i]), $right = $("#" + right[j]), $anchor = $("#" + anchor)
            // V: Add comparing class to left and right
            $left.addClass("comparing")
            $right.addClass("comparing")
            // V: Update the audio
            await sleep(speed)
            // A: Updating the comparisons
            tools.comparisons++
            updateComparisions(tools.comparisons)
            // A & V: With each comparisons set the anchor equal to the element being inserted and increment either i or j
            if (left[i] < right[j]) {
                anchor = left[i]
                $left.insertAfter($anchor)
                arr[k] = left[i]
                i++
            } else {
                $right.insertAfter($anchor)
                anchor = right[j]
                arr[k] = right[j]
                j++
            }
            // V: Remove the comparing class
            $left.removeClass("comparing")
            $right.removeClass("comparing")
            await sleep(speed)
            // A: Increment K
            k++
        }

        // A: if there are any other elements left add them to the end of the arr
        // Just perform a swap 
        while (i < left.length) {
            $("#" + left[i]).addClass("comparing")
            $("#" + left[i]).insertAfter($("#" + anchor))
            anchor = left[i]
            await sleep(speed)
            arr[k] = left[i]
            $("#" + left[i]).removeClass("comparing")
            i++, k++
        }

        while (j < right.length) {
            $("#" + right[i]).addClass("comparing")
            $("#" + right[j]).insertAfter($("#" + anchor))
            anchor = right[j]
            await sleep(speed)
            arr[k] = right[j]
            $("#" + right[i]).removeClass("comparing")
            j++, k++
        }
    }
}

// Time complexity 0(n^2) as there are two nested loops
// Space Complexity 0(1)

// Selection Sort loops through the entire array to find the smallest value and places it at the beginning. It does this until it reaches the end of the array.
// On avereage this sorting method time complexity is n^2, but what it lacks in speed it makes up for in Space as it never makes for than 0(n) swaps making
// it useful when working with limited memory. 

export async function selectionSort (arr, speed) {

    for (let i = 0; i < arr.length; i++) {
        // A: Initialize the minimum value index
        let minIdx = i
        // V: Visualize the minimum value which when the loop runs is the first value
        $("#" + arr[i]).addClass("comparing")
        await sleep(speed)
        for (let j = i + 1; j < arr.length; j++) {
            // V: Create variable to hold the current value and highlight it
            const $curr = $("#" + arr[j])
            $curr.addClass("comparing")
            await sleep(speed)
            // V: Increase the comparisons
            comparisons++
            updateComparisions(comparisons)
            // A: If the current value is less than the minimum we need to update the minimum
            if (arr[minIdx] > arr[j]) {
                // V: Remove the highlight from what will be the old minimum
                $("#" + arr[minIdx]).removeClass("comparing")
                // A: Update the min index for the algo 
                minIdx = j
                $("#" + arr[minIdx]).addClass("comparing")
                await sleep(speed)
            } else {
                $curr.removeClass("comparing")
            }
        }
        // A: This does the actual swap 
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
        // V: Create variables to hold the current and the minimum
        const $curr = $("#" + arr[i]), $min = $("#" + arr[minIdx])
        // V: Swap them 
        swap($curr, $min)
        await sleep(speed)
        // V: Remove compare class
        $min.removeClass("comparing")
        $curr.removeClass("comparing")
    }
    // V: Stop the audio 
    // V: Final Pass
    await finalPass(arr, speed)
    // V: Reset comparisons
    comparisons = 0

}

function swap (a, b) {
    // create a temporary marker div
    var aNext = $('<div>').insertAfter(a);
    a.insertAfter(b);
    b.insertBefore(aNext);
    // remove marker div
    aNext.remove();
}

export async function finalPass (arr, speed) {
    for (let num of arr) {
        $("#" + num).addClass("sorted")
        await sleep(speed)
    }
}

function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
