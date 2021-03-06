import { 
    bubbleSort,
    insertionSort,
    mergeSort,
    selectionSort,
    finalPass
} from "./algos.js";
import {
    updateComparisions,
    updateTime
} from './ui.js'
import { audioObj, createContext } from './audio.js'

(function() {
    let $container, 
    $mute,
    sortControls = {
        method: 'bubble',
        length: 25,
        nums: [],
        speed: 50
    },
    audioControls = {
        mute: false,
        type: "sine"
    }

    function newArray () {
        sortControls.nums = generateNums()
        drawNums()
        updateComparisions(0)
    }

    function generateNums () {
        const unique = new Set()
        while (unique.size < sortControls.length) {
            unique.add(Math.floor(Math.random() * sortControls.length) + 1)
        }
        return [...unique]
    }

    function drawDropdown () {
        const algos = ['bubble', 'insertion', 'merge', 'selection']
        const $label = $("<label>").attr("for", "algos")
        const $select = $("<select>").attr("id", "algo-select").attr("name", "algos").addClass("uppercase")
        for (let algo of algos) {
            const $option = $("<option>").attr("value", algo).text(algo)
            $select.append($option)
        }
        $select.on('change', event => {
            sortControls.method = event.target.value
            newArray()
        })
        $("header").append($label).append($select)
    }

    function drawNums () {
        $container.empty()
        console.log($container.height())
        let width = ($container.width() - 10) / sortControls.length
        for (let i = 0; i < sortControls.length; i++) {
            const $div = $("<div>").addClass("idle segment").width(width).height(($container.height() / sortControls.length) * sortControls.nums[i]).attr("id", sortControls.nums[i])
            $container.append($div)
        }
    }

    function drawStats () {
        const $statsContainer = $("<div>").attr("id", "stats-container").addClass("uppercase")
        const $comparisons = $("<div>").attr("id", "comparisons").html("<div>comparisons</div><div class='counter'>0</div>")
        const $time = $("<div>").attr("id", "time").html("<div>delay</div><div><span class='counter'>50</span><span id='ms'>ms</span></div>")
        $statsContainer.append($comparisons).append($time)
        $("#sort-display").append($statsContainer)
    }

    function handleSlideChange (event) {
        const name = event.target.name
        const value = parseInt(event.target.value)
        if (name === 'length') {
            sortControls = {
                ...sortControls,
                [name]: value
            }
            sortControls.nums = generateNums()
            drawNums()
        } else {
            const { max } = event.target
            sortControls = {
                ...sortControls,
                [name]: max - value
            }
            updateTime(sortControls[name])
        }
    }

    function muteToggle () {
        if (audioControls.mute) {
            $mute.removeClass("on")
            $mute.addClass("off")
        } else {
            $mute.removeClass("off")
            $mute.addClass("on")
        }

        audioControls.mute = audioControls.mute ? false : true

        if (audioObj.context) {
            audioObj.gainNode.gain.value = audioControls.mute ? 0 : .10
        }
    }

    function addFunctionality () {
        $("#sort-btn").on("click", sort)
        $("#new-arr-btn").on("click", newArray)
        $("#length").prop("disabled", false)
        $("#speed").prop("disabled", false)
        $("#algo-select").prop("disabled", false)
    }

    function removeFunctionality () {
        $("#sort-btn").off()
        $("#new-arr-btn").off()
        $("#length").prop("disabled", true)
        $("#speed").prop("disabled", true)
        $("#algo-select").prop("disabled", true)
    }

    async function sort() {
        const { method, nums, speed } = sortControls
        createContext(audioControls)
        removeFunctionality()
        switch(method) {
            case 'bubble':
                await bubbleSort(nums, speed)
                break
            case 'insertion':
                await insertionSort(nums, speed)
                break
            case 'merge':
                const tools = {
                    comparisons: 0,
                    length: nums.length
                }
                await mergeSort(nums, speed, tools)
                break
            case 'selection':
                await selectionSort(nums, speed)
                break
            default:
                break
        }
        await finalPass(nums, speed)
        audioObj.context.close()
        addFunctionality()
    }

    function init () {
        $container = $("#sort-container")
        $mute = $("#mute")
        sortControls.nums = generateNums()
        drawDropdown()
        drawNums()
        drawStats()
        addFunctionality()
    }

    // EVENT LISTENERS
    $("#inputs-container input").on("change", event => handleSlideChange(event))
    $("#mute").on("click", event => muteToggle(event))
    window.addEventListener('resize', drawNums)
    document.addEventListener('DOMContentLoaded', init)
})()