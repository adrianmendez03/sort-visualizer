(function() {
    let canvas, ctx, step, max = 25, nums = generateNums()

    function generateNums () {
        const unique = new Set()
        while (unique.size < max) {
            unique.add(Math.floor(Math.random() * max) + 1)
        }
        return [...unique]
    }

    function createGrid () {

        const width = canvas.width
        const height = canvas.height

        step = height / max

        ctx.save()
        ctx.strokeStyle = 'gray'
        ctx.fillStyle = 'black'
        ctx.font = '14px Monospace'
        ctx.lineWidth = 0.35

        for (let y = 0; y <= max; y++) {
            ctx.beginPath()
            ctx.moveTo(0, y * step)
            ctx.lineTo(width, y * step)
            ctx.stroke()
            ctx.fillText(y, 0, y * step)
        }
    }

    function drawNums () {
        let width = Math.floor((canvas.width - 25) / max)
        const gap = width * 0.01
        for (let i = 0; i < nums.length; i++) {
            ctx.fillRect(25 + (width) * i,  0, width - gap, step * nums[i])
        }
    }

    function resizeCanvas () {
        canvas.width = window.innerWidth
        canvas.height = 500
        createGrid()
    }

    function init () {
        canvas = document.getElementById('canvas')
        ctx = canvas.getContext('2d')
        resizeCanvas()
        createGrid()
        drawNums()
    }

    document.addEventListener('DOMContentLoaded', init)
    window.addEventListener('resize', resizeCanvas)
})()