(function() {
    let canvas, ctx

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

    function resizeCanvas () {
        canvas.width = window.screen.width
        canvas.height = window.screen.height
        createGrid()
    }

    function init () {
        canvas = document.getElementById('canvas')
        ctx = canvas.getContext('2d')
        resizeCanvas()
        createGrid()
    }

    document.addEventListener('DOMContentLoaded', init)
    window.addEventListener('resize', resizeCanvas)
})()