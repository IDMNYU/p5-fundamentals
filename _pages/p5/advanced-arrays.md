---
title: Advanced Arrays
---

Since arrays are so very often used in programming, and not only to store information, but also to manipulate and organize information, most programming languages will have not just a way to specify arrays, but lots of built in functions and variables that can be used when working with arrays.

We saw some of these in the previous [tutorial about arrays](../arrays/): `push()` and `length`. The [`push()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) function is used when we want to add elements to the end of the array, and the [`length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length) variable when we want to know the size of the array:

{% include p5-editor.html id="5TJYOc0Xl" %}

In this sketch we are adding random diameter values to an array every time the mouse is clicked, and during `draw()` we draw ellipses based on those diameters. Since we can't tell beforehand how many times the mouse has been clicked, we can't foretell how many values we have in our array, so we rely on `length` to set the limit for the `for()` loop in `draw()`.

We are also limiting the maximum number of elements in our array to $$10$$. If during a click event we detect that we already have $$10$$ elements in the array with: `(myDiameters.length > 9)`, we remove the first element before adding a new $$10^{th}$$ element.

## Manipulating Arrays

The way to remove the first element of an array is using the special builtin function [`shift()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift). If we keep clicking and adding new diameters we can see why (maybe?) the function is called shift: as we remove elements from the front of the array (index $$0$$), and add new elements to the back of the array (index $$9$$), our drawing seems to shift to the left.

We can do the reverse: add elements to the front of the array and remove from the back with [`unshift()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) and [`pop()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop), respectively:

{% include p5-editor.html id="Hq2pjvxEA" %}

Let's pretend that now, for aesthetic reasons, we want to draw our diameters in order from smallest to largest. We can make use of the special [`sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) function:

{% include p5-editor.html id="jnOgEyxik" %}

After we add a new element we sort the array of diameters from smallest to largest. As we keep clicking through this example we'll notice something strange: it seems like all the circles drawn just keep growing.

If we think about how we are adding and removing elements this will make sense. We are always removing the first element of the array, and since we are using a sorted array now, that element is always the smallest. As we click the mouse it's like we are filtering out the smallest element in our array and over time are left with only the larger ones.

What if we don't want to remove the smallest element, but still want to draw the circles in order? In addition to our array with the elements in their original order, we could have a sorted copy of our array that we only use for drawing, but not for adding and removing elements.

Luckily this is such a common case that JavaScript also has a function that does that for us:

{% include p5-editor.html id="EYLThxCIc" %}

The function is called [`toSorted()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted), and it's very similar to `sort()` except, where `sort()` does the sorting on the original array, `toSorted()` first makes a copy of the array and then returns the copy after sorting it.

There are a couple of other special array functions that come in pairs like that: with an "*in place*" version that does something to the original array, and a "*copying*" version, that copies the array before processing it and returning the copy. For example, the "*in place*"[`reverse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse), and its "*copying*" version [`toReversed`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed).

## Functions as Parameters to Functions

Now, let's say that instead of just the $$10$$ diameters we have an array that holds up to $$100$$ circle [objects](../objects/):

{% include p5-editor.html id="QXvrUA6dg" %}

Similar logic as before, but now with every click we add between $$8$$ and $$16$$ elements to our array, until we get to $$100$$ elements and clear the array to start over.

Another difference is that now our array holds full circle objects, with `x`, `y` and `d` parameters.

The `for()` loop that draws our circles works. It's a good `for()` loop. But, if we look at what's happening inside the `for()` loop we'll notice that all of the parameters used by the `ellipse()` function are coming from the object `aCircle[i]`.

When we have this situation, where we want to get every element of an array and do something with it, and don't have to update any other variables or objects, there's a different way to ask for the array to iterate over its elements:

{% include p5-editor.html id="DhLOKnElN" %}

First, we define a function called `drawCircle()`. This function takes one argument, which will be one of our circle objects with `x`, `y` and `d` parameters, and draws an ellipse using those values. Easy. Then, in our `draw()` function, when we want to iterate over all of the elements of the array and draw our circles, we can use the special function [`forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

This function is special in many ways: first, it's one of those builtin functions that come with a JavaScript array. Besides that, it's also special because it's a function that takes a function as an argument 🤯. The way to think about this is to imagine we are asking our array to run this function on every one of its elements, using the elements as arguments.

This is some really advanced array'ing ! And the code becomes a little more concise and arguably more "semantic" (the commands we are using describe the meaning of what we want the computer to do). Instead of a generic `for()` loop with a counter variable, a conditional statement and an update, we are now telling the array "for each one of your elements, do this: drawCircle()".

## Processing Arrays

Once we know how to pass functions to functions we can really start doing some fancier processing of the data in our arrays, like filtering our array by values inside the elements:

{% include p5-editor.html id="wV23pLR6dN" %}

If we look at at the documentation for the [`filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) function we'll see that it takes a function as its parameter and returns a copy of the array, but only with the elements that pass the filter function. What this means is that it runs the function on every element of the array and if the function returns true that element is copied into the new array, if not, it doesn't make it into the array.

In the example above, there's a function called `fullyInside()` that returns `true` if a circle element is entirely within the canvas. When we pass that function to `filter()` it will call the function with each element of our array and only keep the circles whose shape is entirely visible in the canvas.

In our code, we first call the `filter()` function on the original array, and since `filter()` returns a copy of the array, our original array (`myCircles`) still has circles that are slightly outside the canvas. And because `filter()` returns an array, that array has a `forEach()` special function that can be called with our previously defined `drawCircle()` function to draw all of the filtered circles:

```js
let filteredCircles = myCircles.filter(fullyInside);
filteredCircles.forEach(drawCircle);
```

Try to write your own filter function. Maybe it removes elements that are too close to the center of the canvas... or all the small circles...

## Custom Sorting

We can also sort our array by one of the properties of the circles. This is similar to filtering, but a little more advanced, and since it's such a common operation it's worth to take a look at and even if it's not entirely clear now, we can always come back to this tutorial when we need to do something like this.

If our array elements are all numbers or words, `sort()` just works without any arguments, but since what we are trying to sort here are circle objects, JavaScript doesn't really know how to handle those (should it sort them by `x` values? by `y`? by `d`?).

Let's first change our sketch a bit and draw our circles close to the center on our canvas:

{% include p5-editor.html id="TK9D8hlkL" %}

So, now we are not storing absolute x and y positions anymore, but small random variations to add to $$\frac{width}{2}$$ and $$\frac{height}{2}$$.

If you click through you'll see that most of the circles get covered by larger circles, sometimes we see lots of circles, other times very few, but we never see all of our circles (you can add `noFill()` to the draw function to see). That's why we want to sort them from largest to smallest before drawing.

If we look at the documentation for [`sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) it says we can pass a compare function to `sort()` that defines the sort order. This compare function takes $$2$$ arguments `A` and `B` and the return value should be a number whose sign indicates the relative order of the two elements: negative if `A` is less than `B`, positive if `A` is greater than `B` and zero if they are equal.

So something like this should work to sort our objects using their diameters:

```js
function orderByDiameter(circleA, circleB) {
  return circleA.d - circleB.d;
}
```

{% include p5-editor.html id="y7ga_B5Dm" %}

Hmmm.... oh. Right. Since we followed the documentation to create our `orderByDiameter()` function, we are actually telling `sort()` to order things from smallest to largest. There are two ways of fixing this. The first way, and perhaps simpler, is to just [`reverse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse) the array after it's been sorted:

```js
myCircles.sort(orderByDiameter).reverse();
```

This works, but we're processing the array twice, once to run  `sort()` and then again for `reverse()`. And without knowing how exactly JavaScript does those operations, it might be doing a lot of unnecessary work. It would be better to just sort it once, but in the reverse order.

To do that we can create a different sort function that returns the opposite of the previous one:

```js
function orderByDiameterReverse(circleA, circleB) {
  return -(circleA.d - circleB.d);
}
```

And here's the result, drawing the circles ordered from largest to smallest so we can see all of them:

{% include p5-editor.html id="COQJ7lSPY" %}

Both options are there in the sketch above, and we can turn them on and off with comments to see that they do the same thing.

## Possibility

And now, we can add some new parameters to our circle object, like: color and rotation velocity, to create some kind of hypnotizing machine:

{% include p5-editor.html id="RNW4ev8dd" %}
