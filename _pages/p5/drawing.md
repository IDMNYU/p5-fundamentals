---
title: "Drawing: Shapes and Colors"
---

We briefly saw some commands for drawing shapes on our canvas in the [previous section](../p5-intro/), when we looked at the overall organization of a p5.js project.

Let's take a more detailed look at our canvas, the commands we can use for drawing shapes and how to represent colors in our p5.js sketches.

## The Canvas

First, a quick introduction to the canvas.

The canvas is the section of our page where we can actually draw things. There's an actual `html` [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) element on our page that is responsible for displaying our drawings, but we don't have to worry about interacting directly with it. When we use the [`createCanvas()`](https://p5js.org/reference/#/p5/createCanvas) command, p5.js will automatically take care of creating and placing this `<canvas>` element on our page.

The `createCanvas()` command takes two parameters, or, two numbers, that specify a `width` and a `height` for our drawing area. We can always give it specific values in pixels, like: `createCanvas(640, 480)` or `createCanvas(1920, 1080)`, but if we want our canvas to be proportional to our browser window, we can use the special p5.js keywords `windowWidth` and `windowHeight` to make the canvas take up as much space as possible on our page: `createCanvas(windowWidth, windowHeight)`.

We can see the difference by running the following two sketches:

{% include p5-editor.html id="X6r53LRgo" %}

{% include p5-editor.html id="oL9Ziyev4" %}

And, whether our canvas is created with specific pixel dimensions or using `(windowWidth, windowHeight)`, we can always ask p5.js for the exact size of our canvas by accessing the `width` and `height` *variables*.

(clear any cookie warnings and look at the *Console* section after running the sketch below)

{% include p5-editor.html id="qaXGLCGN_" %}

## Coordinate System

Before we start drawing, we just need to understand how the canvas is oriented and how to specify locations within its boundaries.

Just like `createCanvas()` required two numbers, for $$(width, height)$$, to define the size of our canvas, specifying locations on our canvas also requires two numbers, or coordinates, $$(x, y)$$. This is because in p5.js our canvas is a two-dimensional [cartesian plane](https://en.wikipedia.org/wiki/Cartesian_coordinate_system#Two_dimensions), where the first dimension represents the horizontal distance from the origin, and the second dimension the vertical distance. Unlike the traditional cartesian coordinate system from geometry, in p5.js, and most other computer graphics contexts, the origin of our canvas is on the top left corner and the vertical dimension grows downwards.

<div class="scaled-images">
  <img src="{{ '/assets/images/p5/canvas-00.jpg' | relative_url }}">
</div>

This is useful when we want to specify positions that are relative to the overall size of our canvas. For example, the pixel that's exactly in the center of our canvas can always be specified with coordinates $$(\frac{width}{2}, \frac{height}{2})$$, independent of the exact size of our canvas.

Likewise, the pixel furthest away from the origin has coordinates $$(width - 1, height - 1)$$. The $$-1$$ is necessary because even though our canvas is $$width$$ pixels wide and $$height$$ pixels tall, we have a pixel at $$(0, 0)$$, and if the first pixel along the $$x$$ direction is at coordinate $$0$$, the second pixel at coordinate $$1$$, ..., etc, ..., the last pixel will be at coordinate $$width - 1$$.

<div class="scaled-images">
  <img src="{{ '/assets/images/p5/canvas-01.jpg' | relative_url }}">
</div>

## Drawing Shapes

## Colors

### RGB color picker
<script type="text/p5"
  data-p5-version="1.9.0"
  src="{{ site.baseurl }}/assets/sketches/rgbpicker.js"
  data-preview-width="400"
  data-preview-height="400"
  data-width="1600"
  data-height="600">
</script>

### Color Modes

<!-- 
## color modes
<script type="text/p5" src="{{ site.baseurl }}/assets/sketches/colormodes.js" data-preview-width="400" data-height="600"></script>
 -->

<script src="//toolness.github.io/p5.js-widget/p5-widget.js"></script>
