(function() {
    let canvas, ctx, bottom, nums = generateNums()

    function generateNums () {
        const unique = new Set()
        while (unique.size < 10) {
            unique.add(Math.floor(Math.random() * 10) + 1)
        }
        return [...unique]
    }

    function createGrid () {
        const step = 50

        const width = canvas.width
        const height = canvas.height

        ctx.save()
        ctx.strokeStyle = 'gray'
        ctx.fillStyle = 'black'
        ctx.font = '14px Monospace'
        ctx.lineWidth = 0.35

        for (let y = 0; y < height; y += step) {
            ctx.beginPath()
            ctx.moveTo(0, y)
            ctx.lineTo(width, y)
            ctx.stroke()

            ctx.fillText(y, 0, y)
        }
    }

    function drawNums () {
        for (let i = 0; i < nums.length; i++) {
            ctx.fillRect(25 + (55 * i),  bottom - 30, 50, -50 * nums[i])
        }
    }

    function resizeCanvas () {
        bottom = window.screen.height - 200
        canvas.width = window.screen.width
        canvas.height = bottom
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