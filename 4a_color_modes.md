<script src="//toolness.github.io/p5.js-widget/p5-widget.js"></script>

<script type="text/p5" data-height="600" data-preview-width="200">
  
  // color
// from Interaction of Color by Josef Albers
/*
 If one says "Red" (the name of a color)
 and there are 50 people listening,
 it can be expected that there will be 50 reds in their minds
 And one can be sure that all these reds will be very different
*/

// In a computer we are faced with a different problem than the above.
// we have a discrete 'red' that can be referred to in
// a number of different ways- 
// rgb values, hex values, as a hue, or by the HTML color name)
// but all monitors will display that red differently

// this sketch will display the dame color 4 different ways
// look at it on different devices, is there a difference 
// between them? which seems like the 'true' red to you?

// the setup() function runs once
function setup() {
  // create a canavas 400px/400px
  createCanvas(400, 400);
  // by default, the color mode is RGB - red, green, blue
  // this allows us to describe colors as numeric values
  // between 0-255 for each of the channels 
  // if a channel has a value of 0, there will be none of that color
  // if it has 255, it will be full on for that color.
  // (255, 0, 0) is "all red, no green, no blue"
  fill(255,0,0);
  rect(0,0,199,199);

  // we can also refer to 140 diffferen colors that are
  // explitly named in the HTML specification
  // https://www.w3schools.com/colors/colors_names.asp
  fill('red');  
  rect(200,0,399,199);
  
  // a third way to describe color is by a hex code
  // this might be familiar to you if you have used
  // photoshop or illustrator or written any CSS
  // it is another way of representing a triplet of 
  // numbers between 0-255, except it counts in hexidecimal
  // you can learn more about hex and color at the following link
  // https://www.w3schools.com/colors/colors_picker.asp
  fill('#ff0000');
  rect(0,200,199,399);
  
  // p5 also gives us a way to descrine color using 
  // Hue, saturation, and Brightness. it differs from RGB
  // in that Hue describes the color itself - Saturation and
  // Brightness are attributes of the color.
  // When you call colorMode(HSB), the Hue accepts a value
  // between 0-360. The colors wrap around the rainbow
  // so that a hue of 359 is next to 0. It's often represented
  // as a circle, and makes for an easy way to do color 
  // shifting across the spectrum
  // the https://p5js.org/learn/color.html page has an 
  // illustration that is helpful for understanding this concept
  colorMode(HSB);
  fill(0,100,100);
  rect(200,200,399,399);
}

  </script>
