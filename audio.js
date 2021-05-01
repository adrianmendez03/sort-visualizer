const context = new AudioContext()

export function createFreq (value, length) {
    return (value * (1000 / length)) + 130
}

export const audioObj = {
    audio: context.createOscillator(),
    gainNode: context.createGain()
}

audioObj.gainNode.gain.value = .25
audioObj.audio.type = "sine", audioObj.audio.connect(audioObj.gainNode).connect(context.destination)