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
expo = randomVal(3, 5)
satLevel = 1//randomVal(1, 2)
satRadius = randomInt(w*2, h)
lumLevel = randomVal(1, 2)
lumRadius = randomInt(w, h)
xShadow = fxrand()
yShadow = fxrand()*0.5
contrast = randomVal(5, 8)
flipped = randomIntEven(0, 3)
maxCent = randomInt(5, 100)
accExpo = 0.5


//Stack parameters
colNums = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, ]
minCols = 2
maxCols = 100
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
  lumCenter = createVector(map(xShadow, 0, 1, 0, w), map(yShadow, 0, 1, 0, h))
}

function draw() {
  //Basic prep
  translate(-w/2, -h/2)
  c.background(bgc)
  cRot = randomInt(0, 360)
  cScl = map(sin(cRot/4), -1, 1, 1, 1.75)
  p.translate(w/2, h/2)
    p.rotate(cRot)
    p.scale(cScl)
    p.translate(-w/2, -h/2)

  //Sketch
  fullStack(rows)
  circles(rows)

  // cCirclePack()
  // showSquares()

  //debug c layer
  // p.stroke('red')
  // gradLine(w/2, 0, w/2, h, 100, randomVal(0.25, 4))
  //p.copy(c, 0, 0, w, h, Math.floor(marg), Math.floor(marg), Math.floor(w-(marg*2)), Math.floor(h-(marg*2)))
  p.copy(c, 0, 0, w, h, 0, 0, w, h)
  // p.noFill()
  // p.stroke('white')
  // p.strokeWeight(10)
  // //p.rotate(cRot)
  // p.circle(lumCenter.x, lumCenter.y, 200)
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
