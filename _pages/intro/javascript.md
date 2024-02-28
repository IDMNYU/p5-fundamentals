---
title: The Browser and JavaScript
---
## The Internet

Since JavaScript is a language that was originally designed to run on browsers over the internet, it could be useful to understand a little bit more about the internet and how it works.

<div class="scaled-images">
  <img src="{{ site.baseurl }}/assets/images/intro/internet-00.jpg">
</div>

To put it simply, The Internet is just other people's computers. There is no cloud, nor matrix, just a bunch of really big, hot and well-connected computers, called servers, that live in warehouses and store files that our phones and computers can download.

<div class="scaled-images">
  <img src="{{ site.baseurl }}/assets/images/intro/internet-01.jpg">
</div>

The process is similar for other types of services, but when we access a URL with our browser, our computer sends a request to one of these servers, asking for a particular file at the specified address. Requests made to URLs like `p5js.org` or `nyu.edu` are actually asking for a file called `index.html` that lives in the `p5js.org` (or `nyu.edu`) server computers.

<div class="scaled-images">
  <img src="{{ site.baseurl }}/assets/images/intro/request-00.jpg">
</div>

## The Browser

When our browser makes a correct and authorized request to a server, asking for an `html` file, the server responds with a text file with `html` code:

<div class="scaled-images">
  <img src="{{ site.baseurl }}/assets/images/intro/request-01.jpg">
</div>

The `html` code might look something like this:
```html
<html>
  <head>
    <title>My Homepage</title>
    <link href="style.css">
    <script src="sketch.js"></script>
  </head>
  <body>
    Page Content
    <img src="image.gif">
  </body>
</html>
```

It's not very important right now to understand `html` in detail. We should just know that it's a language mostly used to specify the content that our browser should display for us and how that content should be organized on the screen.

A lot of this content is text, and links, but more often than not, the `html` file will also reference other files, like image or video files. When the browser sees these references in the `html` code, it makes additional requests to the server, asking for those files.

<div class="scaled-images">
  <img src="{{ site.baseurl }}/assets/images/intro/request-02.jpg">
</div>

<div class="scaled-images">
  <img src="{{ site.baseurl }}/assets/images/intro/request-03.jpg">
</div>

Other common types of files referenced by `html` are `css` files and `JavaScript` files. These are special because, unlike media files that the browser just has to show to us, they are files that change *how* the browser shows content and how it behaves.
`css` files usually specify the style of webpages. They tell the browser how to format the content in the `html` file: which fonts to use, what size the text should be, the colors of different elements, etc.

<div class="scaled-images">
  <img src="{{ site.baseurl }}/assets/images/intro/request-04.jpg">
</div>

<div class="scaled-images">
  <img src="{{ site.baseurl }}/assets/images/intro/request-05.jpg">
</div>

If a webpage was an apartment, the `html` file defines where the walls, doors and windows should go, while the `css` file specifies their materials and colors. Once the `css` file is downloaded, the browser has to go back through the content in the `html` file and apply the styles specified.

JavaScript files, on the other hand, describe how the browser should behave and what it should do with the content of the `html` file as a user interacts with it. The analogy might be running out of steam, but JavaScript might be the specification of what should happen when different light switches are pressed in an apartment.

## Javascript

Once a JavaScript file (usually a `.js` file) is downloaded, the browser will start a separate parallel process to read and execute the commands specified in this file, while the `html` file and `css` file finish figuring out how to display the page's content.

JavaScript code is different than other code because it's specified in a text file that the browser reads and executes, line-by-line. It's different from code that can run directly on your computer's hardware, or code that your operating system is responsible for running. Instead, JavaScript is an *interpreted* language, as it requires another program (usually a browser) to read its files and execute them.

<div class="scaled-images">
  <img src="{{ site.baseurl }}/assets/images/intro/JavaScript.jpg">
</div>

In the early days of the internet, before JavaScript was a fully developed language recognized by all browsers, websites were pretty *static*. Once the `html` and `css` files were downloaded and the content was styled and displayed, the browser's job was done and we could look at the digital equivalent of a printed newspaper.

Nowadays, JavaScript is responsible for so much of what happens in the browser, that even after a `js` file is downloaded and executed, the browser's JavaScript engine (the hidden part of the browser responsible for running JavaScript code) has to keep running parts of the code repeatedly in order to handle user interactions.

And JavaScript has become such a general purpose language that it has been used to create almost any kind of program. Not only can we play most time of media using JavaScript, but now we can also use it to create, process and edit media in real time, inside our browsers.

TODO:
....
