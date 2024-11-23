def on_button_pressed_a():
    RTC_DS1307.date_time(RTC_DS1307.get_time(RTC_DS1307.TimeType.YEAR),
        RTC_DS1307.get_time(RTC_DS1307.TimeType.MONTH),
        RTC_DS1307.get_time(RTC_DS1307.TimeType.DAY),
        RTC_DS1307.get_time(RTC_DS1307.TimeType.HOUR),
        RTC_DS1307.get_time(RTC_DS1307.TimeType.MINUTE) + 1 * clock_button_direction,
        0)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    global clock_button_direction
    clock_button_direction = clock_button_direction * -1
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    RTC_DS1307.date_time(RTC_DS1307.get_time(RTC_DS1307.TimeType.YEAR),
        RTC_DS1307.get_time(RTC_DS1307.TimeType.MONTH),
        RTC_DS1307.get_time(RTC_DS1307.TimeType.DAY),
        RTC_DS1307.get_time(RTC_DS1307.TimeType.HOUR) + 1 * clock_button_direction,
        RTC_DS1307.get_time(RTC_DS1307.TimeType.MINUTE),
        0)
input.on_button_pressed(Button.B, on_button_pressed_b)

def colour_range_new(pixel: number, width: number, colour: number):
    global p1, p2, index
    while index < width:
        p1 = (pixel + index + 60) % 60
        p2 = (pixel - index + 60) % 60
        strip.set_brightness(100 - 30 * index)
        strip.set_pixel_color(p1, colour)
        strip.set_pixel_color(p2, colour)
        index = index + 1
    strip.show()
minute = 0
hour = 0
p2 = 0
p1 = 0
index = 0
strip: neopixel.Strip = None
clock_button_direction = 1
strip = neopixel.create(DigitalPin.P1, 60, NeoPixelMode.RGB)

def on_every_interval():
    global hour, minute
    strip.clear()
    hour = RTC_DS1307.get_time(RTC_DS1307.TimeType.HOUR)
    minute = RTC_DS1307.get_time(RTC_DS1307.TimeType.MINUTE)
    colour_range_new(hour * 5 + Math.floor(minute / 12),
        2,
        neopixel.colors(NeoPixelColors.BLUE))
    colour_range_new(minute, 1, neopixel.colors(NeoPixelColors.GREEN))
    colour_range_new(RTC_DS1307.get_time(RTC_DS1307.TimeType.SECOND),
        0,
        neopixel.colors(NeoPixelColors.RED))
    strip.show()
loops.every_interval(1000, on_every_interval)
