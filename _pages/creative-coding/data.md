---
title: Loading Data (JSON/CSV)
---

We've seen how [arrays](../../p5/arrays/) and [objects](../../p5/objects/) can be used for organizing our data, and also how to use `for()` loops to create, store and process values in those structures. We've also seen how the [`map()`](../maths/) function can be used to transform input values in different ranges and units into parameters for visualizations.

We can now look at ways of acquiring, processing and visualizing data that has been previously created and stored in files locally or online.

## JSON

In order to do that we'll make use of a file format called [JSON](https://en.wikipedia.org/wiki/JSON), or, JavaScript Object Notation. *JSON is an open standard file format and data interchange format that uses human-readable text to store and transmit data objects*. If we take a look at a JSON file we'll see that it's structured exactly like a JavaScript object, with data organized into key-value pairs:
```json
[
	{ "zip": 10001, "rent": 4230, "bedrooms": 2 },
	{ "zip": 10012, "rent": 1830, "bedrooms": 1 },
	{ "zip": 10217, "rent": 3400, "bedrooms": 1 },
	{ "zip": 11217, "rent": 2160, "bedrooms": 1 },
	{ "zip": 11238, "rent": 2690, "bedrooms": 2 }
]
```

In this case we have an array of objects, each of which has $$3$$ key-value pairs. The syntax is almost exactly like in JavaScript, with the only exception being that the keys in a JSON file have to have the quote symbols (" ") around their names. It's no surprise that we can almost just read a JSON file directly into a JavaScript variable, and even less surprising that p5.js has some functions that will help us do just that.

The [`loadJSON()`](https://p5js.org/reference/#/p5/loadJSON) function takes the location of a JSON file (stored locally or online), and returns a JavaScript object with the data from the file. Since the file could be large, or be coming from somewhere else on the internet, it could take a long time to download and cause our sketch to freeze and become unresponsive.

One way to avoid this situation is to define a special functions (like `setup()` and `draw()`) that p5.js will use to fetch and load any data before it starts running any other part of our code.

If we look at the documentation for the [`preload()`](https://p5js.org/reference/#/p5/preload) function, it says that it's a function that is called once, immediately before `setup()`, that guarantees that any data loading happens before we start the sketch. It's also important to note that, according to the documentation, *Nothing besides load calls (`loadImage()`, `loadJSON()`, `loadFont()`, etc.) should be inside the preload function*.

This is how we define our `preload()` to load a JSON file from the internet:
```js
let data;

function preload() {
  let url = "https://data.com/rent.json";
  data = loadJSON(url);
}
```

The `url` variable could also specify a local file, but regardless, by the time the `setup()` function runs, our `data` variable will already have all of the information that is inside the `rent.json` file, and we can then use `for()` loops to process it however we want:

{% include p5-editor.html id="OWvUgepQs" %}

Some things to note about the above sketch:

1. We are loading a local file, so the location that we pass to the `loadJSON()` function specifies a file called `Winemag_100.json` that is located in the same folder as our `sketch.js` file.

2. We first load the JSON into a variable called `dataObject` and then in `setup()` use that variable and some JavaScript functions to actually put the contents of the file into an array that we can iterate. This is not necessary all the time, only when our file specifies an array and we want to work with an array. If we look at the p5.js documentation for [`loadJSON()`](https://p5js.org/reference/#/p5/loadJSON), it says: *Note that even if the JSON file contains an Array, an Object will be returned*. We use: `Object.values(dataObject)` to turn the Object into an array.

3. During `setup()` we are iterating through all of the data points in our dataset to determine the minimum and maximum values for $$2$$ properties (`price` and `points`). This is needed so we can use [`map()`](https://p5js.org/reference/#/p5/map) later in `draw()` to scale these values and use the whole canvas to visualize the data (a detailed explanation of `map()` can be found [here](../maths/)).

One more thing about parameters/fields from a JSON: sometimes the field names will have spaces ("final price", "CRASH TIME") or special characters ("pm2.5", "U$D") and accessing them with just the dot notation won't work:
```js
data[i].pm2.5; // error
data[i].U$D; // error
data[i].final price; // error
data[i].CRASH TIME; // error
```

In these cases, we have to use brackets, just like when accessing an array, except instead of a number for the index we pass the data field name in quotes (" "):
```js
// these work
data[i]["pm2.5"];
data[i]["U$D"];
data[i]["final price"];
data[i]["CRASH TIME"];
```

## CSV
In addition to JSON, there's another file format that is used often for storing and transmitting structured data: Comma-Separated Values, or, CSV. In some ways this format is a little bit easier to read, because it is less redundant and is very much like a spreadsheet, since it organizes data into rows and columns.

An example CSV file, with the same data as our JSON file above, could look like:

```csv
zip,rent,bedrooms
10001,4230,2
10012,1830,1
10217,3400,1
11217,2160,1
11238,2690,2
```

The name of the parameters (sometimes called *features* or *fields*) are specified in the first row of the file, and after that, each row represents one data point, with their feature values separated by commas (,).

It's good to know about both JSON and CSV because sometimes the data we want to use is only available in one of the two formats.

Luckily, p5.js also has functions to help us load, process and use tabular data in CSV files. The [`loadTable()`](https://p5js.org/reference/#/p5/loadTable) function is very similar to `loadJSON()`, because it downloads the file, reads it, and organizes the data in a way that is easier to access in the rest of our sketch.

Just like `loadJSON()`, `loadTable()` should also be placed inside our `preload()` function.
```js
let data;

function preload() {
  let url = "https://data.com/rent.json";
  data = loadTable(url, "csv", "header");
}
```

After this, the data will be available in the `data` variable, but unlike the case with a JSON file, the data is not in a JavaScript object or array, but in a [`Table`](https://p5js.org/reference/#/p5.Table) object. This object has some special functions that we have to use in order to iterate over its contents.

Instead of using `data.length` to know how many data points are in our dataset, we now have to use `data.getRowCount()`. And instead of accessing the data using array and object indexing like `data[i].price`, we have to use `data.getNum(i, "price")`. We can see how those are similar, in both cases we are specifying which data point we want using a number index $$i$$, and then which of its fields we want using a string name, like "price".

Let's take a look at a full example that does the same thing as the JSON example above:

{% include p5-editor.html id="A6W6rQWWE" %}

Just like in the JSON example, we first calculate the minimum and maximum values in the `price` and `points` fields, so we can later scale the values in those fields and use the whole canvas when drawing our visualization.
