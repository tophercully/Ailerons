class Circ {
  constructor(x, y, r) {
    this.x = x
    this.y = y
    this.r = r
    this.sat = 0
  }

  show(col) {
    c.fill(col)
    c.noStroke()
    num = randomInt(1, 10)
    cStackCircle(this.x, this.y, this.r, num, col)
  }

  showSquares(col) {
    c.fill(col)
    c.noStroke()
    num = randomInt(1, 10)
    cStackRect(this.x, this.y, this.r*1.5, this.r*1.5, num, col)
  }

  showShadow() {
    s.fill('white')
    s.noStroke()
    s.drawingContext.shadowOffsetX = shadOffX;
    s.drawingContext.shadowOffsetY = shadOffY;
    s.drawingContext.shadowBlur = shadBlur;
    s.drawingContext.shadowColor = '#252525';
    sBlob(this.x, this.y, this.r)
  }
}
