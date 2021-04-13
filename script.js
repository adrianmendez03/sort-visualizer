(function() {
    let $container, 
        $sortBtn,
        step = 20, 
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
        const gap = (width * 0.02) + 'px'
        for (let i = 0; i < nums.length; i++) {
            const $div = $("<div>").addClass("idle").width(width).height(step * nums[i]).css("margin", "0" + gap).attr("id", nums[i])
            $container.append($div)
            console.log($div[0].id)
        }
    }

    function sort(method) {
        switch(method) {
            case 'bubble':
                break
            case 'insertion':
                break
            case 'merge':
                break
            case 'selection':
                break
            default:
                break
        }
    }

    function init () {
        $container = $("#sort-container")
        $sortBtn = $("#sort-btn").on("click", sort)
        drawNums()
    }

    document.addEventListener('DOMContentLoaded', init)
})()