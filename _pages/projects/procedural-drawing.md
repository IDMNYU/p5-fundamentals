---
title: Procedural Drawing Machine
---

## Prerequisites

This mini-project draws on materials from:

- [Shapes and Colors](../../p5/drawing/)
- [Conditionals](../../p5/conditionals/)
- [Loops as Counters](../../p5/counters/)
- [Functions](../../p5/functions/)
- [Arrays](../../p5/arrays/)
- [Classes](../../p5/classes/)
- [Translations and Transformations](../../creative-coding/transformations/)
- [Interactions](../../creative-coding/interactions/)
- [Animations](../../creative-coding/animations/)
- [State Variables](../../creative-coding/state/)

Let's get started.

## Setup

In this project we will create an automatic, unpredictable, procedural, drawing machine.

*What?!*

Yeah!

What this means is: we'll create a sketch with a few autonomous agents that move around our canvas, and then, we'll use them to draw shapes depending on their positions and some other special conditions that we have to define.

Our project will have at least two modes: in one mode we will see the agents moving, and in the other(s) we'll see the resulting drawing(s). We'll use the mouse to toggle between the modes, and the 'R' and 'S' keys to reset and save our drawings.

An initial skeleton of our sketch could have the following structure and pseudo-code:

{% include p5-editor.html id="y53VeHqwa" %}

Filling in our code, the logic to detect mouse and keyboard events and update state, could look like this:

{% include p5-editor.html id="eUnEHNWiz" %}

Now we just have to fill in the rest.

We'll start by writing some pseudo-code for our `Agent` class:

{% include p5-editor.html id="3yje3bbLZ" %}

Once we have the class definition and its functions, we can fill in some of the rest of the code in `setup()` and `draw()` even though none of the class is written:

{% include p5-editor.html id="zovsJ1fGz" %}

## Update

And now, finally, let's fill in some of our class, starting with the constructor and the `drawAgent()` function, and some pseudo-code for `update()`:

{% include p5-editor.html id="CpcX_dT7f" %}

For our `update()` function we might want to try different strategies for the boundary checks, so let's write a couple of functions that we can use later:

`bounceBoundary()`: when an agent gets to the edge of the canvas it will bounce back towards the center. This requires a change in the direction of one of its velocity components.

`wrapBoundary()`: when an agent goes off the canvas on one side, it shows up on the opposite side. This keeps the same velocity, but requires an update in the agent's position.

`resetBoundary()`: when an agent reaches the edge of the canvas it disappears and is re-created at a new random position, with new velocity and diameter parameters.

{% include p5-editor.html id="tXjjgdTos" %}

The same is true for how we update the position of the agents. Let's have a couple of strategies that we can test later:

`updateByVelocity()`: the agent's new position is determined by its constant velocity values.

`updateRandom()`: the agent's new position is determined by a random velocity value that changes every frame.

`updateNearest()`: the agent's position is determined by a *repulsion* velocity that is proportional to how close it is to other agents. In this strategy, the agents will try to spread out over the canvas.

{% include p5-editor.html id="YIivQqhZu" %}

Hmmm.... this looks odd:
```js
let sortedByDist = agents.toSorted(this.distComp.bind(this));
```

*What's with the `bind(this)`?*

If we look at the `distCom()` function definition we'll see that it uses `this` to order a pair of agents based on their distances to `this`:
```js
distComp(agentA, agentB) {
  let distA = dist(this.x, this.y, agentA.x, agentA.y);
  let distB = dist(this.x, this.y, agentB.x, agentB.y);
  return distA - distB;
}
```

The problem is that when we send the `distComp()` function as a parameter to the `toSorted()` function, the `this` variable will have a different meaning because `toSorted()` is actually a method of the array class, so `this` is gonna refer to the `agents` array.

In order to make sure `this` keeps referring to an `Agent` object during sorting, we have to add `.bind(this)` to the function before we send it to `toSorted()`.

But, no worries. Once we have that working we can even re-use it during drawing.

## Draw

Let's add some drawing strategies to our `Agent` class:

`drawAgent()`: draws an ellipse at the agent's location.

`drawPoint()`: draws a single pixel at the agent's location.

`drawFurthest()`: draw a line between each agent and the agent furthest away from it.

`drawNearest()`: draw a line between each agent and the agent closest to it.

`drawOverlap()`: draw an ellipse between two agents when they overlap.


{% include p5-editor.html id="uHaz0JWfB" %}

Let's clean up our code a bit and test our functions.

We can remove the text labels since those were only there to test the state logic. Also, since we want our drawing to stay on the canvas we should move the `background(255)` command from `draw()` to the state change in `mouseClick()`.

And we can begin by looking at what happens when we pair `updateNearest()` with `resetBoundary()`. We'll just include those in our Agent's `update()` function:

```js
update() {
  this.updateNearest();
  this.resetBoundary();
}
```

{% include p5-editor.html id="sVZ4ziA0F" %}

Then, `updateByVelocity()` with `bounceBoundary()`:

{% include p5-editor.html id="p8Aon1YV7" %}

And `updateRandom()` with `wrapBoundary()`:

{% include p5-editor.html id="JmQiFH4FF" %}

But, for all of these, only the `AGENT_MODE` is drawing anything. Let's create some new *MODES*, one for each of our drawing functions and cycle through them as we click the mouse.

Now, the `draw()` function inside our `Agent` class is gonna be responsible for using the right drawing method based on the state of the `currentMode` variable.

This is the result when using the `updateNearest()` and `resetBoundary()` strategies:

{% include p5-editor.html id="jmczGnvdS" %}

And it's easy to see all the drawings with the other combinations of update and boundary strategies.

`updateByVelocity()` with `bounceBoundary()`:

{% include p5-editor.html id="6P4slX71w" %}

and `updateRandom()` with `wrapBoundary()`:

{% include p5-editor.html id="BmSObJNns" %}

And, really, now the possibilities are endless. We can experiment with all possible combinations of update and boundary functions, and increase the number of agents to get more overlaps.

Try it out below!

{% include p5-editor.html id="p6h71pXE7" %}
