---
title: Setting up p5.js
---
We previously saw how to set up our [local development environment](../../intro/ide/).

Now, let's see how to start a p5.js project.

## Files

The most basic way of starting a project is to just create an empty directory somewhere on our computer:

{% include video.html url="p5/setup-00.webm" width="66" %}

Next, we can open this directory in VSCode and create two empty files inside it: `index.html` and `sketch.js`.

{% include video.html url="p5/setup-01.webm" %}

### html

Let's start with the `index.html` file since this is the file that gets loaded first when we access our project in a browser. This file is responsible for loading a few other files with JavaScript code, and setting up a couple of basic `html` elements where the results of our JavaScript code can be drawn.

[THIS](https://github.com/IDMNYU/p5-fundamentals/blob/main/_pages/p5js-template/index.html) is what a basic p5.js project `index.html` file looks like. We can just copy the contents of this file into the empty `index.html` file in our local directory.

We don't have to understand everything in this file, but a few lines are worth highlighting:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@1.7.0/lib/p5.js"></script>
<script src="sketch.js"></script>
```

These two lines load the JavaScript code used by our project. The first line loads the p5.js library from a CDN (Content Delivery Service: a server online). This file contains a bunch of pre-written code that we will use in our project.

The second line loads our `sketch.js` JavaScript file from the same directory as our `index.html` file.

Before we look at the JavaScrip file, a few more lines of `html`:

```html
<body>
  <main id="main"></main>
</body>
```

These lines setup a blank html page, with an empty [`<main>`](https://www.w3schools.com/tags/tag_main.asp) component. This component also has an `id` attribute of `main`, which is what our JavaScript code will look for when it starts drawing things to the screen.

### JavaScript

We will write our project's code in the `sketch.js` file, and we should, eventually, understand everything that it contains.

A very simple `sketch.js` file that we can start with, can look like this:

```js
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220, 20, 20);
  ellipse(120, 120, 50, 50);
}
```

We can copy these lines into our empty `sketch.js` file or download the file form [HERE](https://github.com/IDMNYU/p5-fundamentals/blob/main/_pages/p5js-template/sketch.js).

This file has two sections, one called `setup` and another called `draw`. Commands for the `setup` section are grouped within its brackets (`{` `}`), just like the commands for the `draw` section are grouped within brackets.

Most of our p5.js projects will be organized this way, with a `setup` section that usually sets up some parameters for our project, followed by a `draw` section, which runs repeatedly and is responsible for actually drawing (shapes, images, etc) on the screen and handling user interactivity, amongst other things.

Right now our `setup` section just specifies that we want a canvas that is as big as our browser's window, and our `draw` section just fills up our canvas with a red background and draws an ellipse somewhere near the upper left-hand corner of our page's window.

How can we check? We'll get a browser to load up our project and see.

## Local Server & IDE

The easiest way to preview our p5.js projects while developing them locally is to open them up in a browser.

But, since the browser treats *local* files on our computer differently than it treats files that it opens from the internet, and eventually we will want our projects to be available on the internet, we have to trick our browser into opening up our local files as if they were coming from the internet.

In other words, in oder to see our project in a browser we have to *serve* our project files as if they were a complete webpage living on a [server](../../intro/javascript/).

Luckily, we can use our VSCode IDE and the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension to easily create a local server for our project.

All we have to do is navigate to our project directory in VSCode and click the "Go Live" button towards the lower right-hand side of the window. This will start a local server and open a browser with our project:

{% include video.html url="p5/setup-02.webm" %}

And now that the server is running, any changes we make to our project code will be reflect on the browser:

{% include video.html url="p5/setup-03.webm" %}

And that URL for our project, `http://127.0.0.1`, is only accessible from our own computer, so the project is ready to be hosted online, but isn't yet on the internet.
