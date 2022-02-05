class Wall {
  constructor(x1, y1, x2, y2, R, G, B) {
    this.a = createVector(x1, y1);
    this.b = createVector(x2, y2);
    this.R = R;
    this.G = G;
    this.B = B;
  }

  show() {
    stroke(this.R, this.G, this.B);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
