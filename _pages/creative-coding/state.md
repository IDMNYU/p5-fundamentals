---
title: State Variables
---

Once we start detecting input from the mouse and keyboard, and start building more complex animations we'll soon find the need to remember certain interactions or sequences of interactions.

Let's say we want the user to change the background color using the mouse, and for this first simple example, every time the mouse is clicked a random color is selected for the background.

{% include p5-editor.html id="BWiFcetz_" %}

What if now we only want to allow colors from a set of pre-selected tones that we like? One way to do that is to declare a global variable outside of both `setup()` and `draw()` to keep track of which color our background should be.

In this example, `bgColorIndex` is a variable that holds a number between $$0$$ and $$3$$ and keeps track of which color we should use for the background. Every time the mouse is clicked we check which color should be displayed, increment the color index and display the new color. The `bgColorIndex` variable cycles from $$0$$ to $$3$$ $$(0, 1, 2, 3, 0, 1, 2, 3, 0, 1, ...)$$, and the background color cycles from the initial pink color to `gold` to `darkGreen` to `darkBlue` and then back to the initial pink.

{% include p5-editor.html id="SL-BHbHi2" %}

We say `bgColorIndex` is a *global* *variable* because it's declared outside any function, and this way, all functions in our sketch can read it and update it. This kind of variable is useful for keeping track of values that change due to user interactions while our sketch is running.

And, in this case our `bgColorIndex` variable is also a *state* variable because it keeps track of which color was chosen by the user through their interaction. It's a variable that is being used to remember something about the history of our sketch.

## Counting Clicks

Let's extend the previous example: instead of keeping track of a color index we'll use a variable to keep track of mouse clicks and then select a color and a shape based on the number of times the mouse has been clicked during the execution of our sketch.

In this example we'll have $$7$$ colors to cycle through and $$2$$ shapes, but if we keep track of the number of clicks and use the modulo operator (`%`) we can easily cycle through both shape and color options using only one state variable.

{% include p5-editor.html id="RiDDLNT3L" %}

## Short-Term Memory

Now, let's take a look at an example where we keep track of more than one value from the user.

In this sketch we keep track of mouse events and their location in order to draw a rectangle between where the mouse was pressed and released. In order to achieve that, we create a global variables called `mouseDown` to store an object with the location where the mouse was last pressed down. Once the mouse is released we can use those variables to set our rectangle location and, along with `mouseX` and `mouseY` from the release, calculate the rectangle width and height.

{% include p5-editor.html id="hld-ujC__" %}

Let's try a similar interaction, but now the rectangle is drawn between two locations specified by mouse clicks, instead of a click and a release. In this case we need to not only keep track of the location of the first mouse click, but also keep track of whether it's the first or second mouse click.

We still only need one variable, `rectStart`, for keeping track of the location where the mouse was clicked. And we can use this same variable to determine whether we are detecting the first or the second mouse click in a sequence of clicks.

If one of the values of `rectStart` is a $$-1$$, we are detecting the start location of the rectangle, otherwise, if `rectStart` already has valid locations, it's the second click and we use `mouseX` and `mouseY` to draw the rectangle and then reset `rectStart`.

{% include p5-editor.html id="dLt3pt3aU" %}

## Moments

We can use a global state variable to define *moments* in our sketch, like, if we need to keep track of which level of a game we're suppose to draw.

As a simpler example, let's say we want to present an intro screen before playing an animation. We can use a variable that keeps track of whether we are waiting for the user to click the mouse, or if the animation has already started, and draw completely different canvases based on the situation:

In this case we display an intro screen and when the user clicks the mouse it starts an animation. Once the animation starts clicks have no effect. The state diagram for this situation would be something like:

<div class="scaled-images left w75">
  <img src = "{{ '/assets/images/creative-coding/state-00.jpg' | relative_url }}"/>
</div>

Since we only have two possible states (`Intro` and `Animation`), we can use a boolean value (`true` or `false`) to keep track of the current state and pick which screen to draw.

{% include p5-editor.html id="CHJaUgDUZ" %}

## More States

If, instead, we want to allow the user to pause the animation once it has begun, we could implement the following state transitions:

<div class="scaled-images left w75">
  <img src = "{{ '/assets/images/creative-coding/state-01.jpg' | relative_url }}"/>
</div>

Now we have $$3$$ states and we'll have to use a number to keep track of which of the states we are in. We can use the numbers $$0$$, $$1$$ and $$2$$ for our `Intro`, `Animation` and `Pause` states respectively, and in each execution of `draw()` we'll choose what to draw based on which state we are in, and in each execution of `mouseClicked()` we will update our current state.

In this particular sketch we can achieve the effect of pausing by just not doing anything. This happens because if we don't call `drawIntro()` nor `drawAnimation()`, we don't clear the canvas, the position of our shape is not updated and nothing new is drawn to the screen.

{% include p5-editor.html id="5pvWETd-0" %}
