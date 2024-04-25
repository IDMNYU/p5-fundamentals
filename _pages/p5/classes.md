---
title: Classes
---

We’ve been learning about [arrays](../arrays/) and [objects](../objects/), and those structures work really well to organize data: values that are related to each other can be grouped and accessed in different ways.

Let's review our object exercise. We have an array of obstacles, and each obstacle is an object that keeps track of its `x` and `y` positions, `diameter`, `fill color` and `overlap color`.

{% include p5-editor.html id="-A0-X1RFb" %}

## Classy Code

What if we also want to group behavior and functionality along with these values? So, not only do we want to store the `diameter` and the `x` and `y` positions of an obstacle, but we also want to define *how* they behave and what happens when they collide with each other or the mouse.

Right now the `draw()` function is responsible for checking for overlap. This can get really messy if we keep adding functionality or complexity to our obstacles, like, drawing multiple shapes upon overlap.

This is a perfect case for using classes. We can think of classes as being super objects: objects store values indexed by names; classes do that too, but they also store their own functions for manipulating those values.

The overall structure for defining a class looks something like this:

```js
class ClassName {
  constructor(param0, param1) {
    // initialize some internal values and properties
  }

  functionName() {
    // do stuff with the internal values and properties
  }
}
```

Class definitions have a special function called `constructor()` that is used to initialize *instances* of our class and define internal variables. Class definitions also contain other functions that are specific to the class and are used to manipulate the internal values and parameters of class *instances*.

What are *instances*?

Let’s look at an example. We’ll redefine our obstacles from the example above to use an `Obstacle` class. We don't need to define any behavior for these objects, so our class will only have a `constructor()` for now.

In the constructor, when we want to assign values for an instance's `x`, `y`, `diameter` and `color` parameters, we prepend those variable names with the word `this`, to make it explicit that those values belong to one *instance* of the class `Obstacle`, more specifically, these values belong to the new obstacle that we’re creating with the `constructor()` function.

And, since the obstacles are in a class now, the way we create a new obstacle based on our `Obstacle` class definition, is using the word `new`. This line of code will run the `constructor()` function in our `Obstacle` class definition and return a new *instance* of an `Obstacle`, with its own values for `x`, `y`, `diameter` and color parameters:
```js
let anObstacle = new Obstacle();
```

We can even put that inside a loop to create multiple *instances* of `Obstacle` objects, each with their own parameters. The way we access a class instance parameters is exactly like how we access a plain JavaScript object's parameters: using *dot notation*.

If we have this in the constructor:
```js
this.x = 10;
this.y = 100;
this.r = 24;
```

We can instantiate an object and access its *member* variables like this:
```js
let mObs = new Obstacle();
print("x is: ", mObs.x, " y is: ", mObs.y);
```

{% include p5-editor.html id="mguZfHieR" %}

## Classy Behavior

So, other than the class definition and how we instantiate our obstacles in `setup()`, not much has changed: the rest of the code, specially the code in `draw()`, has stayed exactly the same. The only difference is that now the parameters for each obstacle have been put inside a class object. The `draw()` function is still doing all of the work of checking for overlap with the mouse ellipse, but now each obstacle's parameters come from a class object, not a plain JavaScript object. Let’s move that logic to functions inside our class.

Since we only care about overlap with the mouse ellipse, let's call that function `hovered()` and only check for overlap with the mouse ellipse. Since all of the information about the obstacle is available within itself using the `this` operator, the `hovered()` function doesn't need any input parameters.

{% include p5-editor.html id="yXqOkazQG" %}

The resulting overall behavior is the same, but all of the logic necessary for defining the functionality of our obstacles is now inside our `Obstacle` class definition and that makes it easier for us to read and update our code and add new functionality and behavior to our obstacles.

## Classy Encapsulation

Now that we have a way to *encapsulate* parameters, behavior and functionality for our obstacles inside a class, we can draw slightly more complex shapes when there's an overlap with the mouse ellipse.

In order to fully *encapsulate* this inside the class objects, let's create a function inside our class that will be responsible for checking for overlap and for drawing the shape based on the result of the check. The logic will be similar to what is implemented in `draw()`, but now it will be the object's responsibility to check for overlap and draw itself.

{% include p5-editor.html id="ViqfYSmWw" %}

This is what *encapsulation* means: we've separated the internal logic of our obstacles from our main `setup()` and `draw()` functions. If we look at the loops in our `setup()` and `draw()` functions, they are very easy to read and understand. One creates new `Obstacle` objects, the other draws every `Obstacle` object.

```js
setup() {
  // ...
  for (let i = 0; i < numObs; i++) {
    let anObstacle = new Obstacle();
    allObstacles.push(anObstacle);
  }
}

draw() {
  // ...
  for (let i = 0; i < allObstacles.length; i++) {
    let anObstacle = allObstacles[i];
    anObstacle.draw();
  }
}
```

If we are interested in the details of what happens inside our `Obstacle` objects we can look at the class implementation separately.

## Classy Drawings

Let's add fancier drawings to our obstacles when they are hovered over by the mouse ellipse.

We'll draw $$4$$ concentric ellipses instead of just one, with varying opacity and diameter values, where larger ellipses are more transparent and get drawn first.

This calculation turns the sequence $$(0, 1, 2, 3)$$ into the following transparency values $$(64, 128, 192, 256)$$:
```js
let mAlpha = ((i + 1) / 4) * 256;
```

And this turns the sequence $$(0, 1, 2, 3)$$ into the following multipliers for the original diameter value $$(4, 3, 2, 1)$$:
```js
let mDiameterMultiplier = 4 - i;
```

Now when the mouse hovers over an obstacle, concentric circles get drawn, but all of the logic is implemented inside the `Obstacle` class: our main `setup()` and `draw()` functions stayed the same.

{% include p5-editor.html id="ohl3IUqHL" %}

Now it's easier to add even more obstacles to our sketch and have obstacles with different number of *rings*.

{% include p5-editor.html id="RZ4BP5rgse" %}
