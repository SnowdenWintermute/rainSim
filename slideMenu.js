function Menu() {


  //TRIANGLE VALUES
  this.tWidth = 30
  this.x1 = innerWidth/2-this.tWidth/2
  this.y1 = innerHeight - 30
  this.x2 = innerWidth/2
  this.y2 = innerHeight-60
  this.x3 = innerWidth/2+this.tWidth/2
  this.y3 = innerHeight-30
  this.area = (this.x1*(this.y2-this.y3) + this.x2*(this.y3-this.y1)+this.x3*(this.y1-this.y2))/2
  // this.pab = (this.x1*(this.y2-mouse.y) + this.x2*(mouse.y-this.y1)+mouse.x*(this.y1-this.y2))/2
  // this.pbc = (mouse.x*(this.y2-this.y3) + this.x2*(this.y3-mouse.y)+this.x3*(mouse.y-this.y2))/2
  // this.pac = (this.x1*(mouse.y-this.y3) + mouse.x*(this.y3-this.y1)+this.x3*(this.y1-mouse.y))/2

  this.a = {
    x: this.x1,
    y: this.x2
  }
  this.b = {
    x: this.x2,
    y: this.y2
  }
  this.c = {
    x: this.x3,
    y: this.y3
  }
  this.pointInTriangle = function()
  {
      let s1 = this.c.y - this.a.y;
      let s2 = this.c.x - this.a.x;
      let s3 = this.b.y - this.a.y;
      let s4 = this.p.y - this.a.y;
      let w1 = (this.a.x * s1 + s4 * s2 - this.p.x * s1) / (s3 * s2 - (this.b.x-this.a.x) * s1);
      let w2 = (s4- w1 * s3) / s1;
      return w1 >= 0 && w2 >= 0 && (w1 + w2) <= 1;
  }

  this.draw = function(){
    //DRAW TRIANGLE
    c.beginPath()
    c.moveTo(this.x1,this.y1)
    c.lineTo(this.x2,this.y2)
    c.lineTo(this.x3,this.y3)
    c.lineTo(this.x1,this.y1)

    c.strokeStyle="white"
    c.lineWidth = 1
    c.stroke()
    //c.fillStyle = "orange"
    c.fill()
  }
  this.update = function(){
    this.p = {
      x: mouse.x,
      y: mouse.y
    }

    if(this.pointInTriangle()){
      c.fillStyle = "blue"
    }else{
      c.fillStyle = "orange"
    }
    console.log(this.pointInTriangle());
    this.draw()
  }
}
