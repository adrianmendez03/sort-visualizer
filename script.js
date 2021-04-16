import { bubbleSort } from "./algos.js";

(function() {
    let $container, 
        $sortBtn,
        step = 15, 
        max = 25, 
        nums = generateNums()

    function generateNums () {
        const unique = new Set()
        while (unique.size < max) {
            unique.add(Math.floor(Math.random() * max) + 1)
        }
        return [...unique]
    }

    function drawNums () {
        let width = Math.floor(($container.width() - 25) / max)
        const gap = (width * 0.05) + 'px'
        for (let i = 0; i < nums.length; i++) {
            const $div = $("<div>").addClass("idle segment").width(width).height(step * nums[i]).css("margin", "0" + gap).attr("id", nums[i])
            $container.append($div)
        }
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
        $sortBtn = $("#sort-btn").on("click", () => sort('bubble'))
        drawNums()
    }

    document.addEventListener('DOMContentLoaded', init)
})()