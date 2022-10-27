let variable1 = 45;
let variable2 = "Hello world";
let variable3 = false;
let variable4 = [1, 2, 3];
let variable5;


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  text("variable1 holds " + variable1 + ", which is a " + typeof(variable1), 100, 100);
  text("variable2 is " + variable2 + ", which is a " + typeof(variable2), 100, 150);
  text("variable3 is " + variable3 + ", which is a " + typeof(variable3), 100, 200);
  text("variable4 is " + variable4 + ", which is a " + typeof(variable4), 100, 250);
  text("variable5 is " + variable5 + ", which is a " + typeof(variable5), 100, 300);
}
