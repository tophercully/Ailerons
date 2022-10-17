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
}
