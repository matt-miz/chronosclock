input.onButtonPressed(Button.A, function () {
    RTC_DS1307.DateTime(
    RTC_DS1307.getTime(RTC_DS1307.TimeType.YEAR),
    RTC_DS1307.getTime(RTC_DS1307.TimeType.MONTH),
    RTC_DS1307.getTime(RTC_DS1307.TimeType.DAY),
    RTC_DS1307.getTime(RTC_DS1307.TimeType.HOUR),
    RTC_DS1307.getTime(RTC_DS1307.TimeType.MINUTE) + 1 * clock_button_direction,
    0
    )
})
input.onButtonPressed(Button.AB, function () {
    clock_button_direction = clock_button_direction * -1
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "disco") {
        if (mode == 0) {
            mode = 1
            strip.showRainbow(1, 360)
            strip.show()
        } else {
            mode = 0
        }
    }
})
input.onButtonPressed(Button.B, function () {
    RTC_DS1307.DateTime(
    RTC_DS1307.getTime(RTC_DS1307.TimeType.YEAR),
    RTC_DS1307.getTime(RTC_DS1307.TimeType.MONTH),
    RTC_DS1307.getTime(RTC_DS1307.TimeType.DAY),
    RTC_DS1307.getTime(RTC_DS1307.TimeType.HOUR) + 1 * clock_button_direction,
    RTC_DS1307.getTime(RTC_DS1307.TimeType.MINUTE),
    0
    )
})
function colour_range_new (pixel: number, width: number, colour: number) {
    index = 0
    while (index <= width) {
        p1 = (pixel + index + 60) % 60
        p2 = (pixel - index + 60) % 60
        strip.setPixelColor(p1, colour)
        strip.setPixelColor(p2, colour)
        index = index + 1
    }
    strip.show()
}
let brightness = 0
let p2 = 0
let p1 = 0
let index = 0
let mode = 0
let strip: neopixel.Strip = null
let clock_button_direction = 0
clock_button_direction = 1
strip = neopixel.create(DigitalPin.P1, 60, NeoPixelMode.RGB)
radio.setGroup(21)
mode = 0
OLED12864_I2C.init(60)
loops.everyInterval(1000, function () {
    if (mode == 0) {
        strip.clear()
        if (RTC_DS1307.getTime(RTC_DS1307.TimeType.HOUR) > 23 || RTC_DS1307.getTime(RTC_DS1307.TimeType.HOUR) < 6) {
            brightness = 50
        } else {
            brightness = 255
        }
        colour_range_new(RTC_DS1307.getTime(RTC_DS1307.TimeType.HOUR) * 5 + Math.floor(RTC_DS1307.getTime(RTC_DS1307.TimeType.MINUTE) / 12), 2, neopixel.rgb(0, 0, brightness))
        colour_range_new(RTC_DS1307.getTime(RTC_DS1307.TimeType.MINUTE), 1, neopixel.rgb(0, brightness, 0))
        colour_range_new(RTC_DS1307.getTime(RTC_DS1307.TimeType.SECOND), 0, neopixel.rgb(brightness, 0, 0))
        strip.show()
        OLED12864_I2C.clear()
        OLED12864_I2C.showString(
        0,
        0,
        "" + RTC_DS1307.getTime(RTC_DS1307.TimeType.HOUR) + ":" + RTC_DS1307.getTime(RTC_DS1307.TimeType.MINUTE) + ":" + RTC_DS1307.getTime(RTC_DS1307.TimeType.SECOND),
        1
        )
        OLED12864_I2C.draw()
    }
})
basic.forever(function () {
    if (mode == 1) {
        strip.rotate(1)
        strip.show()
    }
})
