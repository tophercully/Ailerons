function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(fxrand() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function randomIntEven(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
      col = c.get(x, y)
      // console.log(lum)
      lumMod = fxrand()
      if(lumMod < 0.5) {
        dark = map(lumMod, 0.5, 0, 0, 1)
        light = 0
      } else {
        light = map(lumMod, 0.5, 1, 0, 1)
        dark = 0
      }
      trueCol = chroma(col).rgba()
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

      p.square(x+nX+xOff, y+nY+yOff, sz-gap, corner(), corner(), corner(), corner())
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
    stack(y, randomVal(stackHeight, stackHeight*4), rot, cols)

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
      raised = randomInt(10, 50)
      cStackCircle(x, y, randomVal(10, stackHeight*2), circDens, col, raised)
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
    //center accent color?
    // if(i == Math.floor(cols/2) && accentDecider < accentChance) {
    //   c.fill(accentCol)
    //   col = accentCol
    // } else {
    //   c.fill(truePal[randomInt(0, truePal.length)])
    //   col = truePal[randomInt(0, truePal.length)]
    //   //col = '#252525'
    // }
    wig = accentWigCircs
    wiggle = map(noise(y*noiseScaleWig), 0, 1, -wig, wig)
    center = w/2 + wiggle
    mod = map(noise(y*noiseScaleWidth), 0, 1, 0, 200)
    minX = center-mod
    maxX = center+mod
    if(x < maxX && x > minX) {
      col = accentCol
    } else {
      col = truePal[randomInt(0, truePal.length)]
    }
    c.noStroke()

    cStackRect(x, y, stackWidth+mod, stackHeight, rectDens, col)


  }

  c.pop()
}

function cStackRect(x, y, rectWidth, rectHeight, dens, color) {
  satCheck = createVector(x, y)
  satDist = satCheck.dist(satCenter)
  sat = map(satDist, 0, satRadius, 0, satLevel)
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
    c.fill(chroma(col).desaturate(sat).darken(dark).hex())
    c.rect(xMod, yMod, rectWidth*sizeMod, rectHeight*sizeMod)
  }
  c.pop()
}

function cStackCircle(x, y, circleSize, dens, color, raised) {
  satCheck = createVector(x, y)
  satDist = satCheck.dist(satCenter)
  sat = map(satDist, 0, satRadius, 0, satLevel)
  c.push()
  c.translate(x, y)
  xOff = map(xShadow, 0, 1, -circleSize/3, circleSize/3)//randomVal(-circleSize/3, circleSize/3)
  yOff = map(yShadow, 0, 1, -circleSize/3, circleSize/3)//randomVal(-circleSize/3, circleSize/3)
  for(let i = 0; i < dens; i++) {
    offset = 0//0.05
    dark = map(i, 0, dens, contrast, 0) +randomVal(-offset, offset)
    sizeMod = map(pow(i, expo), 0, pow(dens, expo), 1, 0)
    xMod = map(pow(i, expo), 0, pow(dens, expo), 0, xOff)
    yMod = map(pow(i, expo), 0, pow(dens, expo), 0, yOff)
    c.fill(chroma(col).desaturate(sat).darken(dark).hex())
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
    for(let j = 0; j < circs.length; j++) {
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
  for(let i = 0; i < circs.length; i++) {
    wig = accentWigCircs
    wiggle = map(noise(circs[i].y*noiseScaleWig), 0, 1, -wig, wig)
    center = w/2 + wiggle
    mod = map(noise(circs[i].y*noiseScaleWidth), 0, 1, 0, 200)
    minX = center-mod
    maxX = center+mod
    if(circs[i].x < maxX && circs[i].x > minX) {
      col = accentCol
    } else {
      col = truePal[randomInt(0, truePal.length)]
    }
    circs[i].show(col, i)
  }
}

function showSquares() {
  for(let i = 0; i < circs.length; i++) {
    wig = accentWigCircs
    wiggle = map(noise(circs[i].y*noiseScaleWig), 0, 1, -wig, wig)
    center = w/2 + wiggle
    mod = map(noise(circs[i].y*noiseScaleWidth), 0, 1, 0, 200)
    minX = center-mod
    maxX = center+mod
    if(circs[i].x < maxX && circs[i].x > minX) {
      col = accentCol
    } else {
      col = truePal[randomInt(0, truePal.length)]
    }
    circs[i].showSquares(col)
  }
}
