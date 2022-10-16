w = 1200
h = 1500
marg = w*0.119

let shade;
function preload() {
  shade = loadShader("shader.vert", "shader.frag");
}

//Declarations
circs = []


//Params
nMode = 1//randomIntEven(1, 2)
expo = randomVal(3, 5)
satLevel = 2//randomVal(2, 3)
satRadius = randomInt(w, h)
xShadow = fxrand()
yShadow = fxrand()
contrast = randomVal(3, 5)
flipped = randomIntEven(0, 3)
maxCent = randomInt(5, 100)
accExpo = 0.5


//Stack parameters
colNums = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, ]
minCols = 1
maxCols = 50
rows = randomInt(3, 40)
maxRot = map_range(rows, 3, 40, 3, 0.25)
rotInc = maxRot//randomVal(0, maxRot)
rotNoiseScale = randomVal(0.01, 0.5)
//accentCol = 'red'//truePal[0]
accentChance = 0.5
rectDens = 100

//Sampler parameters
sz = 20//randomInt(3, 20)
gap = 0.3
noiseScaleX = randomVal(0.001, 0.001)
noiseScaleY = randomVal(0.001, 0.001)

//Circle packing parameters
numCircs = 3000
padding = 2
accentWigCircs = randomInt(200, w/2)
noiseScaleWig = randomVal(0.001, 0.025)
noiseScaleWidth = randomVal(0.01, 0.1)/rows
maxCircR = randomInt(500, h)
minCircR = 10
circDens = 50


function setup() {
  createCanvas(w, h, WEBGL);
  pixelDensity(2)
  p = createGraphics(w, h)
  c = createGraphics(w, h)
  angleMode(DEGREES)
  p.angleMode(DEGREES)
  c.angleMode(DEGREES)
  noLoop()
  p.noLoop()
  c.noLoop()
  willReadFrequently = true
  p.willReadFrequently = true
  c.willReadFrequently = true

  satCenter = createVector(randomInt(w*0.25, w*0.75), randomInt(0, h))
}

function draw() {
  //Basic prep
  translate(-w/2, -h/2)
  c.background(bgc)
  // if(flipped == 1) {
  //   c.translate(w/2, h/2)
  //   c.rotate(180)
  //   c.translate(-w/2, -h/2)
  // } else if(flipped == 2) {
  //   c.translate(w/2, h/2)
  //   cRot = 90
  //   c.rotate(90)
  //   c.scale(1.3)
  //   c.translate(-w/2, -h/2)
  // } else if(flipped == 3) {
  //   c.translate(w/2, h/2)
  //   c.rotate(-90)
  //   c.scale(1.3)
  //   c.translate(-w/2, -h/2)
  // }
  cRot = randomInt(0, 90) * randomInt(1, 4)
  cScl = map(cRot, 0, 90, 1, 2)
  c.translate(w/2, h/2)
    c.rotate(cRot)
    c.scale(cScl)
    c.translate(-w/2, -h/2)

  //Sketch

  if(nMode == 1) {
    fullStack(rows)
    circles(rows)
  } else if(nMode == 2) {
    cCirclePack()
    showCircs()
  }

  //sampler()

  //debug c layer
  // p.stroke('red')
  // gradLine(w/2, 0, w/2, h, 100, 0.5)
  p.copy(c, 0, 0, w, h, marg, marg, w-(marg*2), h-(marg*2))
  //gradLine(w/2, 0, w/2, h, 100, 0.5)

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
