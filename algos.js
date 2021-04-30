import { updateComparisions, updateTime } from './ui.js'
import { createFreq, createAudio } from './audio.js'
import { time } from './time.js'
let comparisons = 0

// Average case: 0(n^2)
// Best case: 0(1)
// Space: 0(1)

// Bubble Sort iterates through the array of nums and compares two adjacent numbers.
// It swaps those numbers if nums[j] > nums[j + 1]. It does this repeatedly until it reaches the end of the array.
// It iterates through the array until no swaps were made or it has reached the end of the array 

export async function bubbleSort (arr, speed) {
    
    const { length, start, audio } = setUp(arr)
    audio.start()
    updateComparisions(comparisons)

    for (let i = 0; i < length; i++) {
        let swapped = false
        for (let j = 0; j < length - i - 1; j++) {
            // Visual: Update the time
            updateTime(time.end() - start)
            // Visual/Algo: Create values and reference segments
            const currentVal = arr[j], 
                nextVal = arr[j + 1],
                $current = $("#" + currentVal),
                $next = $("#" + nextVal)

            // Visual: add the compare class and change the pitch
            $current.addClass("comparing")
            $next.addClass("comparing")
            audio.frequency.value = createFreq((currentVal + nextVal) / 2, length)
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
            audio.stop()
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

    const { length, start, audio } = setUp(arr)
    audio.start()

    for (let i = 1; i < length; i++) {
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
            updateTime(time.end() - start)
            // V: create variables to hold the values you're comparing
            let $current = $("#" + arr[j]), $next = $("#" + arr[j + 1])
            // V: add the class comparing, change the pitch and time the function out
            $current.addClass("comparing")
            audio.frequency.value = createFreq((arr[j] + arr[j + 1]) / 2, length)
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
    audio.stop()
    await finalPass(arr, speed)
    comparisons = 0
}

// Time Complexity: 0(nlogn)
// Space Complexity: 0(n)

// Merge Sort is a recursice sorting method. The idea is to recursively split an array in half until you are left with one element, from there you build your
// sorted array. The actual sorting happens by looping through both halves and comparing them and finally returning your sorted half. This process repeats until
// it reaches the top of the recursive stack.

export async function mergeSort (arr, speed) {
    if (arr.length > 1) {
        const mid = Math.floor(arr.length / 2)

        const left = arr.slice(0, mid)
        const right = arr.slice(mid)

        // await pass(left, right, speed)

        // await sleep(speed)

        await mergeSort(left, speed)
        await mergeSort(right, speed)

        let i = 0, j = 0, k = 0, anchor = left[i] < right[j] ? left[i] : right[j]

        while (i < left.length && j < right.length) {
            const $left = $("#" + left[i]), $right = $("#" + right[j]), $anchor = $("#" + anchor)
            $left.addClass("comparing")
            $right.addClass("comparing")
            await sleep(speed)
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
            $left.removeClass("comparing")
            $right.removeClass("comparing")
            await sleep(speed)
            k++
        }

        while (i < left.length) {
            $("#" + left[i]).insertAfter($("#" + anchor))
            $("#" + left[i]).addClass("comparing")
            anchor = left[i]
            await sleep(speed)
            arr[k] = left[i]
            $("#" + left[i]).removeClass("comparing")
            i++, k++
        }

        while (j < right.length) {
            $("#" + right[j]).insertAfter($("#" + anchor))
            $("#" + left[i]).addClass("comparing")
            await sleep(speed)
            anchor = right[j]
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

    const { length, start, audio } = setUp(arr)
    const minAudio = createAudio(arr[0], length)
    audio.start()
    minAudio.start()

    for (let i = 0; i < length; i++) {
        // A: Initialize the minimum value index
        let minIdx = i
        // V: Visualize the minimum value which when the loop runs is the first value
        $("#" + arr[i]).addClass("comparing")
        minAudio.frequency.value = createFreq(arr[minIdx], length)
        await sleep(speed)
        for (let j = i + 1; j < length; j++) {
            // V: Create variable to hold the current value and highlight it
            const $curr = $("#" + arr[j])
            $curr.addClass("comparing")
            audio.frequency.value = createFreq(arr[j], length)
            await sleep(speed)
            // V: Increase the comparisons
            comparisons++
            updateTime(time.end() - start)
            updateComparisions(comparisons)
            // A: If the current value is less than the minimum we need to update the minimum
            if (arr[minIdx] > arr[j]) {
                // V: Remove the highlight from what will be the old minimum
                $("#" + arr[minIdx]).removeClass("comparing")
                // A: Update the min index for the algo 
                minIdx = j
                $("#" + arr[minIdx]).addClass("comparing")
                minAudio.frequency.value = createFreq(arr[minIdx], length)
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
    audio.stop()
    minAudio.stop()
    // V: Final Pass
    await finalPass(arr, speed)
    // V: Reset comparisons
    comparisons = 0

}

function setUp (arr) {
    const length = arr.length
    const start = time.start()
    const audio = createAudio((arr[0] + arr[1]) / 2, length)
    return { length, start, audio }
}

function swap (a, b) {
    // create a temporary marker div
    var aNext = $('<div>').insertAfter(a);
    a.insertAfter(b);
    b.insertBefore(aNext);
    // remove marker div
    aNext.remove();
}

async function pass (arr, arr2, speed) {
    let i = 0, j = 0
    while (i < arr && j < arr2) {
        const $left = $("#" + arr[i]), $right = $("#" + arr2[j])
        $left.addClass("left")
        $right.addClass("right")
        await sleep(speed)
    }
}

async function finalPass (arr, speed) {
    const audio = createAudio(arr[0], arr.length)
    audio.start()
    for (let num of arr) {
        $("#" + num).addClass("sorted")
        audio.frequency.value = createFreq(num, arr.length)
        await sleep(speed)
    }
    audio.stop()
}

function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
