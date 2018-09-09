//backdrop
function Sky(){
  this.draw = function(){
    c.beginPath()
    c.moveTo(0,0)
    c.fillStyle=("#5F9F9F")
    c.rect(0,0,innerWidth,innerHeight)
    c.fill()
  }
}
function Backdrop(){
  this.draw = function(){

  //ground
  c.beginPath()
  c.moveTo(0,innerHeight/4*3)
  c.lineTo(innerWidth,innerHeight/4*3)
  c.lineTo(innerWidth,innerHeight)
  c.lineTo(0,innerHeight)
  c.lineTo(0,innerHeight/4*3)
  c.fillStyle = ("#58C")
  c.lineWidth = 15
  c.fill()
}

  this.update = function(){
    this.draw()
  }
}
