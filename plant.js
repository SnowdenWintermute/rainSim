
function Plant(){

  this.growPoints = []
  this.sticks = []

  this.draw = function(){
    //Initial Seed
    for(p of this.growPoints){
      p.update()
    }
    for(p of this.sticks){
      p.update()
    }
  }

  this.update = function(){
    this.draw()
  }
}

function Stick(x,y,x2,y2,girth){
  this.x = x
  this.y = y
  this.x2 = x2
  this.y2 = y2

  this.girth = girth

  this.xfull = x
  this.yfull = y
  this.x2full = x2
  this.y2full = y2

  this.growPoint1x = this.x-this.girth
  this.growPoint1y = this.y2+(this.y-this.y2)/2.2
  this.growPoint2x = this.x+this.girth
  this.growPoint2y = this.y2+(this.y-this.y2)/2.4

  plant.growPoints.push(new GrowPoint(this.growPoint1x,this.growPoint1y))
  plant.growPoints.push(new GrowPoint(this.growPoint2x,this.growPoint2y))


  this.draw = function(){
    c.beginPath()
    c.moveTo(this.x,this.y)
    c.lineTo(this.x2,this.y2)
    c.strokeStyle="#554634"
    c.lineWidth = this.girth
    c.stroke()
  }
  this.update = function(){

    this.draw()
  }
}

function GrowPoint(x,y){

  this.radius = 10
  this.x = x
  this.y = y

  this.clicked = false

  this.draw = function(){
    //Initial Seed
    c.moveTo(this.x,this.y)
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, (Math.PI)*2, true)
    c.strokeStyle = "pink"
    c.lineWidth = 1
    c.stroke()
    if(mouse.x>this.x-this.radius
      &&mouse.y>this.y-this.radius
      &&mouse.x<this.x+this.radius
      &&mouse.y<this.y+this.radius){
    c.fillStyle = "rgba(200,150,150,.3)"
    c.fill()
  }
  }

  this.update = function(){
    this.draw()
    if(this.clicked){
      plant.sticks.push(new Stick(this.x,this.y,this.x,this.y-100,5))
      plant.growPoints.shift()
    }
  }
}
