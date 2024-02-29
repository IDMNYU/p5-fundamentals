---
title: Functions
---
## Organize and Repeat Code

We saw how to use [`for()`](../patterns/) loops to run the same code over and over and create patterns.

There's another method we can use to repeat actions in our code: functions.

Functions are predefined, named, sequences of commands that can be easily re-executed. In addition to this *encapsulation* that facilitates repeating sequences of commands, functions are also *parameterizable*, which allows them to have similar but different behavior, depending on information that gets sent to them during their execution. More about this in a bit.

This is how we define a function in JavaScript:
```js
function functionName(param0, param1, ...) {
  command0;
  command1;
  ...
}
```

We've already seen many predefined p5.js functions, like `rect()`, `ellipse()`, `line()`, etc. They all take parameters that affect how and where the shapes get drawn, like the x and y positions, shape width and height. But now we will see how to define our own functions.

Let's see one case where defining a function can simplify the code we write and decrease the number of variable we have to keep around.

We've seen how to draw simple shapes like squares, rectangles and ellipses, but what if we wanted to draw a heart?

We can start by trying to piece together some simple shapes like triangles and ellipses or arcs:

{% include p5-editor.html id="09VVK9rPf" %}

Doesn't look so bad if we turn off the shape strokes:

{% include p5-editor.html id="Y1CdHZ8TJ" %}

And what if now we want to draw many hearts, of potentially different sizes, in different locations?

We could try to come up with the specific pixel locations for all of our hearts like this:

{% include p5-editor.html id="v6ASn7sz1" %}

But this is tedious and prone to mistakes.

It would be a better idea to come up with a generic way of describing the heart shapes and then just repeat those steps in different locations of our canvas.

One possible way to do this is to pick a point sort of in the center of our heart shape, and then define all the other points in terms of the location of this point. For example, in the drawing below, the black point is our reference point ($$x_0$$, $$y_0$$), and we'll describe all of the red points relative to it:

<div class="scaled-images">
  <img src="{{ '/assets/images/p5/heart-00.jpg' | relative_url }}">
</div>

For our heart, let's set $$x_0 = 200$$ and $$y_0 = 150$$ and express all of the `x` and `y` parameters of our shapes in terms of these two variables:

{% include p5-editor.html id="hu1zWWUM_" %}

Now, we could copy-paste the lines that draws the shapes and just change the values of $$x_0$$ and $$y_0$$ before calling them:

{% include p5-editor.html id="RAM5FUyR3" %}

This is already easier to read and modify, but let's say that now we want to parameterize the size of our heart shape. We would have to very carefully find all places in our sketch where we are drawing hearts in order to update the correct lines of code with the changes.

Functions can help here. We'll use a function to *encapsulate* all the commands and values that are used when drawing a heart and that way when we need to update how we draw the heart later, we'll only have to change our code in one place.

Let's wrap our current heart-drawing commands inside a `heart()` function that takes two parameters, x and y locations, and draws a heart:

```js
function heart(x0, y0) {
  ellipse(x0 - 40, y0 - 15, 100, 100);
  ellipse(x0 + 40, y0 - 15, 100, 100);
  triangle(x0 - 88, y0, x0 + 88, y0, x0, y0 + 135);
}
```

We just copied the code from before, but now that these lines are inside a function, the `x0` and `y0` parameters reference specific x and y locations that get passes to the function each time it is *called*. Drawing the heart in different locations is as easy as this now:

{% include p5-editor.html id="lMWMmDprr" %}

And now we can invest in adding a size parameter to our heart shape:

{% include p5-editor.html id="Zn6HXaQK-" %}

The math is not very intuitive, but it only had to be figured out once, and now we can call our `heart()` function repeatedly at different locations and with different sizes:

{% include p5-editor.html id="108BoKQNB" %}

Or use [`for()`](../patterns/) loops to create patterns on our canvas:

{% include p5-editor.html id="YlyqER3Tn" %}

That vary in size based on the distance from the center of the canvas:

{% include p5-editor.html id="YuYDboWz-" %}

## Compute and Return

