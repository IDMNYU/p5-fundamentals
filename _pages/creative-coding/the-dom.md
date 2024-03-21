---
title: The DOM
---
We are now going to look at p5js's functions for accessing and manipulating the DOM.

Before we get started, it might be helpful to review our [Browser and JavaScript](../../intro/javascript/) material.

First, The DOM (Document Object Model) is just the official way of referring to the collection of HTML elements that make up a webpage. These are the `<p>`, `<img>` and `<a>` elements for holding text, images and links, and also some more complex elements, like `<canvas>` elements, where our p5.js sketch gets drawn or `<video>` and `<audio>` elements for displaying different kinds of media on a webpage.

<div class="scaled-images left w75">
  <img src = "{{ '/assets/images/creative-coding/dom-00.jpg' | relative_url }}"/>
</div>

Usually, these elements and their content are defined in the html file for the webpage, and any special behavior is specified using a separate JavaScript file. We might have a button defined in our html file and then a JavaScript file would specify what happens when that button is clicked.

Somewhere in the html we could have something like this:
```html
<button onclick="displayTime()">Display Time</button>
```

And then in a JavaScript file:
```js
function displayTime() {
  let time = new Date();
  alert(time);
}
```

In this example, the `displayTime()` function uses the JavaScript `alert()` function to show a popup with the current time and date. Don't worry about the details; it's just a simple example of html with JavaScript to show that, traditionally, html defines the *what* of our webpages and then JavaScript defines the *how*.

Elements in a webpage that are *static*, or, don't have to move around or change, will be defined in the html. Elements that are created based on user interaction can be created in the JavaScript file and added to the webpage's DOM *dynamically*.

Nowadays it's become more common to use frameworks like [Angular](https://angular.io/), [React](https://react.dev/), [Vue](https://vuejs.org/) or [Svelte](https://svelte.dev/) to create webpages with elements that have more complex behaviors, like submitting forms, accessing databases, validating passwords, etc.

And even though p5.js is not the best tool to create these kinds of websites and interactions, it provides us with a [bunch of functions](https://p5js.org/reference/#group-DOM) to create and manipulate html elements on the page.

One important thing to note is that, the code for our sketch gets drawn in a `<canvas>` element that is part of our html page. All of the elements that we add with the p5.js DOM functions will get added to our html page, and *NOT* our canvas. They're two separate, but connected worlds. And even though we can make DOM elements show up on top of our canvas, they're not *in* our canvas.

Keep that in mind as we go through these examples and start using DOM elements in our sketches.

## Links and Text
We can add links to our sketch like this:

{% include p5-editor.html id="0Z8_vyT_f" %}

And we can use our p5.js `draw()` and `mouseClick()` functions to dynamically calculate the position for a link, or to dynamically keep adding links as we click:

{% include p5-editor.html id="ahTW1X3gU" %}

This is fine and fun, but unless there's a real good reason for creating these kinds of static elements dynamically in our p5js, it's best to have them defined and positioned in the html file, and styled with css.

Creating elements to display dynamic content that comes from the p5.js sketch could be more useful. For example, we can create elements to display our mouse's position and the current frame rate:

{% include p5-editor.html id="sQ7CuXm9B" %}

The same thing can be achieved using the p5.js `text()` function, but what's nice about using a [`p5.Element`](https://p5js.org/reference/#/p5.Element) is that it's easy to detect interactions on those elements by attaching listeners to their `mousePressed()`, `mouseOver()`, etc, events:

{% include p5-editor.html id="eEUbnkAGI" %}

## Inputs
[`p5.Elements`](https://p5js.org/reference/#/p5.Element) become really useful in situations where we want to create some simple user input elements.

We can use the `createSlider()` function to create an html `<input>` element of type `range`. Then, in `draw()` we use the object's `value()` function to access its current value and use it to change the background and text colors.

{% include p5-editor.html id="NjRVzW4-8" %}

We can also create html `<button>` elements in a similar way, and, kind of like what we saw above with the `<p>` elements, attach a function to its `mouseClicked()` event:

{% include p5-editor.html id="wcZUxkBO4" %}

We can combine our button with the sliders in a way that every time the button is clicked, the sliders get updated with the new RGB values for the background:

{% include p5-editor.html id="dxQ4kJY04" %}

The more correct way of doing this in 2024 is using an `<input>` element of type `color` that creates a browser-specific color picker element with a lot of options:

{% include p5-editor.html id="D_WYJs4FK" %}
