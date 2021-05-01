let context 

export let audioObj = {}

export function createContext (mute) {
    context = new AudioContext()
    audioObj = {
        context,
        audio: context.createOscillator(),
        gainNode: context.createGain()
    }
    audioObj.audio.start()
    audioObj.gainNode.gain.value = mute ? 0 : .20
    audioObj.audio.type = "sine" 
    audioObj.audio.connect(audioObj.gainNode).connect(context.destination)
}

export function resumeContext() {
    context.resume()
}

export function createFreq (value, length) {
    return (value * (1000 / length)) + 130
}



