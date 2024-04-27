---
title: Interactions
---

We've seen and used the p5.js special variables [`mouseX`](https://p5js.org/reference/#/p5/mouseX) and [`mouseY`](https://p5js.org/reference/#/p5/mouseY) when we looked at [variables](../../p5/variables/), [conditionals](../../p5/conditionals/), [functions](../../p5/functions/) and [classes](../../p5/classes/).

These variables always give us the current `x` and `y` coordinates of our mouse, relative to the $$(0, 0)$$ origin of our canvas.

{% include p5-editor.html id="RHuP9coKo" %}

Now, we are going to see some other special variables and functions that will help us add interactivity to our sketches using the mouse and the keyboard.

## Mouse Variables

Another pair of special variables available to us in p5.js are the [`pmouseX`](https://p5js.org/reference/#/p5/pmouseX) and [`pmouseY`](https://p5js.org/reference/#/p5/pmouseY) variables. They are like the `mouseX` and `mouseY` variables, but they hold the *previous* position of our mouse.

By comparing the current and previous positions of our mouse we can draw lines or shapes that are based on the speed in which a user moves the mouse.

{% include p5-editor.html id="mbnzIufP6" %}

Another mouse-related special variable in p5.js is the [`mouseIsPressed`](https://p5js.org/reference/#/p5/mouseIsPressed) variable. This variable returns a *boolean* value that tells us whether any of the mouse buttons are currently pressed.

If we query this variable using an `if` statement inside our `draw()` function it will return `true` if the user is holding down any of the mouse buttons, or a `false` otherwise. We can then use this simple interaction pattern to change something about our sketch, like the background color or even the fill color of our shapes.

```js
if(mouseIsPressed) {
  // a mouse button is being pressed
  fill(255);
} else {
  // no button is being pressed
  fill(0);
}
```

{% include p5-editor.html id="p-gctWMk-" %}

## Mouse Functions

Let's say we want to count the number of times an user has clicked the mouse. We could try to just add an `if()` statement to our `draw()` function like this and increment a variable every time `mouseIsPressed` is `true`:

```js
function draw() {
  if (mouseIsPressed) {
    clickCount += 1;
  }
}
```

{% include p5-editor.html id="A4CtkK0ur" %}

This doesn't seem correct...

What's happening is that our `draw()` function executes faster than our clicks, so the `if()` statement and the increment command execute multiple times while we're holding down the mouse button even if we're really quick.

If we want to be a little more precise when detecting mouse actions, we can use a couple of special functions available in p5.js.

The way we use these functions is a little different from how we use most of the p5.js functions that we've seen so far.

Usually, a function like `rect()` or `fill()` has been defined by the p5.js library and we call them in our code. These new mouse event functions are almost the opposite: p5.js knows when to call them, but we have to define them.

For example, if we want to count the number of times the mouse is clicked we define a function called `mouseClicked()` like this and p5.js will call it just once per click:

```js
function mouseClicked() {
  clickCount += 1;
}
```

{% include p5-editor.html id="H1xuSiVnL" %}

And now we can use the `clickCount` variable to change some parameters in our sketch. In this case we'll use the  number of clicks to compute the diameter for an ellipse. To make the changes more apparent, we'll give the ellipse a starting diameter of $$20$$ and we'll increment it by $$4$$ pixels per click:

```js
let mDiam = 20 + 4 * clickCount;
```

{% include p5-editor.html id="LBAguAfKi" %}

## Functions and Variables

Since the `mouseX` and `mouseY` variables are always available to us, we can use them inside the `mouseClicked()` function to get the location of a mouse click. In addition to increasing our ellipse size, we can now use clicks to move it.

{% include p5-editor.html id="I2U_zj7Z4" %}

## More Events

These *event* functions provide better granularity for the actual mouse actions.

There are separate functions that are called when a mouse button is [pressed](https://p5js.org/reference/#/p5/mousePressed), [released](https://p5js.org/reference/#/p5/mouseReleased), [clicked](https://p5js.org/reference/#/p5/mouseClicked) or [double clicked](https://p5js.org/reference/#/p5/doubleClicked).

There are also functions that are called when the mouse is [moved](https://p5js.org/reference/#/p5/mouseMoved) or [dragged](https://p5js.org/reference/#/p5/mouseDragged) (pressed + moved).

We just have to define them in our code!

Let's add to the previous example.

We'll still move the ellipse on every click, and we'll increase its diameter by $$4$$ pixels per click, but now we'll also increase the diameter by $$12$$ on double-clicks, so we'll need a counter for those, and a way to detect them.

```js
function doubleClicked() {
  doubleClickCount += 1;
}
```

Done!!

{% include p5-editor.html id="F8LMdAsUR" %}

But, it gets kind of boring to click so many times to get our ellipse to a certain size. Let's say we just want to be able to stretch it out temporarily by dragging the mouse.

This requires a couple of extra variables and a bit of extra logic.

First, we need to detect when the mouse is pressed (button is down), which is different than a click when the button goes down and then up. When we detect a press, we'll record the `mouseX` and `mouseY` position not only so we can move our ellipse later, but also so we can calculate the distance of our drag action.

```js
function mousePressed() {
  mX = mouseX;
  mY = mouseY;
}
```

While the mouse is being dragged, we will calculate and store the sum of how far it has moved from the press location in the `x` and `y` directions. The `mouseX` and `mouseY` variables are the current coordinates of our mouse, and `mX` and `mY` are the coordinates of where the mouse was when we pressed the button.

```js
function mouseDragged() {
  dragDistance = abs(mouseX - mX) + abs(mouseY - mY);
}
```

Now in our `draw()` function we can just combine all of these contributions to the ellipse's diameter:
```js
let mDiam = 20 + 4 * clickCount + 12 * doubleClickCount + dragDistance;
```

We just have to remember to clear the `dragDistance` variable when the mouse is released because there is no more drag happening:

```js
function mouseReleased() {
  dragDistance = 0;
}
```

{% include p5-editor.html id="OHzE0gVvKG" %}

## Keyboard Events

Just like with the mouse, p5.js also has event functions that get called when an user interacts with the keyboard.

The [`keyPressed()`](https://p5js.org/reference/#/p5/keyPressed) and [`keyReleased()`](https://p5js.org/reference/#/p5/keyReleased) functions can be defined to specify behavior and actions that we want our sketch to take when keys are pressed or released.

If we want to pick a random grey value for our ellipse every time a key is pressed, we just have to define a `keyPressed()` function in our sketch:

```js
function keyPressed() {
  fillColor = random(256);
}
```

{% include p5-editor.html id="3-RyfP72P" %}

Similar to the `mouseX` and `mouseY` variables, we can query the special p5.js [`key`](https://p5js.org/reference/#/p5/key) and [`keyCode`](https://p5js.org/reference/#/p5/keyCode) variables anywhere in our code to determine which keys are being pressed.

The difference between `key` and `keyCode` is that `key` holds the letter associated with a key on the keyboard, while `keyCode` has a numerical value associated with that key. The `keyCode` variable is useful when we want to detect non-letter keys, like the left-, right-, up- and down- arrows, the delete and escape keys, etc.

We can use key codes to move an ellipse around the screen and the `key` variable to reset its position:

{% include p5-editor.html id="G5khlkjBI" %}

We can almost program a simple video-game now!

## Interactions wih Time

The p5.js library also gives us variables and functions that allow us to interact with time.

*WHAT?!?!*

Yeah. Let's say we want something to happen at a specific time of day, or based on the current hour, or after a certain number of seconds has passed... that's how we interact with time. We'll soon see how to use these functions and variables to create [animations](../animations/), but for now, let's just see what they are and how to use them.

Let's say we want our background to change color periodically. In order to do that we'll need a variable that records the last time time there was a background change, and then, once $$1$$ seconds has passed, change the color and update the variable.

We'll use the p5.js [`millis()`](https://p5js.org/reference/#/p5/millis) function to get the number of milliseconds (thousandths of a second) that have elapsed since the start of our sketch (since the `setup()` function was first called).

{% include p5-editor.html id="tvK-cfBDp" %}

We can also use the current time to change parameters of our sketch.

Let's say we want our background to be black at midnight, white at noon and then black again at midnight.

We can use the [`hour()`](https://p5js.org/reference/#/p5/hour) function to get a value between $$0$$ and $$23$$ and then use it to calculate the background color. We have to do some math to change the afternoon hours in the range $$[13, 23]$$ into values in $$[11, 1]$$ in order to get the colors to go back to black after noon.

```js
if (currentHour > 12) {
  currentHour = 24 - currentHour;
}
```

{% include p5-editor.html id="44k3JJiWk" %}

We'll see more about these functions when we look at animations.

## Mouse Fun

Let's put some of these concepts together and create some more interesting sketches.

Instead of just drawing an ellipse where our mouse is with `mouseX` and `mouseY`, we can use an array to keep track of our mouse position history and draw lines connecting every location it has been.

```js
function mouseMoved() {
  mPos.push({ x: mouseX, y: mouseY });
}
```

Now our `mouseMoved()` function is responsible for adding points to the `mPos` array, and in `draw()` we go through every object in the array and draw lines connecting them.

{% include p5-editor.html id="t6Fh4L2ov" %}

This is cool, but let's add a time component to this to make older positions disappear.

When we push our coordinates into the array, we'll also include a number for the line segment weight:

```js
function mouseMoved() {
  mPos.push({ x: mouseX, y: mouseY, w: 24 });
}
```

Now, in our `draw()` function we'll have two steps: first, we'll decrease the `w` value of every position we've saved and remove positions whose `w` value has become smaller than $$0.5$$. Then, in the second step, we'll draw line segments using the remaining positions in the array, using the `w` parameter in the `strokeWeight()` function.

This gives a cool trail effect to our mouse movements.

{% include p5-editor.html id="PlO4G39KH" %}

We can change this slightly to have it only add points when the mouse is dragged, and only update the weights if the mouse is not pressed.

In order to avoid unwanted interactions between new lines and old lines, we'll have to clear the `mPos` array whenever a new line is started:

```js
function mousePressed() {
  mPos.splice(0, mPos.length);
}
```

And we'll change our `w` update logic a little bit to make older lines fade faster once the mouse is released:
```js
let updateCount = mPos.length - i + 2;
mPos[i].w *= 0.99 ** updateCount;
```

{% include p5-editor.html id="Xm6YSR2Mm" %}
