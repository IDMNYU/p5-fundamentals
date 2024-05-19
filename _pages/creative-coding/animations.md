---
title: Animations
---
## Frames

We've seen this basic p5.js structure many times now:
```js
function setup() {
  // run this once
}

function draw() {
  // run this over and over and over
}
```

Just to reiterate what p5.js does with this code: all of the commands inside the `setup()` function run just once. This is where we setup the canvas size, maybe set initial values to some variables, draw the background for the first time, set up any of the drawing modes, like [`rectMode`](https://p5js.org/reference/#/p5/rectMode), [`colorMode`](https://p5js.org/reference/#/p5/colorMode), etc.

After the `setup()` function runs, p5.js takes our `draw()` function and runs all the commands that are inside of it over and over and over again, at a specific rate. For most of the code we have run so far we haven't noticed this re-draw because we draw the same shapes every time the `draw()` function runs.

How often the `draw()` function runs will depend on many things, but for most browsers and displays it will be either $$30$$ times per second or $$60$$ times per second. This is referred to as the frame rate and sometimes these values are given as $$30$$ *fps* or $$60$$ *fps*, where *fps* stands for *frames per second*. $$30$$ and $$60$$ *fps* are common refresh rates on monitors and they are fast enough that we can use consecutive re-draws to draw animations without our eyes noticing jumps or discontinuities.

We can call each execution of `draw()` a frame, and by varying positions, sizes and colors slightly between frames we can create animations.

*Animations?* Yeah!

If, instead of drawing a circle at the exact same location every time `draw()` executes, we use a variable to change its position, we can make it move!

{% include p5-editor.html id="9dPEc2s6U" %}

Let's play around a little bit with this concept... what if we only draw the background once, but keep drawing ellipses every frame ?

{% include p5-editor.html id="3RlxW-PnB" %}

Or, what if instead of drawing a fully opaque background, we add a little alpha to our color?

{% include p5-editor.html id="Jp6EWlbVr" %}

Cooool !!!

## Frame Count

Instead of using a variable called `xPos` we could have called the p5.js variable [`frameCount`](https://p5js.org/reference/#/p5/frameCount). This variable keeps track of how many times the `draw()` function has executed and can be easily used for creating animations:

{% include p5-editor.html id="pj861WPhB" %}

At each frame we are redrawing the ellipse, but before redrawing we are rotating our canvas by `frameCount` degrees: the first frame it rotates by $$0^\circ$$, the second time by $$1^\circ$$, then $$2^\circ$$, then $$3^\circ$$, etc, and when we see all these frames one after the other we perceive it as an animated ellipse rotating.

Since the `frameCount` variable just keeps growing and growing it's very easy to use it for something like this because rotations are "cyclic", they repeat after $$360^\circ$$. Also note that we are using the `radians()` function because `rotate()` expects angles in radians and if we just gave `rotate()` our `frameCount` it would rotate really fast. Try it!!

Let's go back to our circle example:

{% include p5-editor.html id="9dPEc2s6U" %}

Play with the value that determines the speed of the circle in the sketch above ☝️ and figure out how to make it move faster. As it moves faster, do we lose the impression of an animation at any point?

## Setting Boundaries

Now, what if we don't want it to go away, and instead have it bounce back once it hits the edge of our canvas?

We'll add a variable to keep track of our position and direction, and every frame, after we increment the position of our circle, we could check if its position has gotten bigger than the canvas `width` and if necessary, change its direction:

{% include p5-editor.html id="jbsoIwGTJ" %}

Our circle is disappearing on the left side of the screen now. We can fix that the same way we fixed the right side:

{% include p5-editor.html id="jUJYxGWG5" %}

Let's just clean this up a little bit, and refactor the `xDir` variable to actually hold our velocity. The code stays the same, because the logic is the same, but the variable name is just a little more meaningful and we now know we can use it to control the velocity of our ellipse: a positive velocity means its moving to the right and a negative velocity means its moving to the left.

{% include p5-editor.html id="TCVCAwXJ_" %}

Looking at the logic, we can actually simplify it by just detecting when it gets to either edge, and flipping the `xVel`:

{% include p5-editor.html id="lfNvl4-cY" %}

Almost perfect. The circle only changes direction when its center goes beyond the canvas, not its edge. Let's put the circle radius in a variable and use that to detect when the circle hits the end of the canvas:

{% include p5-editor.html id="mHwD47zud" %}

We now have a simple, infinite, animation using our `draw()` loop.

## More Animation Dimensions

Both the `mod(%)` operator and `map()` function that we looked at [here](../maths/) can be really useful when doing animation.

We can use the `map()` function to create an animation based on time. In this example we map the seconds that have passed in the current minute of time to the diameter of a circle. We know seconds has a range $$[0, 59]$$, so it's just a matter of choosing the smallest and largest values for the diameter.

In addition to mapping $$[0, 59] \rightarrow [20, width]$$ for the diameter, we can also map the seconds value to the amount of green in our `fill()` color. We know each of the $$3$$ color parameters has a maximum value of $$255$$, and if we always want a bit of green in our color we can map $$[0, 59] \rightarrow [128, 255]$$:

{% include p5-editor.html id="p84wngLLR" %}

We can add other elements to this by also mapping the milliseconds amount to a different ellipse's diameter. We unfortunately don't have a function that gives us the current time's milliseconds, but [`millis()`](https://p5js.org/reference/#/p5/millis) gives us the number of milliseconds that have elapsed since we started our sketch. It keeps growing, so we'll use `mod(%)` to keep it between $$[0, 999]$$.

Then, instead of mapping $$[0, 999] \rightarrow [20, width]$$, we'll map this value to be between the other ellipse's diameter and `width`, so $$[0, 999] \rightarrow [secondDiam, width]$$.

This should give us an interesting effect:

{% include p5-editor.html id="NYoIU_AED" %}

We can also use [`for()` loops](../../p5/counters/), [arrays](../../p5/arrays/) and [objects](../../p5/objects/) to create some pretty abstract animations.

We'll create an array of line objects. Each line has an `x` location, a length `l` and a velocity `v`.

At each frame we update every line's length using its velocity, and make sure to wrap back to $$0$$ when it grows bigger than the canvas `height`.

{% include p5-editor.html id="Wbad1kY5q" %}
