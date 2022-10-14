function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(fxrand() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
function randomVal(min, max) {
  return fxrand() * (max - min) + min;
}
function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function shuff(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(fxrand() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }


  return array;
}

function plusOrMin(x) {
  n = fxrand()
  if(n < 0.5) {
    posNeg = 1
  } else {
    posNeg = -1
  }

  return x*posNeg
}

function getDistance(x1, y1, x2, y2){
    let a = x2 - x1;
    let b = y2 - y1;

    return Math.sqrt(a * a + b * b);
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function keyTyped() {
  if (key === "s" || key === "S") {
    save("img.png");
  }
}

////////////////////////////////////////


function sampler() {
  offset = sz*3
  off = 0//sz/4

  for(let y = 0; y < h; y+= sz) {
    for(let x = 0; x < w; x+= sz) {
      nY = map(noise(x*noiseScaleY, y*noiseScaleY), 0, 1, -offset, offset)
      nX = map(noise(x*noiseScaleX, y*noiseScaleX), 0, 1, -offset, offset)
      col = color(c.get(x, y))
      sSample = color(s.get(x, y))
      avg = (sSample.levels[0]+sSample.levels[1]+sSample.levels[2])/3
      avgCol = [avg, avg, avg]
      lum = map(avg, 0, 255, 0.7, 0)
      // console.log(lum)

      xOff = randomVal(-off, off)
      yOff = randomVal(-off, off)

      trueCol = lerpColor(col, color('#252525'), lum)
      p.fill(trueCol)
      p.noStroke()
      nStroke = fxrand()
      if(nStroke < 0.001*sz) {
        p.strokeWeight(1)
        p.stroke(frameCol)
      } else {
        p.noStroke()
      }
      //p.circle(x+nX, y+nY, sz*0.75)
      pBlob(x+nX+xOff, y+nY+yOff, sz*0.75, randomInt(3, 6), randomInt(0, 3)*90)
    }
  }
}

//SHADOW LAYERS
function shadowCascade() {
  start = createVector(randomInt(0, w), h)
  end = createVector(randomInt(0, w), 0)
  rad = w*1.5
  for(let i = 0; i < numObjs; i++) {
    expo = 2
    x = map(pow(i, 2), 0, pow(numObjs, 2), start.x, end.x)
    y = map(pow(i, 2), 0, pow(numObjs, 2), start.y, end.y)
    s.fill(randomInt(150, 255))
    s.noStroke()
    s.drawingContext.shadowOffsetX = shadOffX;
    s.drawingContext.shadowOffsetY = shadOffY;
    s.drawingContext.shadowBlur = shadBlur;
    s.drawingContext.shadowColor = '#252525';
    sBlob(x+randomInt(-rad/4, rad/4), y-(rad*0.75), rad)
  }
}

function shadowStack() {
  start = createVector(randomInt(0, w), randomInt(0, h))

  maxR = w*2
  minR = 100
  rad = w*1.2
  for(let i = 0; i < numObjs; i++) {
    expo = 2
    rad = map(i, 0, numObjs, maxR, minR)
    s.fill(randomInt(150, 255))
    s.noStroke()
    s.drawingContext.shadowOffsetX = shadOffX;
    s.drawingContext.shadowOffsetY = shadOffY;
    s.drawingContext.shadowBlur = shadBlur;
    s.drawingContext.shadowColor = '#252525';
    sBlob(start.x, start.y, rad/2)
  }
}

function shadowCutout() {
  start = createVector(randomInt(0, w), randomInt(0, h))
  //start = createVector(w/2, h/2)
  maxR = w*1.5
  minR = 200
  rad = w*1.5
  for(let i = 0; i < numObjs; i++) {
    expo = 2
    rad = map(pow(i, 2), 0, pow(numObjs, 2), minR, maxR)
    s.fill(randomInt(150, 255))
    s.noStroke()
    s.drawingContext.shadowOffsetX = shadOffX/2;
    s.drawingContext.shadowOffsetY = shadOffY/2;
    s.drawingContext.shadowBlur = shadBlur;
    s.drawingContext.shadowColor = '#252525';
    sCutout(start.x, start.y, rad)
  }
}

//COLOR LAYERS

function circlePackColor() {
minR = 10
maxR = 200
num = 0
tries = 0
  while(num < numCircsColor) {
    //create a new circle object
    thisC = new Circ(randomVal(0, w), randomVal(0, h), randomVal(minR, maxR))

    //set overlap to default false
    valid = true
    for(let j = 0; j < circlesColor.length; j++) {
      //reference past circles
      prevCirc = createVector(circlesColor[j].x, circlesColor[j].y)
      thisCirc = createVector(thisC.x, thisC.y)
      //calculate distance between circles
      distance = thisCirc.dist(prevCirc)
      minDist = (thisC.r)+(circlesColor[j].r)
      //check if they overlap
      if(distance < minDist) {
        valid = false
        break
      } else {
        valid = true
      }
    }
    //if no overlaps then place circle
    if(valid == true) {
      circlesColor[num] = thisC
      num += 1
    }
  }
}

function circlePackShadow() {
minR = 10
maxR = 200
num = 0
tries = 0
  while(num < numCircsColor) {
    //create a new circle object
    thisC = new Circ(randomVal(0, w), randomVal(0, h), randomVal(minR, maxR))

    //set overlap to default false
    valid = true
    for(let j = 0; j < circlesShadow.length; j++) {
      //reference past circles
      prevCirc = createVector(circlesShadow[j].x, circlesShadow[j].y)
      thisCirc = createVector(thisC.x, thisC.y)
      //calculate distance between circles
      distance = thisCirc.dist(prevCirc)
      minDist = (thisC.r)+(circlesShadow[j].r)
      //check if they overlap
      if(distance < minDist) {
        valid = false
        break
      } else {
        valid = true
      }
    }
    //if no overlaps then place circle
    if(valid == true) {
      circlesShadow[num] = thisC
      num += 1
    }
  }
}

function showCircsColor() {
  for(let i = 0; i < circlesColor.length; i++) {
    circlesColor[i].show()
  }
}

function showCircsShadow() {
  for(let i = 0; i < circlesShadow.length; i++) {
    circlesShadow[i].showShadow()
  }
}

function waterColor() {
  for(let i = 0; i < colLayers; i++) {
    col = truePal[randomInt(0, truePal.length)]
    coord = createVector(randomInt(0, w), randomInt(0, h))
    alph = 0.035
    c.fill(chroma(col).alpha(alph).saturate(2).hex())
    c.noStroke()

    cBlob(coord.x, coord.y, randomInt(0, 400))
  }
}


function pColour() {
  for(let i = 0; i < colLayers; i++) {
    col = truePal[randomInt(0, truePal.length)]
    coord = createVector(randomInt(0, w), randomInt(0, h))
    alph = 0.1
    p.fill(chroma(col).alpha(alph).saturate(4).hex())
    p.noStroke()

    pBlob(coord.x, coord.y, randomInt(0, 400))
  }
}

//UNIVERSAL BY LAYER

function sBlob(x, y, rad) {
  maxNoise = sBlobNoise
  rot = randomInt(0, 360)
  s.push()
  s.translate(x, y)
  s.beginShape()
  for(let i = rot; i < 360+rot; i+=1) {
    xoff = map(cos(i), -1, 1, 0, maxNoise)
    yoff = map(sin(i), -1, 1, 0, maxNoise)
    r = map(noise(xoff, yoff, phase), 0, 1, rad/2, rad)
    xA = cos(i)*r
    yA = sin(i)*r
    s.vertex(xA, yA)
  }
  s.endShape(CLOSE)
  s.pop()
  phase += phaseInc
}

function cBlob(x, y, rad) {
  maxNoise = cBlobNoise
  c.push()
  c.translate(x, y)
  c.beginShape()
  for(let i = 0; i < 360; i++) {
    xoff = map(cos(i), -1, 1, 0, maxNoise)
    yoff = map(sin(i), -1, 1, 0, maxNoise)
    r = map(noise(xoff, yoff, phase), 0, 1, rad/2, rad)
    xA = cos(i)*r
    yA = sin(i)*r
    c.vertex(xA, yA)
  }
  c.endShape(CLOSE)
  c.pop()
  phase += phaseInc
}

function pBlob(x, y, rad, numSides, rot) {
  maxNoise = pBlobNoise
  p.push()
  p.translate(x, y)
  p.beginShape()
  for(let i = rot; i < 360+rot; i+=360/numSides) {
    xoff = map(cos(i), -1, 1, 0, maxNoise)
    yoff = map(sin(i), -1, 1, 0, maxNoise)
    r = map(noise(xoff, yoff, phase), 0, 1, rad/2, rad)
    xA = cos(i)*r
    yA = sin(i)*r
    p.vertex(xA, yA)
  }
  p.endShape(CLOSE)
  p.pop()
  phase += phaseInc
}

function sCutout(x, y, rad) {
  maxNoise = sBlobNoise
  rot = randomInt(0, 360)
  s.push()
  s.translate(x, y)
  s.beginShape()
  s.vertex(-w/2, -h/2)
  s.vertex(w/2, -h/2)
  s.vertex(w/2, h/2)
  s.vertex(-w/2, h/2)
  s.beginContour()
  for(let i = rot; i > -360+rot; i-=1) {
    xoff = map(cos(i), -1, 1, 0, maxNoise)
    yoff = map(sin(i), -1, 1, 0, maxNoise)
    r = map(noise(xoff, yoff, phase), 0, 1, rad/2, rad)
    xA = cos(i)*r
    yA = sin(i)*r
    s.vertex(xA, yA)
  }
  s.endContour()
  s.endShape(CLOSE)
  s.pop()
  phase += phaseInc
}
