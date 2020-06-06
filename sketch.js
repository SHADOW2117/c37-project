var drawing = [];
var database;
var db = [];
var button;

function setup() {
  createCanvas(1350,600);
  database = firebase.database();
  button = createButton("reset");
  button.position(20,30);
}

function draw() {
  background(0);  
  readData();
  beginShape();
  noFill();
  stroke("red");
  strokeWeight(10);
  for(var i= 0; i<db.length; i++){
    vertex(db[i].x, db[i].y);
    endShape();
  }
  //rest function
  button.mousePressed(()=>{
    db = [];
    drawing = [];
    database.ref('drawing').remove();
  })
}

function mouseDragged(){
  var point = {x: mouseX, y: mouseY};
  drawing.push(point);
  database.ref('drawing').update({
    d: drawing
  });
}

function readData(){
  database.ref('drawing/').on("value", (Data)=>{
    db = Data.val().d;
  });
}