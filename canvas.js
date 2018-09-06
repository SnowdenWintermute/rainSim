//let dropSound = document.getElementById('dropSound')

let canvas = document.querySelector('canvas')
canvas.width=window.innerWidth
canvas.height=window.innerHeight

//c means context
let c = canvas.getContext('2d')

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

let mouse = {
  x: undefined,
  y: undefined,
  down: false
}

window.addEventListener('mousemove', function(e){
  mouse.x = e.x
  mouse.y = e.y
})
window.addEventListener('mousedown',function(e){
  mouse.down = true
})
window.addEventListener('mouseup',function(e){
  mouse.down = false
})

//Weather properties
let density = 2000
let intensity = 3
let windSpeed = 1
let windDirection = -1
let cloudSize = 500
let cloudPosition = 0

//SLIDER
function Slider(x,y,width,height,attribute){
  let tWidth = width+40
  let tHeight = 25
  let tx = x-20
  let ty = y + height/2 - tHeight/2
  let tCenter = {
    x: tx + tWidth/2,
    y: ty + tHeight/2
  }
  this.x = x
  this.y = y
  this.width = width
  this.height = height
  this.ty = ty
  this.tx = tx
  this.tWidth = tWidth
  this.tHeight= tHeight
  this.tCenter=tCenter
  this.draw = function(){
    //slide bar
    c.beginPath()
    c.rect(this.x,this.y,this.width,this.height)
    c.fillStyle = "darkblue"
    c.fill()
    //slide toggle
    c.beginPath()
    c.rect(this.tx,this.ty,this.tWidth,this.tHeight)
    c.fillStyle = "grey"
    c.fill()
    c.beginPath()
    c.fillStyle= "blue"
    c.beginPath()
    c.arc(tCenter.x,tCenter.y,2,0,Math.PI*2)
    c.fill()
  }

  this.update = function(){
    //if holding toggle and not out of bounds, slide it with mouse
    if(mouse.x>=this.tx
      && mouse.x<=this.tx+this.tWidth
      && mouse.y>=this.ty-this.tHeight
      && mouse.y<=this.ty+this.tHeight
      && mouse.down
      && this.ty>=this.y
      && this.ty+this.tHeight<=this.y+this.height){

      this.ty = mouse.y
      tCenter.y = this.ty + this.tHeight/2
    }
    //if out of bounds top or bot, reset to top or bot
    if( this.ty<this.y){
      this.ty = this.y
      tCenter.y = this.ty + this.tHeight/2
    }
    if(this.ty+this.tHeight>this.y+this.height){
      this.ty = this.y+this.height-this.tHeight
      tCenter.y = this.ty + this.tHeight/2
    }
    this.draw()
  }
}

//backdrop
function Sky(){
  this.draw = function(){
    c.beginPath()
    c.moveTo(0,0)
    c.fillStyle=("rgba(155,155,155,1)")
    c.rect(0,0,innerWidth,innerHeight)
    c.fill()
  }
}
function Backdrop(){
  this.draw = function(){

  //ground
  c.beginPath()
  c.moveTo(0,innerHeight/4*3)
  c.lineTo(innerWidth/2.5,innerHeight/5*3.5)
  c.lineTo(innerWidth,innerHeight/4*3)
  c.lineTo(innerWidth,innerHeight)
  c.lineTo(0,innerHeight)
  c.lineTo(0,innerHeight/4*3)
  c.fillStyle = ("#345")
  c.lineWidth = 15
  c.fill()
}
}

bg = new Backdrop()
sky = new Sky()
slider = new Slider(100,100,10,200)

//raindrop object
function Raindrop(x, y, radius, speed){
  this.x = x
  this.radius = radius
  this.speed = speed
  this.y = y
  this.draw = function(){
    c.beginPath()
    c.arc(x, y, radius, 0, (Math.PI), true)
    c.bezierCurveTo(x-radius, y+radius*.85, x+radius, y+radius*.85, x+radius, y)
    c.fillStyle = "rgba(20,40,60,.3)"
    c.fill()
  }
  this.update = function(){
    this.y += speed
    y+=speed
    this.x += windSpeed * windDirection
    x+= windSpeed * windDirection
    //x += windSpeed * windDirection
    //if(y > innerHeight) y = Math.random()*100
    this.draw()
  }
}


function generateDrop(){
  let x = getRandomArbitrary(-200,innerWidth+200)
  let y = getRandomArbitrary(-60, -1000)
  let size = getRandomArbitrary(1,4)
  let speed = size * intensity
  raindropArray.push(new Raindrop(x, y, size, speed))
}

function updateDrops(){
  for(drop of raindropArray){
    drop.update()
    if(drop.y > innerHeight || drop.x > innerWidth+200 || drop.x < -200){
      //remove drop and create new one
      raindropArray.splice(raindropArray.indexOf(drop),1)
      generateDrop()
    }
  }
}
function changeWind(){
  let shouldChange = false
  if ((Math.random()*1000)>790) shouldChange = true
  if(shouldChange) {
    if(windSpeed >= 0 && windSpeed <= 5){
    windSpeed += (Math.random()-.5)
  }

}
}
//Create initial rainfall
let raindropArray = []
for(let i=0;i<density;i++){
  generateDrop()
}

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0,0, innerWidth,innerHeight)
  sky.draw()
  updateDrops()
  changeWind()
  bg.draw()
  slider.update()
}

animate()
