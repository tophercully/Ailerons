w = 1200
h = 1500
marg = w* 0.025

let shade;
function preload() {
  shade = loadShader("shader.vert", "shader.frag");
}

//Declarations
circs = []

//Params
expo = randomVal(3, 7)
satLevel = 2
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

rotNoiseScale = randomVal(0.01, 0.5)
accentChance = 0.5
rectDens = 100

//Circle packing parameters
numCircs = randomInt(0, rows*0.5)
padding = 10
accentWigCircs = randomInt(200, w/2)
noiseScaleWig = randomVal(0.001, 0.025)
noiseScaleWidth = randomVal(0.01, 0.1)/rows
maxCircR = 150
minCircR = 10
circDens = 100

nMono = fxrand()
idents = [
  ' A', ' B', ' C', ' D', ' E'
]
accIdent = idents[acc]

if(nMono < 0.1) {
  mono = true
  palName = 'MonoChrome'
  accIdent = ''
} else {
  mono = false
}


window.$fxhashFeatures = {
  "Palette": palName + accIdent,
  "Background": bgName,
  "Contrast": Math.round(map_range(contrast, 5, 8, 1, 10)),
  "Diffusion": Math.round(map_range(expo, 7, 3, 0, 10))
}
console.log(palName + accIdent)

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
seed = randomInt(1, 100000000000000000)
function draw() {
  //Basic prep
  noiseSeed(seed)
  randomSeed(seed)
  c.noiseSeed(seed)
  c.randomSeed(seed)
  p.noiseSeed(seed)
  p.randomSeed(seed)
  translate(-w/2, -h/2)
  c.background(bgc)
  cRot = randomInt(0, 360)
  cScl = map(sin(cRot/4), -1, 1, 1, 1.9)
  p.translate(w/2, h/2)
    p.rotate(cRot)
    p.scale(cScl)
    p.translate(-w/2, -h/2)

  //Sketch
  fullStack(rows)
  circles(rows)
  cCirclePack()
  showCircs()
  //Bring graphics onto canvas
  p.copy(c, 0, 0, w, h, 0, 0, w, h)

  //Post processing
  copy(p, 0, 0, w, h, 0, 0, w, h)
  bgc = color(bgc)
  shader(shade)
  shade.setUniform("u_resolution", [w, h]);
  shade.setUniform("p", p);
  shade.setUniform("seed", randomVal(0, 10));
  shade.setUniform("marg", map(marg, 0, w, 0, 1));
  shade.setUniform("mono", mono)
  shade.setUniform("bgc", [
    bgc.levels[0] / 255,
    bgc.levels[1] / 255,
    bgc.levels[2] / 255,
  ]);

  rect(0, 0, w, h)
}
