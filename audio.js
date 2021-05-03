let context 

export let audioObj = {}

export function createContext (controls) {
    context = new AudioContext()
    audioObj = {
        context,
        audio: context.createOscillator(),
        gainNode: context.createGain()
    }
    audioObj.audio.start()
    audioObj.gainNode.gain.value = controls.mute ? 0 : .10
    audioObj.audio.type = controls.type
    audioObj.audio.connect(audioObj.gainNode).connect(context.destination)
}

export function setUpAudio (audio) {
    
}

export function createFreq (value, length) {
    return (value * (1000 / length)) + 130
}



