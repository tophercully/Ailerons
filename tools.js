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
      // console.log(lum)

      xOff = randomVal(-off, off)
      yOff = randomVal(-off, off)

      p.fill(col)
      p.noStroke()
      nStroke = fxrand()
      if(nStroke < 0.001*sz) {
        p.strokeWeight(1)
        p.stroke(frameCol)
      } else {
        p.noStroke()
      }
      //p.circle(x+nX, y+nY, sz*0.75)
      p.square(x+nX+xOff, y+nY+yOff, sz*0.99, randomInt(3, 6))
    }
  }
}

function fullStack(numRows) {
  rot = 0
  for(let i = 0; i < numRows; i++) {
    stackHeight = h/numRows
    y = (stackHeight*i)+(stackHeight/2)
    rot += plusOrMin(rotInc)
    cols = colNums[randomInt(0, colNums.length)]
    stack(y, randomVal(stackHeight, stackHeight*4), rot, 5)

  }
}

function circles(numRows) {
  for(let i = 0; i < numRows; i++) {
    nCirc = fxrand()
    stackHeight = h/numRows
    if(nCirc < 0.5) {
      c.fill(accentCol)
      col = accentCol
      c.noStroke()
      cStackCircle(randomVal(0, w), i*stackHeight, randomVal(10, stackHeight*2), randomInt(1, 10), col)
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
  c.translate(0, y)

  for(let i = 0; i < cols; i++) {
    //center accent color?
    if(i == Math.floor(cols/2)) {
      c.fill(accentCol)
      col = accentCol
    } else {
      c.fill(truePal[randomInt(0, truePal.length)])
      col = truePal[randomInt(0, truePal.length)]
    }
    c.noStroke()
    stackDens = randomInt(1, 10)
    cStackRect(i*stackWidth+(stackWidth/2)+randomInt(-mod/2, mod/2), 0, stackWidth+mod, stackHeight, stackDens, col)


  }

  c.pop()
}

function cStackRect(x, y, rectWidth, rectHeight, dens, color) {
  c.push()
  c.translate(x, y)
  xOff = randomVal(-rectWidth/2, rectWidth/2)
  yOff = randomVal(-rectHeight/2, rectHeight/2)
  for(let i = 0; i < dens; i++) {
    sizeMod = map(i, 0, dens, 1, 0)
    xMod = map(i, 0, dens, 0, xOff)
    yMod = map(i, 0, dens, 0, yOff)
    c.fill(chroma(col).darken(randomVal(0, 1)).hex())
    c.rect(xMod, yMod, rectWidth*sizeMod, rectHeight*sizeMod)
  }
  c.pop()
}

function cStackCircle(x, y, circleSize, dens, color) {
  c.push()
  c.translate(x, y)
  xOff = randomVal(-circleSize/3, circleSize/3)
  yOff = randomVal(-circleSize/3, circleSize/3)
  for(let i = 0; i < dens; i++) {
    sizeMod = map(i, 0, dens, 1, 0)
    xMod = map(i, 0, dens, 0, xOff)
    yMod = map(i, 0, dens, 0, yOff)
    c.fill(chroma(col).darken(randomVal(0, 1)).hex())
    c.circle(xMod, yMod, circleSize*sizeMod)
  }
  c.pop()
}
