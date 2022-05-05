music.setBuiltInSpeakerEnabled(true)

let pixels = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
]

let cursor = [0, 0]
let showCursor = true

input.onGesture(Gesture.TiltLeft, function () {
    if (cursor[1] > 0) {
        cursor[1]--
        music.playTone(Note.C5, 20)
    }
})

input.onGesture(Gesture.TiltRight, function () {
    if (cursor[1] < 4) {
        cursor[1]++
        music.playTone(Note.C5, 20)
    }
})

input.onGesture(Gesture.LogoDown, function () {
    if (cursor[0] > 0) {
        cursor[0]--
        music.playTone(Note.C5, 20)
    }
})

input.onGesture(Gesture.LogoUp, function () {
    if (cursor[0] < 4) {
        cursor[0]++
        music.playTone(Note.C5, 20)
    }
})

function plot() {
    for (let rowNo = 0; rowNo < pixels.length; rowNo++) {
        for (let pixelNo = 0; pixelNo < pixels[rowNo].length; pixelNo++) {
            led.plotBrightness(pixelNo, rowNo, pixels[rowNo][pixelNo])
        }
    }
}

control.inBackground(function () {
    while (true) {
        plot()
        if (showCursor) {
            if (pixels[cursor[0]][cursor[1]] > 127) {
                led.plotBrightness(cursor[1], cursor[0], pixels[cursor[0]][cursor[1]])
                basic.pause(150)
                led.plotBrightness(cursor[1], cursor[0], 0)
                basic.pause(150)
            } else {
                led.plotBrightness(cursor[1], cursor[0], 255)
                basic.pause(150)
                led.plotBrightness(cursor[1], cursor[0], pixels[cursor[0]][cursor[1]])
                basic.pause(150)
            }
        }
        basic.pause(100)
    }
})

input.onButtonPressed(Button.A, function () {
    if (pixels[cursor[0]][cursor[1]] > 0) {
        pixels[cursor[0]][cursor[1]] -= 32
        music.playTone(Note.C5, 20)
    }
})

input.onButtonPressed(Button.B, function () {
    if (pixels[cursor[0]][cursor[1]] < 255) {
        pixels[cursor[0]][cursor[1]] += 32
        music.playTone(Note.C5, 20)
    }
})

input.onButtonPressed(Button.AB, function () {
    showCursor = !showCursor
    music.playTone(Note.C5, 20)
})