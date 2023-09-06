// variables to hold the color values
let r, g, b;

function setup() {
  createCanvas(400, 400);
  r = createSlider(0, 255, 200);
  r.position(6, 10);
  g = createSlider(0, 255, 100);
  g.position(6, 50);
  b = createSlider(0, 255, 200);
  b.position(6, 90);
}

function draw() {
  background(r.value(), g.value(), b.value());
  fill(255 - (r.value() + g.value() + b.value()) / 3);
  text('Red: ' + r.value(), 10, 42);
  text('Green: ' + g.value(), 10, 82);
  text('Blue: ' + b.value(), 10, 122);
}

// print out the color when you let go of the mouse
function mouseReleased(){
   console.log("color val: ("+r.value()+","+g.value()+","+b.value()+")");
}
