
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

//SICK
function Stick(x,y,x2,y2,girth,parent){
  this.x = x
  this.y = y
  this.x2 = x2
  this.y2 = y2

  this.girth = girth
  this.parent = parent

  //for animation of growth
  this.xfull = x
  this.yfull = y
  this.x2full = x2
  this.y2full = y2

  this.growPoint1x = this.x-this.girth
  this.growPoint1y = this.y2+(this.y-this.y2)/2.2
  this.growPoint2x = this.x+this.girth
  this.growPoint2y = this.y2+(this.y-this.y2)/1.4


  plant.growPoints.push(new GrowPoint(this.growPoint1x,this.growPoint1y,this.x-30,this.y2,"left",this.girth))
  plant.growPoints.push(new GrowPoint(this.growPoint2x,this.growPoint2y,this.x+30,this.y2,"right",this.girth))



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

function GrowPoint(x,y,x2,y2,d,girth,parent){

  this.radius = 10
  this.x = x
  this.y = y
  this.x2 = x2
  this.y2 = y2

  this.d = d
  this.girth = girth

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
      switch(true){
        case this.d === "up":
          plant.sticks.push(new Stick(this.x,this.y,this.x2,this.y2,this.girth))
          break
        case this.d ==="left":
          plant.sticks.push(new Stick(this.x,this.y,this.x2-20,this.y2-20,this.girth))
          break
        case this.d ==="right":
          plant.sticks.push(new Stick(this.x,this.y,this.x2+20,this.y2-20,this.girth))
          break
          default:
      }
      console.log(plant.growPoints.indexOf(this))

      plant.growPoints.splice(plant.growPoints.indexOf(this),1)
    }
  }
}
