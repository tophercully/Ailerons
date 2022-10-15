class Circ {
  constructor(x, y, r) {
    this.x = x
    this.y = y
    this.r = r
    this.sat = 0
  }

  show(col, num) {
    c.fill(col)
    c.noStroke()
    this.num = 50//randomInt(1, 10)
    this.minRaise = 10
    this.maxRaise = 100
    this.raised = map(num, 0, 2000, this.minRaise, this.maxRaise)
    cStackCircle(this.x, this.y, this.r, this.num, col, this.raised)
  }

  showSquares(col) {
    c.fill(col)
    c.noStroke()
    num = 50//randomInt(1, 10)
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
