function insertionSort(arr) {
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

const arr = [4, 1, 5, 2, 7, 4, 10, 5, 90, 23, 14]

console.log(insertionSort(arr))