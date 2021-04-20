import { bubbleSort } from "./algos.js";
import {
    updateComparisions,
    updateTime
} from './ui.js'

(function() {
    let $container, controls = {
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
        const $time = $("<div>").attr("id", "time").html("<div>time</div><div class='counter'>0</div>")
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
            controls = {
                ...controls,
                [name]: 100 - value
            }
        }
    }

    async function sort(method = 'bubble') {
        switch(method) {
            case 'bubble':
                bubbleSort(controls.nums, controls.speed)
                break
            case 'insertion':
                console.log('Sorting: ', method)
                break
            case 'merge':
                console.log('Sorting: ', method)
                break
            case 'selection':
                console.log('Sorting: ', method)
                break
            default:
                console.log('Sorting: ', method)
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
    $("#sort-btn").on("click", () => sort('bubble'))
    $("#new-arr-btn").on("click", newArray)
    $("#inputs-container input").on("change", event => handleSlideChange(event))
    document.addEventListener('DOMContentLoaded', init)
})()