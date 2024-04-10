---
title: JavaScript Objects
---
## Array Review
Let's start with the sketch we were looking at when we talked about [arrays](../arrays/).

This sketch has $$9$$ obstacle ellipses, and each obstacle has its own `x` and `y` position that is kept in the `x` and `y` arrays. These positions are defined when the arrays are declared, outside the `setup()` and `draw()` functions.

When we want to draw an obstacle we get values from the `x` and `y` arrays using the same *index* value. For example, the position for the $$4^{th}$$ obstacle is given by `(x[3], y[3])`.

{% include p5-editor.html id="SPijB1Iul" %}

Let's say we now want each obstacle to also have its own diameter.

Easy. We'll just declare a new empty array called `diameter`, and inside the `setup()` function we'll fill it with as many diameter values as we have members in the `x` array. We can even use the `random()` function again to give them all different diameters between `oDiam / 2` and `oDiam`.

```js
for (let i = 0; i < x.length; i += 1) {
  let md = random(oDiam / 2, oDiam);
  diameter.push(md);
}
```

Checking for overlap becomes:
```js
ellipseOverlap(mouseX, mouseY, mDiam, x[i], y[i], diameter[i]);
```

And, drawing all the obstacles becomes:
```js
for (let i = 0; i < x.length; i += 1) {
  ellipse(x[i], y[i], diameter[i]);
}
```

{% include p5-editor.html id="R4lTL3FtQ" %}

Cool. That works.

## More Parameters

And now, if we want to give each obstacle a different fill color and overlap color... we could keep adding arrays:

```js
let fColor = [];
let oColor = [];
```

But this can get really confusing really fast.

What if we forget to add a parameter for one of the obstacles?

What if we switch `x` and `y` values for one of the obstacles?

What if we need to rearrange the order of one of the arrays, how can we replicate the change in the other arrays?

Once the object that we're trying to represent starts to have many different parameters, we can take advantage of another JavaScript data structure: the [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object).

JavaScript objects are similar to arrays, in the sense that they help keep related values together using a single variable. For example, for our obstacles, we could declare a single `obstacle` object like this, with data organized in *key*-*value* pairs:

```js
let obstacle = {
  x: 80,
  y: 115,
  diameter: 80,
  fColor: color(255),
  oColor: color(100)
};
```

This is telling the computer that we want to have a variable called `obstacle`, and that this variable has other variables inside of it, and those variables have values that should be kept close to each other. The advantage of doing it this way is that we, and the computer, can think about this data more efficiently if it's kept together and labeled.

This:
```js
let obstacle = {
  x: 80,
  y: 115,
  diameter: 80,
  fColor: color(255),
  oColor: color(100)
};
```

is easier to think about than this:
```js
let obstacle = [80, 115, 80, color(255), color(100)];
```

and easier to do calculations with than this:
```js
let x = [80, 210, 355, 45];
let y = [115, 240, 55, 340];
let diameter = [80, 50, 60, 56];
let fColor = [color(255), color(255), color(255), color(255)];
let oColor = [color(100), color(100), color(100), color(100)];
```

If objects are like variables that have other variables inside of it, how do we access their values?

Just like arrays have a special syntax for accessing their members by index using the square brackets (`[]`), objects have a special syntax for accessing members by their name. If we want to get the `x` position of our obstacle we can use: `obstacle.x` or `obstacle["x"]`. Similarly, the diameter would be: `obstacle.diameter` or `obstacle["diameter"]`.

We'll give preference to the *dot notation*, but if we have objects whose members have names with spaces, or special characters, we will have to use the square brackets notation `[]`.

## Many Objects

Now let's combine arrays and objects and create an empty array to hold our obstacle objects:

```js
let allObstacles = [];
```

Then in our `setup()` function we can use a `for()` loop to add $$9$$ obstacles to this array like this:

```js
for (let i = 0; i < 9; i += 1) {
  let anObstacle = {
    x: random(width),
    y: random(height),
    diameter: random(40, 80),
    fColor: color(random(255)),
    oColor: color(255, 190, 90)
  };

  allObstacles.push(anObstacle);
}
```

The loop executes $$9$$ times and each time random values are picked for `x` and `y` coordinates, fill color and diameter. In addition to that, all obstacles have the same fill and overlap colors.

The rest of our code is very similar, but now instead of accessing parameters in different arrays using an index, like:

```js
ellipse(x[i], y[i], diameter[i]);
```

We first get our object from the array, and then access its properties by name:

```js
let anObstacle = obstacles[i];
ellipse(anObstacle.x, anObstacle.y, anObstacle.diameter);
```

The rest is pretty similar. We just have to remember to also get the fill and overlap colors from the object itself before drawing the ellipse.

```js
if (mOverlap) {
  fill(anObstacle.oColor);
} else {
  fill(anObstacle.fColor);
}

ellipse(anObstacle.x, anObstacle.y, anObstacle.diameter);
```

{% include p5-editor.html id="M8A7942X7" %}

This is powerful because now we have a way of addressing each of our objects at once, with all of their parameters. No need to keep multiple arrays with separate parameters scattered around our code.

Here's a list of obstacles. Each member of this list has all of its parameters inside.

## Keeping It Together

One advantage of keeping all of the information about an obstacle together is that it's easier to access them all at once, or make them have some relation to each other, or rearrange the order in which they are drawn.

Let's say that instead of $$9$$ obstacles we want to draw $$590$$.

And, we also want the color of the obstacles to be related to their diameter and we want to draw the largest obstacles first, and the smaller ones on top of them.

Let's start by adjusting the color.

When we create the obstacle and pick a random value for the diameter, we will also create a variable that holds the diameter as a percentage of the max diameter. When the random diameter is close to the max, `pctDiam` will be close to $$1.0$$, when it's smaller, it will be closer to $$0$$.

```js
let oDiam = random(maxDiam / 2, maxDiam);
let pctDiam = oDiam / maxDiam;
```

{% include p5-editor.html id="unMpj-cQH" %}

Ok. The color works. But we still want to draw the bigger diameters first.

In order to do that we have to sort the array of obstacles by their diameter. JavaScript arrays have a builtin function to do that called [`sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort). If our array had only numbers or words, all we would have to do was call `allObstacles.sort()`, but since our array has a bunch of custom objects we have to tell the `sort()` function how to order them.

We'll see how to do this in detail at a later time, but it involves giving `sort()` a function that specifies which parameter of our objects we want to sort by.

That's what this function does:

```js
function byDiameter(obsA, obsB) {
  return obsB.diameter - obsA.diameter;
}
```

And when we call `sort()` like this, it will sort the obstacles by diameter from largest to smallest:
```js
allObstacles.sort(byDiameter);
```

{% include p5-editor.html id="uyVxY2kii" %}

Next we're gonna take a look at how to organize our objects so we can more easily change their shapes and colors when they collide.
