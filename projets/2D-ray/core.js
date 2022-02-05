let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 10000;
let carte = [];

const sceneW = 400;
const sceneH = 400;

const w_width = 1360;
const w_height = 765;

function setup() {

  createCanvas(w_width, w_height);

  for (let x = 0; x < 10; x++) {

    let row = [];
    
    for (let j = 0; j < 10; j++) {

      row[j] = Math.round(Math.random()*4);

    }

    carte[x] = row;

  }

  for (let i = 0; i < carte.length; i++) {

    for (let j=0; j < carte[i].length; j++) {

      if (carte[i][j] == 1) {

        let R = 255;//Math.round(Math.random()*255);
        let G = 0;//Math.round(Math.random()*255);
        let B = 0;//Math.round(Math.random()*255);

        let x = [0,1,1,0];
        let y = [0,0,1,1];

        x = x.map(v => v*40 + j*40);
        y = y.map(v => v*40 + i*40);

        walls.push(new Wall(x[0], y[0], x[1], y[1], R, G, B));
        walls.push(new Wall(x[1], y[1], x[2], y[2], R, G, B));
        walls.push(new Wall(x[2], y[2], x[3], y[3], R, G, B));
        walls.push(new Wall(x[3], y[3], x[0], y[0], R, G, B));

      }

    }

  }

  walls.push(new Wall(0, 0, sceneW, 0, 25, 25, 25));
  walls.push(new Wall(sceneW, 0, sceneW, sceneH, 25, 25, 25));
  walls.push(new Wall(sceneW, sceneH, 0, sceneH, 25, 25, 25));
  walls.push(new Wall(0, sceneH, 0, 0, 25, 25, 25));

  eye = new Particle();
}

function changeFOV(d) {
  const fov = d;
  eye.updateFOV(fov);
}

function draw() {
  if (keyIsDown(LEFT_ARROW)) {
    eye.rotate(-0.1);
  } else if (keyIsDown(RIGHT_ARROW)) {
    eye.rotate(0.1);
  } else if (keyIsDown(UP_ARROW)) {
    eye.move(2);
  } else if (keyIsDown(DOWN_ARROW)) {
    eye.move(-2);
  }

  background(0);
  for (let wall of walls) {
    wall.show();
  }
  eye.show();

  const scene = eye.look(walls)[0];
  const red = eye.look(walls)[1];
  const green = eye.look(walls)[2];
  const blue = eye.look(walls)[3];
  const w = (w_width-sceneW) / scene.length;
  push();
  translate(sceneW, w_height/4);
  for (let i = 0; i < scene.length; i++) {
    noStroke();
    //const sq = scene[i] * scene[i];
    //const wSq = sceneW * sceneW;
    //const b = map(sq, 0, wSq, 255, 0);
    const R = red[i] * (1 - scene[i] / Math.sqrt( (sceneW / 1.5)**2));
    const G = green[i] * (1 - scene[i] / Math.sqrt( (sceneW / 1.5)**2));
    const B = blue[i] * (1 - scene[i] / Math.sqrt( (sceneW / 1.5)**2)); 
    const h = map(scene[i], 0, sceneW, w_height, 0);
    fill(R, G, B);
    rectMode(CENTER);
    rect(i * w + w / 2, sceneH / 2, w + 1, h);
  }
  pop();

  // ray.show();
  // ray.lookAt(mouseX, mouseY);

  // let pt = ray.cast(wall);
  // if (pt) {
  //   fill(255);
  //   ellipse(pt.x, pt.y, 8, 8);
  // }
}
