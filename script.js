import { 
    bubbleSort,
    insertionSort,
    mergeSort,
    selectionSort,
    finalPass,
    setUp
} from "./algos.js";
import {
    updateComparisions,
    updateTime
} from './ui.js'

(function() {
    let $container, controls = {
        method: 'bubble',
        length: 25,
        nums: [],
        speed: 50
    }

    function newArray () {
        controls.nums = generateNums()
        drawNums()
        updateComparisions(0)
        updateTime(0)
    }

    function generateNums () {
        const unique = new Set()
        while (unique.size < controls.length) {
            unique.add(Math.floor(Math.random() * controls.length) + 1)
        }
        return [...unique]
    }

    function drawDropdown () {
        const algos = ['bubble', 'insertion', 'merge', 'selection']
        const $select = $("<select>").attr("id", "algo-select").addClass("uppercase")
        for (let algo of algos) {
            const $option = $("<option>").attr("value", algo).text(algo)
            $select.append($option)
        }
        $select.on('change', event => controls.method = event.target.value)
        $("body").prepend($select)
    }

    function drawNums () {
        $container.empty()
        let width = ($container.width() - 10) / controls.length
        for (let i = 0; i < controls.length; i++) {
            const $div = $("<div>").addClass("idle segment").width(width).height(($container.height() / controls.length) * controls.nums[i]).attr("id", controls.nums[i])
            $container.append($div)
        }
    }

    function drawStats () {
        const $statsContainer = $("<div>").attr("id", "stats-container").addClass("uppercase")
        const $comparisons = $("<div>").attr("id", "comparisons").html("<div>comparisons</div><div class='counter'>0</div>")
        const $time = $("<div>").attr("id", "time").html("<div>delay</div><div><span class='counter'>50</span><span id='ms'>ms</span></div>")
        $statsContainer.append($comparisons).append($time)
        $statsContainer.insertAfter($("#sort-container"))
    }

    function handleSlideChange (event) {
        const name = event.target.name
        const value = parseInt(event.target.value)
        if (name === 'length') {
            controls = {
                ...controls,
                [name]: value
            }
            controls.nums = generateNums()
            drawNums()
        } else {
            const { max } = event.target
            controls = {
                ...controls,
                [name]: max - value
            }
            updateTime(controls[name])
        }
    }


    async function sort() {
        const { method, nums, speed } = controls
        switch(method) {
            case 'bubble':
                bubbleSort(nums, speed)
                break
            case 'insertion':
                insertionSort(nums, speed)
                break
            case 'merge':
                const tools = setUp(nums)
                tools.comparisons = 0
                tools.audio.start()
                await mergeSort(nums, speed, tools)
                tools.audio.stop()
                await finalPass(nums, speed)
                break
            case 'selection':
                selectionSort(nums, speed)
                break
            default:
                break
        }
    }

    function init () {
        $container = $("#sort-container")
        controls.nums = generateNums()
        drawDropdown()
        drawNums()
        drawStats()
    }

    // EVENT LISTENERS
    $("#sort-btn").on("click", sort)
    $("#new-arr-btn").on("click", newArray)
    $("#inputs-container input").on("change", event => handleSlideChange(event))
    document.addEventListener('DOMContentLoaded', init)
})()