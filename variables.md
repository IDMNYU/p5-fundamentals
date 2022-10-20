# Variables

Variables provide a sense of memory to our programs. Without variables, programs forget things as soon as we’re done with them. It’s not a very efficient method, like buying a new water bottle every time you want a drink. Instead of being wasteful, let’s save the planet and use something over and over again. 
A variable, as its name implies, can vary — or change — over time. This variance allows us to do all sorts of fun things not just in the moment, but by projecting into the future, and looking back to the past.
There are a couple things that need to be done with variables to use them. You need to declare the variable (what is it called?), initialize the variable (does it have an initial value?), and make changes (vary it over time).
When you want to declare a variable in javascript, you use the keyword `let`. As in “let this word mean what I’m setting it to”.
If you’re familiar with other programming languages like Java or C++, or used Processing or Arduino, you’re familiar with declaring a type of variable like byte, int, long, or string. While all these datatypes exist in javascript, the language does not need these types to be identified when initializing variables. 
The general kinds of data you’ll find in variables in javascript include :
- numbers — floating point numbers and integers are represented as 64-bit values. An integer is a whole number like 10 or -4532, or 12,376,593. A float has a decimal point, like 3.14, or 0.0974389247, or -5267.3746928
- strings — text that is encapsulated inside single ' or double " quotes. There are many ways of working with strings, [w3schools](http://www.w3schools.com/js/js_string_methods.asp), the [Mozilla Development Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/) (MDN), and [Javascript.info](https://javascript.info/types#a-string/) all have good reference information for strings and string manipulation. 
- Boolean — `true` or `false`
- Arrays — used to store multiple objects or pieces of information that typically are similar.
- Objects — a collection of various properties, or properties and functionality bundled together. 
- Null and undefined — a variable that has not been given a value is undefined. You can "empty" a variable by setting it to null
You can find out what type of data is in your variable with the `typeof` command. (needs example)
You declare a variable like this :
```
let value;
let threshold=666;
```
In the first instance, you’re not giving the variable an initial value. Until you assign a value with an `=`, the variable will be `undefined`. In the second instance, you’re declaring "the variable named threshold equals six-hundred-sixty-six."
Variable names can be anything that start with a letter or underscore and contain no spaces. They should be informative, and it’s usually helpful to camelHump them. Variables can also be used to name items like colors, so that you have easily identifiable names for things in your program.
Variables have scope. This means that some are global, and available anywhere in your program, while others are local, and can only be seen in the block of code in which they are declared. Global variables are declared at the top of your program. Local variables are declared inside a function or loop.
To update a variable, you can use `=`, just as above.
There are other ways of incrementing/decrementing numbers and applying math to a variable, or manipulating text. The examples will walk you through different ways of setting and changing variables.
P5.js has a number of built in variables that do not need to be declared - these include ways of describing the canvas size, the mouse position, keys that are pressed, time, and other things that may change over time.
 
 ## Examples
- [Create variables](https://editor.p5js.org/shfitz/sketches/qLmPWLA1e)
- [Global v local, datatypes](https://editor.p5js.org/shfitz/sketches/4L1XqeYFL)
- [Freebie variables in p5js (width, height, mouseX, mouseY)](https://editor.p5js.org/shfitz/sketches/IhVA4oVSj)
- [Basic math , string manipulation](https://editor.p5js.org/shfitz/sketches/4L1XqeYFL)
