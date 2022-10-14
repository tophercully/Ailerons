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

function fullStack(numRows) {
  rot = 0
  for(let i = 0; i < numRows; i++) {
    stackHeight = h/numRows
    y = (stackHeight*i)+(stackHeight/2)
    rot += plusOrMin(rotInc)
    stack(y, randomInt(stackHeight, stackHeight*4), rot, colNums[randomInt(0, colNums.length)])
  }
}

function stack(y, stackHeight, rot, cols) {
  p.rectMode(CENTER)
  stackWidth = w/cols
  mod = randomInt(0, stackWidth*2)
  p.push()
  p.translate(w/2, y)
  p.rotate(rot)
  p.translate(-w/2, -y)
  p.translate(0, y)

  for(let i = 0; i < cols; i++) {
    //center accent color?
    if(i == Math.floor(cols/2)) {
      p.fill(bgc)
    } else {
      p.fill(truePal[randomInt(0, truePal.length)])
    }
    p.noStroke()
    p.rect(i*stackWidth+(stackWidth/2)+randomInt(-mod/2, mod/2), 0, stackWidth+mod, stackHeight)
  }

  p.pop()
}
