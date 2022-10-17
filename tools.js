function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(fxrand() * (max - min + 1) + min); // The maximum is exclusive and the minimum is inclusive
}

function randomIntEven(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(fxrand() * (max - min + 1)) + min;
}

function randomVal(min, max) {
  return fxrand() * (max - min) + min;
}

function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function shuff(array) {
  let currentIndex = array.length-1,
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
    save("Ailerons.png");
  }
}

////////////////////////////////////////

function fullStack(numRows) {
  rot = 0
  for(let i = 0; i < numRows; i++) {
    stackHeight = h/numRows
    y = (stackHeight*i)+(stackHeight/2)
    rot += plusOrMin(rotInc)
    cols = randomInt(minCols, maxCols)
    stack(y, randomVal(stackHeight, stackHeight*10), rot, cols)

  }
}

function circles(numRows) {
  for(let i = 0; i < numRows; i++) {
    nCirc = fxrand()
    stackHeight = h/numRows
    if(nCirc < 0.2) {
      c.fill(accentCol)
      col = accentCol
      c.noStroke()
      x = randomVal(0, w)
      y = i*stackHeight
      c.push()
      raised = randomInt(10, 400)
      //cStackCircle(x, y, randomVal(10, 150), circDens, col, raised)
      c.pop()
    }
  }
}

function stack(y, stackHeight, rot, cols) {
  c.rectMode(CENTER)
  stackWidth = w/cols
  mod = randomVal(0, stackWidth*2)
  c.push()
  c.translate(w/2, y)
  c.rotate(rot)
  c.translate(-w/2, -y)

  accentDecider = fxrand()
  for(let i = 0; i < cols; i++) {
    x = i*stackWidth+(stackWidth/2)+randomInt(-mod/2, mod/2)
    wig = accentWigCircs
    wiggle = map(noise(y*noiseScaleWig), 0, 1, -wig, wig)
    center = w/2 + wiggle
    mod = map(noise(y*noiseScaleWidth), 0, 1, 0, 200)
    minX = center-mod
    maxX = center+mod
    if(x < maxX && x > minX) {
      col = accentCol
    } else {
      col = truePal[randomInt(0, truePal.length-1)]
    }
    c.noStroke()

    cStackRect(x, y, stackWidth+mod, stackHeight, rectDens, col)

  }

  c.pop()
}

function cStackRect(x, y, rectWidth, rectHeight, dens, color) {
  check = createVector(x, y)
  satDist = check.dist(satCenter)
  lumDist = check.dist(lumCenter)
  sat = map(satDist, 0, satRadius, 0, satLevel)
  lum = map(lumDist, 0, lumRadius, lumLevel, 0)
  c.push()
  c.translate(x, y)
  xOff = map(xShadow, 0, 1, -rectWidth/2, rectWidth/2)//randomVal(-rectWidth/2, rectWidth/2)
  yOff = map(yShadow, 0, 1, -rectHeight/2, rectHeight/2)//randomVal(-rectHeight/2, rectHeight/2)

  for(let i = 0; i < dens; i++) {
    offset = 0.03
    dark = map(i, 0, dens, contrast, 0) +randomVal(-offset, offset)

    sizeMod = map(pow(i, expo), 0, pow(dens, expo), 1, 0)
    xMod = map(pow(i, expo), 0, pow(dens, expo), 0, xOff)
    yMod = map(pow(i, expo), 0, pow(dens, expo), 0, yOff)
    trueCol = chroma(col).desaturate(sat).brighten(lum).darken(dark).hex()
    c.fill(trueCol)
    c.noStroke()
    crv = map(i, 0, dens, 0, rectHeight/5)
    c.rect(xMod, yMod, rectWidth*sizeMod, rectHeight*sizeMod, crv, crv, crv, crv)
    if(i == dens-1) {
      numAccents = randomInt(0, maxCent)
      for(let j = 0; j < numAccents; j++) {
        accentY = randomVal(-rectHeight/2, rectHeight/2)
        accentX = randomVal(-rectWidth/2, rectWidth/2)
        alph = randomVal(0.2, 0.6)
        c.stroke(chroma(monoCols[randomInt(5, monoCols.length-1)]).alpha(alph).hex())
        gradLine(-rectWidth/2, accentY, rectWidth/2, accentY, randomVal(0.25, 1), randomVal(0.5, 4))
        gradLine(accentX, -rectHeight/2, accentX, rectHeight/2, randomVal(0.25, 1), randomVal(0.5, 4))
      }

    }
  }

  c.pop()
}

function cStackCircle(x, y, circleSize, dens, color, raised) {
  check = createVector(x, y)
  satDist = check.dist(satCenter)
  lumDist = check.dist(lumCenter)
  sat = map(satDist, 0, satRadius, 0, satLevel)
  lum = map(lumDist, 0, lumRadius, lumLevel, 0)
  c.push()
  c.translate(x, y)

  xOff = map(xShadow, 0, 1, -circleSize*0.333, circleSize*0.333)
  yOff = map(yShadow, 0, 1, -circleSize*0.333, circleSize*0.333)

  for(let i = 0; i < dens; i++) {

    dark = map(i, 0, dens, contrast, 0)
    sizeMod = map(pow(i, expo), 0, pow(dens, expo), 1, 0)
    xMod = map(pow(i, expo), 0, pow(dens, expo), 0, xOff)
    yMod = map(pow(i, expo), 0, pow(dens, expo), 0, yOff)
    c.fill(chroma(col).desaturate(sat).brighten(lum).darken(dark).hex())
    c.push()
    if(i == 0) {
      c.drawingContext.shadowOffsetX = map(xShadow, 1, 0, -raised, raised);
      c.drawingContext.shadowOffsetY = map(yShadow, 1, 0, -raised, raised);
      c.drawingContext.shadowBlur = map(raised, 10, 400, 1, 30);
      c.drawingContext.shadowColor = 'black';
    }
    c.circle(xMod, yMod, circleSize*sizeMod)
    c.pop()
  }
  c.pop()
}

function corner() {
  return sz*randomVal(0, 0.3)
}

function cCirclePack() {
minR = minCircR
num = 0
tries = 0
  while(num < numCircs) {
    maxR = map(num, 0, numCircs, maxCircR, minR)
    //create a new circle object
    thisC = new Circ(randomVal(0, w), randomVal(0, h), randomVal(minR, maxR))
    //set overlap to default false
    valid = true
    for(let j = 0; j < circs.length-1; j++) {
      //reference past circles
      prevCirc = createVector(circs[j].x, circs[j].y)
      thisCirc = createVector(thisC.x, thisC.y)
      //calculate distance between circles
      distance = thisCirc.dist(prevCirc)
      minDist = ((thisC.r)/2+(circs[j].r)/2)+padding
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
      circs[num] = thisC
      num++


    }
    tries++
    if(tries > 300000) {
      console.log(tries)
      break

    }
  }
}

function showCircs() {
  for(let i = 0; i < circs.length-1; i++) {
    wig = accentWigCircs
    wiggle = map(noise(circs[i].y*noiseScaleWig), 0, 1, -wig, wig)
    center = w/2 + wiggle
    mod = map(noise(circs[i].y*noiseScaleWidth), 0, 1, 0, 200)
    minX = center-mod
    maxX = center+mod

    col = accentCol

    circs[i].show(col, i)
  }
}


function gradLine(xa, ya, xb, yb, wt, xp) {
  start = createVector(xa, ya)
  end = createVector(xb, yb)
  length = start.dist(end)/50
  midPt = randomVal(0, length)
  for(let i = 0; i < length; i++) {
    x = map(i, 0, length, start.x, end.x)
    y = map(i, 0, length, start.y, end.y)
    x2 = map(i+1, 0, length, start.x, end.x)
    y2 = map(i+1, 0, length, start.y, end.y)
    sineMidPt = map(midPt, 0, length, 0, 360)
    sineI = map(i, 0, length, 0, 360) + sineMidPt
    wtMod = map(sin((sineI+sineMidPt)*xp), -1, 1, 0, wt)
    c.strokeWeight(wtMod)
    c.line(x, y, x2, y2)
  }

}
