const context = new AudioContext()

export function createFreq (value, length) {
    return (value * (1000 / length)) + 130
}

export function createAudio (value, length) {
    const audio = context.createOscillator()
    const frequency = createFreq(value, length)
    const gainNode = context.createGain()
    gainNode.gain.value = .20
    audio.type = "sine", audio.connect(gainNode).connect(context.destination), audio.frequency.value = frequency
    return audio
}