import { 
    bubbleSort
} from "./algos.js";
import {
    updateComparisions,
    updateTime
} from './ui.js'

(function() {
    let $container,
        $body,
        step = 10, 
        max = 25, 
        nums = generateNums()

    function newArray () {
        nums = generateNums()
        drawNums()
        updateComparisions(0)
        updateTime(0)
    }

    function generateNums () {
        const unique = new Set()
        while (unique.size < max) {
            unique.add(Math.floor(Math.random() * max) + 1)
        }
        return [...unique]
    }

    function drawDropdown () {
        const algos = ['bubble', 'insertion', 'merge', 'selection']
        const $select = $("<select>").attr("id", "algo-select")
        for (let algo of algos) {
            const $option = $("<option>").attr("value", algo).text(algo)
            $select.append($option)
        }
        $("body").prepend($select)
    }

    function drawNums () {
        $container.empty()
        let width = Math.floor(($container.width() - 25) / max)
        const gap = (width * 0.05) + 'px'
        for (let i = 0; i < nums.length; i++) {
            const $div = $("<div>").addClass("idle segment").width(width).height(step * nums[i]).css("margin", "0" + gap).attr("id", nums[i])
            $container.append($div)
        }
    }

    function drawStats () {
        const $statsContainer = $("<div>").attr("id", "stats-container")
        const $comparisons = $("<span>").attr("id", "comparisons").text("comparisons: ")
        const $time = $("<span>").attr("id", "time").text("time: ")
        $statsContainer.append($comparisons).append($time)
        $statsContainer.insertAfter($("#sort-container"))
    }

    async function sort(method = 'bubble') {
        switch(method) {
            case 'bubble':
                console.log('Sorting: ', method)
                bubbleSort(nums)
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
        drawDropdown()
        drawNums()
        drawStats()
    }

    // EVENT LISTENERS
    $("#sort-btn").on("click", () => sort('bubble'))
    $("#new-arr-btn").on("click", newArray)
    document.addEventListener('DOMContentLoaded', init)
})()