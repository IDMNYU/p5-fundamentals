---
title: Loops as Patterns
---
## On Repeat

It's very common in programming to want to repeat calculations on different data/inputs. For example, when processing images or sound, we'll often want to rerun the same code on different pixels/samples. Creating visual or sound patterns also involves repeating some computation over and over, with slight modifications.

There are many ways to get our program to rerun portions of our code, like the `while` and `do`/`while` commands, and [list comprehensions](https://en.wikipedia.org/wiki/List_comprehension), but the simplest way, and the one less prone to tricky bugs, is the `for` loop.

## For Loops

We are going to take a look at for loops and how to parametrize and nest them.

First, let's start with a simple sketch that draws circles:

{% include p5-editor.html id="RIw-EBN5e" %}

But, 😱 ....  there's so much repeated code and so much that can be improved here...

First, variables! Let's make it so we can easily change circle diameter, start location and spacing:

{% include p5-editor.html id="eIciIRIbO" %}

Better ! This way we can easily change the size of our circles (`cDiam`), where they start (`xOffset`), the distance between their centers (`xSpacing`) and their vertical location (`yPos`). Take some time to change those variables and re-run the code to see exactly what each of them does. Fun, right? But we're still repeating a bunch of code!

`for()` loops to the rescue! We can refactor the code above using this structure:

```js
for(start; condition; increment) {
  // do stuff
}
```

Where:
- `start` is an expression that initializes variables we will use in our loop
- `condition` is a boolean expression that specifies what keeps the loop running
- `increment` is an expression that runs at the end of each iteration

{% include p5-editor.html id="yCTAMB2Hb" %}

The resulting drawing is a little bit different; the circles go right off the canvas. We can try to control that in a couple of ways.

The first way is to use our `xOffset` variable to stop the for loop once `xPos` gets to `width - xOffset` instead of `width`:

{% include p5-editor.html id="8aAz3QjKm" %}

The second way requires more changes to the code, so we can keep track of the number of circles instead of where they are being drawn:

{% include p5-editor.html id="HSm5NKWcx" %}

There's a lot of new stuff there. We declared a new variable `numCircles` that defines how many circles we want to draw (7 for now). In our `for` statement we have `cCnt` now, which keeps track of the number of circles drawn. It iterates from 0 to `numCircles`. In this case it goes from $$0$$ to $$6$$. *Wait... what!? Weren't we drawing 7 circles??* Yes!, but if we count from $$0$$ to $$6$$ $$(0, 1, 2, 3, 4, 5, 6)$$ that's actually $$7$$ numbers. That's a bit confusing at first, but we'll see this a lot and get used to the fact that in programming we usually start counting from 0.

What about this: `let xPos = xOffset + cCnt * xSpacing;`?

That's how we calculate the xPosition of our circles based on how many circles we've drawn in our loop. The first time the loop executes `cCnt` is 0, so `xPos = xOffset + 0 * xSpacing` or `xPos = xOffset`. That seems right.

In the second iteration that becomes `xPos = xOffset + 1 * xSpacing`. The xPosition of the center of the second circle is the initial offset plus 1 amount of spacing between circle centers. In the third iteration it's `xPos = xOffset + 2 * xSpacing` because there's the initial offset plus 2 amounts of spacing for the 2 circles already drawn. We can play around with the variable values to get a better feeling for the math behind this calculation.

It's important to take a moment here and understand the difference between the two methods of drawing the circles. In the first case our loop variable and stop condition is based on the location of the circles and in the second case it's based on the number of circles drawn.

Let's go back to the first way (by location) and add some variables for looping in the other direction:

{% include p5-editor.html id="5jGMXDOXb" %}

Take some time to play with the variables to see how they affect our drawing.

## For Loops With For Loops

And now, let's say that when we're looping in the horizontal direction, instead of drawing one circle for every location of `xPos` we want to draw an entire column of circles?

Nested `for()` loops to the rescue! We can just copy the whole loop statement that draws a column of circles and put that inside the first loop that iterates in the horizontal direction (and make sure the `ellipse()` command uses the `xPos` and `yPos` variables):

{% include p5-editor.html id="28Cn1Jm1t" %}

Now we can play with all the variables and see how they change the drawing:

{% include p5-editor.html id="x7siTe66c" %}

Or we can start adding variations to the circles based on their position, like, changing color based on the x and y location for the circle:

{% include p5-editor.html id="i4jEMnah8" %}

Or, increase diameter along with the x position:

{% include p5-editor.html id="WlYELno6E" %}

Or, color based on x position and size based on y position:

{% include p5-editor.html id="-ESdy4zlH" %}

## For Loops With For Loops With For Loops...

And if we really want to stretch our looping abilities we can add another level of `for()` looping to draw concentric circles at each x and y position:

{% include p5-editor.html id="RULC2evDI" %}

Take some time to play with this code and make sure all the variables and loops make sense.

Loops are very powerful constructs in programming. Looking at the code above, we're drawing many many circles (how many exactly?), but our code only has one line with one `ellipse()` command.

As always, since we are using variables everywhere we can change their values or use them to change our circle at each iteration of our loop:

{% include p5-editor.html id="-SVhzd5m3" %}
