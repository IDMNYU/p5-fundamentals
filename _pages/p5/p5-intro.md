---
title: Intro to p5.js
---
Now that we've seen how to [setup a p5.js project](../p5-setup/) on our computer, let's take a closer look at how p5.js works and how we can start writing code for our projects.

[THIS](https://github.com/IDMNYU/p5-fundamentals/blob/main/_pages/p5js-template/sketch.js) is a bare `sketch.js` file we can start with:

```js
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220, 20, 20);
  ellipse(120, 120, 50, 50);
}
```

{% include p5-editor.html id="z3QMRJrup" %}

## Setup & Draw

As we mentioned previously, our project code, or *sketch*, is divided into two main sections, or *functions*, a `setup()` function and a `draw()` function.

We specify what each of these functions will do by adding code inside their curly braces (`{` `}`).

In the example above, the `createCanvas(windowWidth, windowHeight)` command belongs to the `setup()` function and the other two commands, `background(220, 20, 20)` and `ellipse(120, 120, 50, 50)`, are inside the `draw()` function.

The difference between these two parts of our code is that the code inside the `setup()` function only gets executed once, while the code inside our `draw()` function runs repeatedly, over and over and over and over...

### `setup()`
The `setup()` function runs when we first load our page and the `html` file includes the p5.js library, and then our `sketch.js` file. The commands that we put inside the `setup()` function usually have to do with *setting up* our environment and canvas: How big do we want our canvas to be? Do we need a canvas? What color mode are we using? Should we specify image positioning using their corners or center? What's our default font style and size? Do we have to load any external files?

We don't always have to answer all of these questions in our `setup()` function, and we can always change how we do things later in our code, but for parameters and settings that are fixed, it's more efficient to just set them up once, at the beginning of our program, by putting commands in the `setup()` function.

In the example above, our `setup()` function just sets the area where we can draw and detect interactions, our canvas, to be as big as our window.

If, for example, in our project, we were only ever gonna draw blue shapes, with thick orange outlines, we can add the commands for setting those up in our `setup()` function:

```js
strokeWeight(8);
stroke('orange');
fill('blue');
```

{% include p5-editor.html id="ea1JkTXgx" %}

### `draw()`
This is where we'll want to put commands that actually *draw* anything on the screen, whether they are shapes, images, movie frames or animations.

For example, the commands for drawing the ellipses in the code above:

```js
ellipse(120, 120, 50, 50);
ellipse(150, 200, 50, 50);
ellipse(220, 120, 50, 50);
ellipse(250, 250, 50, 50);
```

Even though they look like they are static, those ellipses are actually being redrawn on the screen many times a second.

Unlike the `setup()` function, the `draw()` function runs repeatedly as long as our project's webpage is open, and whatever code we put inside its `{ }` will execute about 60 times per second. This is what allows us to create animations and handle interactions.

Without worrying too much about the details, but just to check that whatever we put inside `draw()` is always running, let's modify the code above and use the number of times that the `draw()` function has executed to move the ellipses across the canvas:

{% include p5-editor.html id="P25aS7yev" %}

That special `frameCount` keyword keeps track of how many times our code has executed and we can use that value to draw our ellipses at a slightly different location every time.

We'll sometimes refer to each execution of the `draw()` function as a *frame* because it is often used to redraw our entire canvas every time it runs, just like a film or flip-book animation frame.
