class Circ {
  constructor(x, y, r) {
    this.x = x
    this.y = y
    this.r = r
  }

  show() {
    c.fill(truePal[randomInt(0, truePal.length)])
    c.noStroke()
    c.circle(this.x, this.y, this.r)
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
