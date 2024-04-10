---
title: Variables
---
## Keeping track of values

In its most basic sense, variables are a type of container for our data. They give a name to our values.

They help us keep track of different values in our code, without us having to remember them, which is specially important for values that change. It allows us to keep track of the *meaning* of values instead of their exact amount.

Variables also help the computer because it's a way for us, as programers, to ask the computer to reserve some memory for our program.

There are a couple of ways that we can declare a variable in JavaScript:

```js
var x;
let y;
const z = 10;
```

The first two lines, `var x;` and `let y;`, both declare empty variables, named `x` and `y` respectively, while the third line `const z = 10;` declares a variable named `z` and immediately gives (*assigns*) the value $$10$$ to it.

Both `let` and `var` ask the computer to reserve a little bit of memory for values that will be provided later, and that can change. This is important. The variables `x` and `y` might have one value (or no value) at the beginning of our program, but our code can reference them by name later and update their values as needed:

```js
let inches = 60;
inches = 72;
inches = 72 + 4;
// inches has the values 76 now
```

The difference between the `var` and `let` keywords is kind of subtle and has to do with when/where/how we can access our variables and reuse their **names**. Using `var` can lead to some non-intuitive situations, so we'll use `let` for most/all of our variable declarations.

Declaring a variable with the keyword `const` is different. It stands for *constant*, so variables that are declared with `const` get an initial value, which can never change.

```js
const ID = 1212;
ID = 2323; // <-- this will give an error
```

Once we have variables with values we can use their name in place of their value in expressions:

```js
let base = 14;
let height = 23;
let area = (base * height);
let perimeter = 2 * base + 2 * height;
```

Writing `base * height` and `2 * base + 2 * height` is certainly easier and more meaningful than `14 * 23` and `2 * 14 + 2 * 23`. And using the variables `area` and `perimeter` later in our code is also easier than having to re-calculate those values every time.

Variables not only make it so we don't have to remember specific numbers in our program, but they also give some semantics to our code: we now know what those values mean.

## Parameterizing

Like already mentioned, variable values can change during the execution of our program, but they can also serve as a way for us to set parameters for repeatable or modular computation.

Let's look at an example. Imagine we have just created this logo using some basic p5.js [`arc()`](https://p5js.org/reference/#/p5/arc) shapes:
{% include p5-editor.html id="JD7Xww-vp" %}

Some of the shapes overflow our canvas area, but that's fine. Our logo can be embedded in any area that is exactly $$400$$ by $$400$$ pixels.

Let's say we now get to use it in a larger context:
{% include p5-editor.html id="-EPSV56EY" %}

Or, have to fit it into a smaller area:
{% include p5-editor.html id="gN1VGtxC-" %}

Both of these look bad; not only are they not centered, the small one has lots of overflow.

One way we can *parameterize* our code is to use a variable to keep track of the center of our canvas, and define other parameters of our logo in relation to the center of the canvas:
{% include p5-editor.html id="nw_8y3h6f" %}

Now we can just update those two variables: `centerX` and `centerY` every time we change the size of our canvas and the shapes will remain centered. Try it out above ☝️ !

This is better, but we can improve this by using variables to make our whole design more flexible and independent of specific sizes.

For example, instead of typing the values for the center location of our canvas, p5.js provides variables that keep track of the size of our canvas for us. The p5.js variables [`width`](https://p5js.org/reference/#/p5/width) and [`height`](https://p5js.org/reference/#/p5/height) will always have the dimensions of our canvas, even if they change, so it's always a better idea to use these when drawing shapes at relative locations in our canvas:

```js
centerX = width / 2;
centerY = height / 2;
```

We can also use the p5.js [`min()`](https://p5js.org/reference/#/p5/min) function to keep track of the smallest of the dimensions (`width` or `height`) and us it to limit the circumference of our largest `arc()`:
{% include p5-editor.html id="-KQ_qOwsY" %}

We can change the size of our canvas now and our logo will mostly follow. Try changing the canvas dimension above to see what happens ☝️ .

Let's continue adjusting our design by changing our code to use variables for more of the `arc()` parameters.

The circumferences of $$100$$, $$200$$ and $$300$$ in the original code can be turned into `minDim / 4`, `minDim / 2` and `3 * minDim / 4`, respectively, for one-quarter, one-half and three-quarters of the smallest canvas dimension.

We'll also use `minDim / 12` for our [strokeWeight()](https://p5js.org/reference/#/p5/strokeWeight).

These changes should make our whole logo fit our canvas independent of the exact size of the canvas:
{% include p5-editor.html id="yJBHf93MkH" %}

One last minor modification is to reorganize (*refactor*) our `3 * minDim / 4` calculation and put it in a variable just to make the code a bit more legible. Variables can also help with that. And now that our logo is pretty much defined using variables, in terms of relative values, it will change and adjust to changes in the size of our canvas:
{% include p5-editor.html id="D4SRjWekm" %}

Even if we have to use very particular values, like $$386$$ and $$494$$ for our canvas dimensions, our logo will adapt. Try it out and change the size of the canvas in the code above  ☝️ !

## Other types of parameters

Variables can hold many kinds of values, not just single numbers.

For example, they can also hold p5.js [`color()`](https://p5js.org/reference/#/ p5/color) information.

This way we can experiment with different palettes without having to keep track of exact color values all over our code:
{% include p5-editor.html id="25gWOsZKl" %}

Change the color values for `highColor` and `lowColor` above  ☝️ . Easy, right?

## Keeping track of time

We'll see lots of examples of this when we talk about animations in p5.js, but variables can also be used to keep track of time.

The p5.js variable `frameCount` gives us the numbers of frames that have elapsed since our program started running, and we can do a little math to turn that value into an increment for our arcs' `stop` angle.

Without knowing too much about the details of this sketch we can see that there's a variable called `fs` that keeps track of a value that keeps increasing and gets scaled to set the end position of our arcs:
{% include p5-editor.html id="8Gf_XspTg" %}

Try changing the values in the expression for `fs` ☝️ !

## Other p5.js variables

Besides `width` and `height`, for our canvas's dimensions, and `frameCount` for the number of frames elapsed since the beginning of the program execution, p5.js also gives us the `mouseX` and `mouseY` variables.

These always hold the values of the current horizontal and vertical location of our mouse when it's on top of the canvas, which we can use in our drawings:
{% include p5-editor.html id="ctPwTIVvc" %}


Since we're talking about variables, let's create some variables to make our ellipse shape more interesting.

First, let's calculate how far the mouse is from the center of the canvas:
```js
distX = abs(mouseX - centerX);
distY = abs(mouseY - centerY);
```

And then, let's make our ellipse be really small when it's at its furthest from the center, and bigger when close to the center. We'll use half of the `width` as our maximum diameter, and calculate individual horizontal and vertical diameters by subtracting our distance measurements from this values:
```js
maxDiam = width / 2;
diamX = maxDiam - distX;
diamY = maxDiam - distY;
```

This makes it so that the diameters are $$0$$ at the maximum distances and `width / 2` at the center of the canvas:
{% include p5-editor.html id="PoX5vPiUl" %}

We can keep using variables and a little bit of math to add more ellipses to our sketch:
```js
reflectX = width - mouseX;
reflectY = height - mouseY;
```

These variables give us the location of the mouse, but *reflected* over the center of the canvas: when `mouseX` is at horizontal location `width`, for example, `reflectX` will be at $$0$$, and vice-versa. And same with `mouseY` and `reflectY`.

If we use these $$2$$ new variables to draw a second ellipse, we get something like this:
{% include p5-editor.html id="a3LgzSMZA" %}

There are other variables available for us in our p5.js sketches, like [`key`](https://p5js.org/reference/#/p5/key), which holds the value of the last-pressed key on the keyboard, or, [`pixels`](https://p5js.org/reference/#/p5/pixels), which is a variable that holds a list of color values, one for each pixel of our canvas.

We'll see these in detail once we start working with [arrays](../arrays), [images](../../creative-coding/images) and [text](../strings).
