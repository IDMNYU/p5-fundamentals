---
title: "Maths: mod and map"
---
## Boundary Conditions

Now that we know how to set up animations using the `draw()` cycle, and also detect user input using event functions, we'll very often find ourselves having to deal with *boundary conditions*. Boundary conditions sometimes involve physical boundaries on our canvas, like, detecting and deciding what to do when a shape moves beyond our screen boundary, Other times, these boundary conditions involve setting limits for the minimum and maximum values a variable can have.

## Mod



## Tying Variables Together

It's not uncommon to want to use a value read or generated in one part of your program to control the physical properties of objects in other parts of your program. This is how we can create drawings that are reactive to user input, or animations that vary according to data that comes from a sensor or from a database somewhere on the internet.

In these situations, we will have to define relationships between our *input* signals and the parameters we want to use for our *output*. And very often the input signals and output parameters don't even have the same ranges, units or data types. For example, we might want to convert temperatures measured in `Celsius` to circle diameters in `pixels`, or the passage of time measured in `seconds` to a fill color especified in `RGB`.

Let's look at an example.

This is a sketch that draws a circle at `(mouseX, mouseY)` and sets the circle diameter to be equal to the `mouseY` value: the further down the canvas, the bigger the circle; the circle is almost not visible when the mouse is near the top of the canvas, and, likewise, it's kind of too big when it's at the very bottom.

{% include p5-editor.html id="RcUoHjoJz" %}

One way to make this a bit more controllable is to set a `maxDiameter` variable and then calculate the actual diameter as a percentage of this value based on the mouse position:

$$diameter = \frac{mouseY}{height} \times maxDiameter$$

The $$\frac{mouseY}{height}$$ term is the location of the mouse as a percentage of the canvas height: it goes from $$0\%$$ when `mouseY` is $$0$$, to $$100\%$$ when `mouseY` is equal to `height`.

We can now use this to set the diameter:

{% include p5-editor.html id="ONb2xFJqu" %}

And we can do something similar if we want to set a minimum value for the circle diameter:

$$diameter = \frac{mouseY}{height} \times (maxDiameter - minDiameter) + minDiameter$$

The $$(maxDiameter - minDiameter)$$ term is the magnitude of our output (how much it's allowed to vary), and multiplying it by $$\frac{mouseY}{height}$$ gives us how far along this magnitude our output should be. We still have to add the $$minDiameter$$ term to make sure our output is in the range $$[minDiameter, maxDiameter]$$:

{% include p5-editor.html id="-lhWT-K5U" %}

We have just created a very precise relationship that sets our circle's diameter based on an input signal.

## Map

Let's say that now we want to have the logic reversed: larger circle at the top of the screen, and smaller circle at the bottom. We could use this logic:

```js
let mDiamInv = (mouseY / height) * (maxDiam - minDiam) + minDiam;
let mDiam = maxDiam - mDiamInv + minDiam;
```

{% include p5-editor.html id="tNOf62UFa" %}

The logic for calculating the circle diameter is getting a bit complicated...

This is where [`map()`](https://p5js.org/reference/#/p5/map) comes in. It's a function that maps a value from one range to another.

If we want to map the value of `mouseY` from `height` values to `diameter` values, $$[0, height] \rightarrow [40, 200]$$, we can just write:

```js
let mDiam = map(mouseY, 0, height, minDiam, maxDiam);
```

{% include p5-editor.html id="SPem8nNRO" %}

Likewise, if we want to reverse the logic and have larger circle at the top of the screen and smaller circle at the bottom, we just swap `minDiam` and `maxDiam`:

```js
let mDiam = map(mouseY, 0, height, maxDiam, minDiam);
```

{% include p5-editor.html id="5d4Q2aSJ6" %}

## Mapping Between Ranges

[`map()`](https://p5js.org/reference/#/p5/map) is useful in other situations too. Let's say we want to draw evenly spaced vertical lines on our canvas.

We have a `for()` loop that counts from $$0$$ to $$16$$ and with `map()` we can just transform the counter variable to the position we want because we know our counter has a range $$[0, 16]$$ and our line positions will have a range $$[0, width]$$:

{% include p5-editor.html id="_1qLp6Hf4" %}

We can map the same counter to two different output ranges: $$[0, 16] \rightarrow [0, width]$$ and $$[0, 16] \rightarrow [width, 0]$$. The first going from left to right and the other from right to left, as the counter increases:

{% include p5-editor.html id="I-0zfItKy" %}

Using the same counter we can map $$[0, 16] \rightarrow [0, width]$$ and $$[0, 16] \rightarrow [0, \frac{width}{10}]$$:

{% include p5-editor.html id="xI7qrR_jt" %}

Or, with an offset for one of the output ranges, map $$[0, 16] \rightarrow [0, width]$$ and $$[0, 16] \rightarrow [\frac{width}{4}, \frac{width}{3}]$$:

{% include p5-editor.html id="ESNSos3lN" %}

We can even do something where our counter $$[0, 16]$$ gets mapped to *three* different output ranges:

{% include p5-editor.html id="iOMArqVae" %}

## Mapping Between Units

It's also very useful to use the `map()` function if we want to draw time.

In this example we map the seconds value from our computer's clock to the diameter of a circle. We know seconds has a range $$[0, 59]$$, so it's just a matter of choosing the smallest and largest values we want for our diameter.

Let's map $$[0, 59] \rightarrow [20, width]$$ for the diameter, and while we're at it, let's also map the seconds value to the amount of green in our `fill()` color. We know each of the $$3$$ color parameters has a maximum value of $$255$$, and if we always want a bit of green in our color we can map $$[0, 59] \rightarrow [128, 255]$$.

{% include p5-editor.html id="p84wngLLR" %}
