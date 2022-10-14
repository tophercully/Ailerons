w = 1200
h = 1500
marg = 10

let shade;
function preload() {
  shade = loadShader("shader.vert", "shader.frag");
}

//Declarations
phase = 0
phaseInc = 10
circlesColor = []
circlesShadow = []
numCircsColor = randomInt(100, 300)
numCircsShadow = randomInt(100, 300)

sz = randomInt(3, 10)

numObjs = randomInt(5, 20)
colLayers = 2000

shadowType = randomInt(1, 4)
colorType = 1//randomInt(1,)

pBlobNoise = randomVal(0.25, 3)
sBlobNoise = 1.5//randomVal(0.25, 3)
cBlobNoise = randomVal(0.25, 3)

shadOffX = plusOrMin(randomInt(200, 500))
shadOffY = plusOrMin(randomInt(200, 500))
shadBlur = randomInt(20, 300)
console.log(shadOffX, shadOffY)

pRot = randomVal(90, 180)

noiseScaleX = randomVal(0.001, 0.005)
noiseScaleY = randomVal(0.001, 0.005)

function setup() {
  createCanvas(w, h, WEBGL);
  pixelDensity(2)
  p = createGraphics(w, h)
  s = createGraphics(w, h)
  c = createGraphics(w, h)
  angleMode(DEGREES)
  p.angleMode(DEGREES)
  s.angleMode(DEGREES)
  c.angleMode(DEGREES)
  noLoop()
  p.noLoop()
  s.noLoop()
  c.noLoop()

  circlePackShadow()

}

function draw() {

  translate(-w/2, -h/2)
  p.background(bgc)
  s.background('white');
  c.background('white')

  // s.translate(w/2, h/2)
  // s.rotate(randomInt(0, 360))
  // s.translate(-w/2, -h/2)

  if(colorType == 1) {
    waterColor()
  } else if (colorType == 2) {
    showCircsColor()
  } else if(colorType == 3) {
    showCircsColor()
  }

  //shadowCascade()
  if(shadowType == 1) {
    shadowStack()
  } else if (shadowType == 2) {
    shadowCascade()
  } else if(shadowType == 3) {
    showCircsShadow()
  } else if(shadowType == 4) {
    shadowCutout()
  }



  // p.push()
  // p.translate(w/2, h/2)
  // p.rotate(pRot)
  // p.scale(map(pRot, 90, 180, 2, 3))
  //p.translate(-w/2, -h/2)
  p.copy(c, 0, 0, w, h, 0, 0, w, h)
  //p.pop()


  sampler()


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
