---
title: Lights
---
## Prerequisites

This mini-project draws on materials from:

- [Shapes and Colors](../../p5/drawing/)
- [Variables](../../p5/variables/)
- [Maths](../../p5/maths/)
- [Classes](../../p5/classes/)
- [Interactions](../../creative-coding/interactions/)
- [Animations](../../creative-coding/animations/)
- [Noise](../../creative-coding/more-random/)
- [Sine & Cosine](../../creative-coding/sincos/)
- [Trigonometry and Vectors](../../creative-coding/vectors/)

## Point Sources

In this mini-project we are going to use what we learned about [vectors and trigonometry](../../creative-coding/vectors/) to see how to implement some simple light effects.

This is usually done in a slightly different way in video games, large 3D scenes and virtual environments, but some of the logic is similar and trigonometry is always involved.

Let's start with a simple example of a point source, placed in the center of our canvas, that radiates light equally in all directions. Pixels closer to the center will be brighter and pixels further away will be darker.

<div class="scaled-images left w75">
  <img src = "{{ '/assets/images/projects/lights-00.jpg' | relative_url }}"/>
</div>

Our initial intuition might be to code something that iterates over pixels starting in the center of the canvas, coloring in pixels as it moves towards the edges. This could work, but because we want our solution to be generic and eventually work with multiple light sources, it's actually more efficient and easier to code if we just iterate over the entire canvas and select colors based on distances from the light source.

Since calculating colors for every single pixel is a bit too much work for most browsers, let's use a parameter to define a grid.

For every point in our grid, we'll calculate its distance from the center and use `map()` to pick a color that scales linearly with this distance. Points in the center, with a distance close to $$0$$ will have light values close to $$255$$, and points that are far from the center will have a color value of $$0$$.

{% include p5-editor.html id="67bpLFuvP" %}

This works. We get a nice soft glow effect that almost makes our light source look like a sphere.

We can already see the potential for reorganizing this code using variables for a couple of its parameters, like position, maximum distance, color, etc.

We'll use fixed values for position and magnitude (how far the light extends), but let's use a color that's not white.

We'll use `map()` to scale the distance between each pixel and our light's center to be a value between $$0$$ and $$1$$. We can pass a sixth argument to the `map()` function to tell it to *clamp* the return value so it's guarantee to be within our output range. In our case, we want any values beyond the `mMag` value to just be considered a $$1$$.

Once we have a value that maps distances from our light source to values between $$0$$ and $$1$$, we can use the [`lerpColor()`](https://p5js.org/reference/#/p5/lerpColor) function to pick color values that go from our full color to $$0$$.

{% include p5-editor.html id="4jfW3bt_E" %}

Change `mColor`, `mMag` and `mPos` above ☝️ to see how each of them affects the output.

Let's continue to refactor this code and put our logic inside a class, so we can prepare to have multiple light sources.

Our class will have a constructor for setting initial light parameters, a `set()` function for setting its position, and a `get()` function to return the color value at a given location on our canvas.

We can even attach our light to the mouse position.

{% include p5-editor.html id="mI7btHVoR" %}

There are a couple of things we can experiment with.

## Easing

First, different radiance functions.

Our light has a linear brightness function right now, meaning that the color of any given pixel is directly proportional to its distance from the light. That's not really how lights work. Instead of `map()` we can use a different [easing function](https://easings.net/) to get a value between $$0$$ and $$1$$ that has a more complex relationship with distance.

We'll continue to use `map()` to scale the distance value from $$[0, mag]$$ to $$[0, 1]$$, but then we'll use some nonlinear functions to change how quickly this relative distance value between $$[0, 1]$$ goes from light to dark.

`EaseIn` functions change more abruptly towards the end of their range, so they'll create light sources that have a brighter center. `EaseOut` functions change more quickly in the beginning, so they'll fade to black sooner.

And since now we have multiple light sources, we'll use a function to add their individual contributions to the overall pixel color:

```js
function addColors(c0, c1) {
  return color(red(c0) + red(c1), green(c0) + green(c1), blue(c0) + blue(c1));
}
```

{% include p5-editor.html id="NDUwDvrt5" %}

The second thing we could do is add a bit of a glow animation to our light.

We can use the `sin()` function to create a `glow` parameter with a period of $$1500$$ milliseconds and add it to the `mag` value of our light to make it seem like it's pulsating:

```js
let glow = sin(TWO_PI / 1500 * millis());
```

{% include p5-editor.html id="JnB8OMaWS" %}

Neat ! 🍸

Let's move the logic for adding two colors inside our light class. We'll add an optional parameter to our `get()` function, that, when present, gets added to the color being returned.

It's easier to test and see how colors get added now:

{% include p5-editor.html id="JKtHdE0Vx" %}

Just one last thing, let's have some lights with movement.

We'll use polar coordinates and `noise()` to create some circular paths for our lights, and see how they interact.

{% include p5-editor.html id="8bBBb6ZxH" %}


## Points and Lines

What if we want light sources that aren't points? Like a light-saber or a laser beam?

We can use a very similar strategy, but now we'll have to calculate distances between the pixels on our canvas and a line, instead of a point.

It turns out the shortest distance between a point and a line is along a perpendicular path that joins the point to the line. It's the distance $$d$$ between $$(X, Y)$$ and the line $$y = \frac{m}{n}x + b$$ on the drawing below:

<div class="scaled-images left w75">
  <img src = "{{ '/assets/images/projects/lights-01.jpg' | relative_url }}"/>
</div>

There are many ways to derive the equation for this distance. The one in the drawing involves using distances from another point $$(X_0, Y_0)$$, also on the line, to the original point and to a point $$(X_0+m, Y_0-n)$$ that is perpendicular to the line. The final distance equation is:

$$d = \frac{\left|mX - nY + bn\right|}{\sqrt{m^2 + n^2}}$$

Again, the details of how this is derived are not super important. We should just know that it can be calculated, and that the equation is here on this page whenever we need it.

Now that we know how to measure this distance it, we can use it to calculate color values for every point in our canvas based on how far they are from the line. Since doing this for every single pixel would be too much work for our browsers, let's work with a canvas that's divided into 64 x 64 squares:

{% include p5-editor.html id="Q2mlRpMIo" %}

## Using Vectors

We can use vectors to calculate this distance to a line. The code remains mostly the same, and it looks just as complicated, but in reality it uses some of the properties of vectors to make the calculation a little more geometric instead of algebraic, which can help remember how to derive the formula at a later time.

Again, we don't have to worry about the details for this, just know where it it and how to use it.

We first define a line object with parameters for its equation in the form: $$y = mx + b$$. We then use these parameters to create a vector that is perpendicular to this line, so we can project our original vector onto this perpendicular vector.

And just like that, we get the distance.

{% include p5-editor.html id="mqShzRx7C" %}

## Light Saber Party

Now that we know about [classes](../../p5/classes/), we can even create a class for lines with equation $$y = mx+b$$ and keep all of the math for calculating distances inside the class:

{% include p5-editor.html id="YI2E4ithx" %}

This is one of the great things about classes: once we have the math for something figured out, we can always wrap it inside a class that will use it to update an object's shape, color, position, etc, and then we can have $$10$$ or $$100$$ of these objects by just creating new instances from our class definition.

For example, we can move the color info inside our object, call it a `LightLine` class and use it to create a couple of lights in our canvas:

{% include p5-editor.html id="DSmK_Y5pK" %}

And now, automate some slope changes over time, sit back and enjoy a low-fi, pixel light show:

{% include p5-editor.html id="EjqQv0gjl" %}
