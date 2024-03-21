---
title: More Trigonometry and Vectors
---
We just saw how to use the [`sin()` and `cos()`](../sincos/) functions to create cycles.

Let's now take a look at other ways we can use these and other [trigonometric functions](https://en.wikipedia.org/wiki/Trigonometric_functions) in our sketches.

As a review: trigonometric functions are functions that, along with the [Pythagorean theorem](https://en.wikipedia.org/wiki/Pythagorean_theorem), define relations between the angles of a right triangle and the length of its sides:

<div class="scaled-images left w75">
  <img src = "{{ '/assets/images/creative-coding/trigonometry-00.jpg' | relative_url }}"/>
</div>

## Polar Coordinates

We can use these relations to derive formulas for translating between [Cartesian](https://en.wikipedia.org/wiki/Cartesian_coordinate_system) and [polar](https://en.wikipedia.org/wiki/Polar_coordinate_system) coordinate systems.

<div class="scaled-images left w75">
  <img src = "{{ '/assets/images/creative-coding/trigonometry-01.jpg' | relative_url }}"/>
</div>

Cartesian coordinates are what we use to specify points on a plane (and pixels on a screen) using two numbers that represent distances in perpendicular directions. Polar coordinates also specify points on a plane, but using a distance and an angle.

Just like we can use `for()` loops to iterate over the $$(x, y)$$ cartesian coordinates and create patterns in a grid, we can also iterate over the two variables in a polar coordinate system to create patterns.

In this example, our outer `for()` loop iterates through different values for how far we want to be from the center of the canvas, in steps of $$20$$ pixels, and the inner `for()` loop iterates through all possible angles from the positive x-axis, in steps of $$1^{\circ}$$:

<div class="scaled-images left w100">
  <img src = "{{ '/assets/images/creative-coding/trigonometry-02.jpg' | relative_url }}"/>
</div>

{% include p5-editor.html id="X3zrbKW8G" %}

This one is pretty simple and could've been done by drawing concentric ellipses. If we untangle some of our logic we'll see we're implementing the [trigonometric functions for defining a circle](https://en.wikipedia.org/wiki/Unit_circle#Trigonometric_functions_on_the_unit_circle).

And that's basically what the `for()` loops are doing: as long as we keep the angle used to calculate `x` equal to the angle used to calculate `y`, we are implementing the [parametric equation of a circle](https://en.wikipedia.org/wiki/Circle#Parametric_form):

$$\begin{align*} x &= r \cdot cos(a) \\
y &= r \cdot sin(a)\end{align*}$$

But, what if we move the angle in our `x` calculation $$3$$ times faster than the angle for `y`?

If we just change this:
```js
let x = r * cos(radians(a));
```

to this:
```js
let x = r * cos(radians(3 * a));
```

we get this:

{% include p5-editor.html id="reDI6Py1F" %}

Yeah... polar coordinates FTW! I don't think we can draw *that* with circles.

We can play with that value and see how the drawing changes. We can also add a different multiplier to the `y` angle as well:
```js
let x = r * cos(radians(3 * a));
let y = r * sin(radians(7 * a));
```

{% include p5-editor.html id="t4JR5wd3k" %}

Try out some new values for the angle multipliers in the code above ☝️. Cool, right?

Or, use something else, like the `r` value, to increment the angle:
```js
let x = r * cos(radians(a + 2 * r));
let y = r * sin(radians(a));
```

{% include p5-editor.html id="1dDVH1zAx" %}

Or, both:
```js
let x = r * cos(radians(2 * a + 2 * r));
let y = r * sin(radians(a));
```

{% include p5-editor.html id="4HJBJ3zFD" %}

## Dimensions

Besides creating unexpected concentric patterns, we can also use polar coordinates to transform one-dimensional signals into 2-dimensional signals.

*What?*

Let's say we have a one-dimensional signal, like time, or the number of people in a room, and we want to create a 2-dimensional visualization of this data.

We can easily use polar coordinates to *map* a single value to a point in our canvas. This is also possible using cartesian coordinates directly (as we'll see when we start processing [images](../images/)), but using polar coordinates is a bit simpler and perhaps more intuitive.

Let's start by using a single variable from a `for()` loop to derive our `r` values and `a` angles.

If we make `r` grow proportional to the angle, we get a spiral:

{% include p5-editor.html id="vmsdrtUln" %}

And if we increase the frequency of the angles, like we did before by multiplying them by a constant, and also increase the range of our `r`:
```js
let r = map(a, 0, 360, 10, 1.4 * maxRadius);
let x = r * cos(radians(8 * a));
let y = r * sin(radians(8 * a));
```

We get a tighter spiral that goes all the way to the corners of our canvas:

{% include p5-editor.html id="EcHwwd2jw" %}

We can also add an offset to our angles (this is often called the [*phase*](https://en.wikipedia.org/wiki/Phase_(waves)) of an angle) that changes where the spiral starts:
```js
let x = r * cos(radians(8 * a - phaseVal));
let y = r * sin(radians(8 * a - phaseVal));
```

It's kind of subtle, but if we re-run the following sketch and look at the center of the spiral we'll notice the effect of the phase value:

{% include p5-editor.html id="C72WsABv9" %}

It's easier to see its effects if that offset increases or decreases with every frame:

```js
let x = r * cos(radians(8 * a - 8 * frameCount));
let y = r * sin(radians(8 * a - 8 * frameCount));
```

{% include p5-editor.html id="FbTKcNL-3" %}

Our canvas is spinning slowly, but the shape makes it seem like it's a line that is being drawn infinitely, or circles that are growing ! We can play with the phase multiplier above ☝️ to make the spiral spin faster, slower and even backwards.

If we make the the `x` and `y` angles slightly out of sync, we get an effect that is almost 3D:
```js
let x = r * cos(radians(9 * a - 8 * frameCount));
let y = r * sin(radians(8 * a - 8 * frameCount));
```

{% include p5-editor.html id="3mfHR24rj" %}

## Parametric Equations

Ok, in those last couple of examples with animations we were mapping *two* variables, our loop iterator and `frameCount`, to *two* other variables, `x` and `y`.

Let's go back to mapping *one* independent variable to `x` and `y` locations.

Equations that do this are sometimes called [Parametric Equations](https://en.wikipedia.org/wiki/Parametric_equation). In these equations, the relationship between `x` and `y` isn't explicitly set, but their values are related through a third variable, our independent signal.

Some examples of parametric equations, are:

### [Lissajous Curves](https://en.wikipedia.org/wiki/Lissajous_curve).
We saw these earlier, but this is their official name and equations:

$$\begin{align*} x &= A \cdot cos(\alpha t + \delta) \\
y &= B \cdot sin(\beta t) \end{align*}$$

where $$A$$, $$B$$, $$\alpha$$, $$\beta$$ and $$\delta$$ are just different constants.

{% include p5-editor.html id="cuxnKIgiL" %}

We can change them above ☝️ and see what happens to the drawing.

### [The Butterfly Curve](https://en.wikipedia.org/wiki/Butterfly_curve_(transcendental)):

$$\begin{align*}
x &= sin(t) \cdot \left(\exp^{cos(t)} - 2 \cdot cos(4t) \right) \\
y &= cos(t) \cdot \left(\exp^{cos(t)} - 2 \cdot cos(4t) \right)
\end{align*}$$

{% include p5-editor.html id="3UZCUTavF" %}

### [Cardioid Curves](https://en.wikipedia.org/wiki/Cardioid):

$$\begin{align*}
x &= r \cdot \left(1 - cos(\alpha \cdot t) \right) \cdot cos(t) \\
y &= r \cdot \left(1 - cos(\alpha \cdot t) \right) \cdot sin(t)
\end{align*}$$

where $$\alpha$$ is just an integer constant that we can change.

{% include p5-editor.html id="71LibEZ-T" %}

Change `alphaVal` above ☝️ and see what happens!

Or, better yet, let's have our `loop()` increase the value of `alphaVal`:

{% include p5-editor.html id="Qw2JHfI5J" %}

### [Bonus Curve](https://mathworld.wolfram.com/HeartCurve.html):

And, finally, this special kind of cardioid curve:

$$\begin{align*} x &= 16 \cdot sin^3(t) \\
y &= 13 \cdot cos(t) - 5 \cdot cos(2t) - 2 \cdot cos(3t) - cos(4t) \end{align*}$$

{% include p5-editor.html id="drP6XPWGj" %}

Pretty cool!

## Point Distances / Euclidean Distances / L2 Distances

Polar coordinates are lots of fun, and can also be very useful when we need to calculate the distance or the angle between two points.

If we image two points on our screen, with coordinates $$(x_0, y_0)$$ and $$(x_1, y_1)$$, we can get the distance between them by using the Pythagorean theorem:

<div class="scaled-images left w75">
  <img src = "{{ '/assets/images/creative-coding/trigonometry-03.jpg' | relative_url }}"/>
</div>

In this sketch the distance between two moving points is calculated using the formula for [Euclidean Distance](https://en.wikipedia.org/wiki/Euclidean_distance) $$\sqrt{(x_1 - x_0)^2 + (y_1 - y_0)^2}$$ and the p5.js function [`dist()`](https://p5js.org/reference/#/p5/dist). When those distances are used as the diameter for two circles centered on the canvas, we can see that they are exactly the same:

{% include p5-editor.html id="BM0IF01HH" %}

## Angles

Similarly, we can use the formula that calculates the polar angle of a point to get the angle between two points:

<div class="scaled-images left w75">
  <img src = "{{ '/assets/images/creative-coding/trigonometry-04.jpg' | relative_url }}"/>
</div>

Or, the angle between a point and itself in the future.

If a moving point at $$(x, y)$$ has velocity $$v_x$$ and $$v_y$$, its position in the near future will be $$(x + v_x, y + v_y)$$. We can calculate the angle between the point now and the point in the future to get its heading angle:

<div class="scaled-images left w75">
  <img src = "{{ '/assets/images/creative-coding/trigonometry-05.jpg' | relative_url }}"/>
</div>

We can use the heading angle of a moving object to rotate its shape and emphasize its direction of motion:

{% include p5-editor.html id="McuKrbsvl" %}

## Vectors

p5.js actually has a class called [`Vector`](https://p5js.org/reference/#/p5.Vector) that can help with geometry calculations like these. The simplest way to think about a vector is that it specifies a point $$(x, y)$$ in space, relative to the $$(0, 0)$$ origin. Vectors are actually more than that, but to do the distance and angle calculations that we've seen, it's fine to think of vectors as points with an $$(x, y)$$ coordinate.

This drawing shows two vectors/points and if we subtract $$_1$$ from $$v_0$$, we get a third vector that holds information about the distance and direction between them.

<div class="scaled-images left w75">
  <img src = "{{ '/assets/images/creative-coding/trigonometry-06.jpg' | relative_url }}"/>
</div>

The vectors in p5.js actually have builtin functions to calculate distances and angles. We can create two vectors and get the distance between them like this:
```js
let v0 = createVector(20, 10);
let v1 = createVector(10, 20);
let d = v0.distance(v1);
```

and the angle like this:
```js
let v0 = createVector(20, 10);
let v1 = createVector(10, 20);
let d = v0.angleBetween(v1);
```

Let's use vectors to redo some of the sketches above.

## Vector Distances

Instead of pushing JavaScript objects with $$4$$ parameters $$(x, y, vx, vy)$$, we now have objects with two vectors, one for the location and one for the velocity of the objects.

In draw, anytime we had `p.x` now we'll have to use `p.loc.x`. Likewise for velocity, `p.vx` becomes `p.vel.x`. It might a bit more letters to type, but the related quantities are in a vector, which helps to do some math, like updating the location.

Instead of this:
```js
p.x += p.vx;
p.y += p.vy;
```

We can just do:
```js
p.loc.add(p.vel);
```

And the distance between the two circles can now be calculated with:
```js
ps[0].loc.dist(ps[1].loc);
```

{% include p5-editor.html id="c5YCY8pXv" %}

## Vector Angles

For the angles, it's very similar. We can always call `v0.angleBetween(v1)` to get the angle between two vectors. We just have to think about which $$2$$ vectors we need the angle between.

In the example where we are trying to get heading angles, the vector that points in the direction of movement is `p.vel`. Since in p5.js an angle of $$0^\circ$$ points in the direction along the x-axis, the angle that we need to rotate our objects is gonna be relative to this reference vector of zero rotation.

The code is mostly the same as the previous sketch, with the vector addition for location updates, but now we do:
```js
let xAxis = createVector(1, 0);
let hAngle = xAxis.angleBetween(p.vel);
```

This way we get the heading angles relative to the reference point of zero rotation, and then use that value to rotate our objects.

{% include p5-editor.html id="4laz8uFA4" %}
