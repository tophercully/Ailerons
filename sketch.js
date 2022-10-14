w = 1200
h = 1500
marg = w*0.1

let shade;
function preload() {
  shade = loadShader("shader.vert", "shader.frag");
}

//Declarations



//Params
colNums = [1, 3, 5, 7, 9, 11]
minCols = 3
maxCols = 7
rows = randomInt(3, 20)
rotInc = 2.5//randomVal(0, 3)


function setup() {
  createCanvas(w, h, WEBGL);
  pixelDensity(2)
  p = createGraphics(w, h)
  angleMode(DEGREES)
  p.angleMode(DEGREES)
  noLoop()
  p.noLoop()

}

function draw() {
  //Basic prep
  translate(-w/2, -h/2)
  p.background(bgc)

  //Sketch

  //stack(h/2, 100, 0, 10)
  fullStack(rows)

  //Post processing
  copy(p, 0, 0, w, h, 0, 0, w, h)
  bgc = color(bgc)
  shader(shade)
  shade.setUniform("u_resolution", [w, h]);
  shade.setUniform("p", p);
  //shade.setUniform("p2", p2);
  shade.setUniform("seed", randomVal(0, 10));
  shade.setUniform("bgc", [
    bgc.levels[0] / 255,
    bgc.levels[1] / 255,
    bgc.levels[2] / 255,
  ]);

  rect(0, 0, w, h)
}
