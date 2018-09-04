//let dropSound = document.getElementById('dropSound')

let canvas = document.querySelector('canvas')
canvas.width=window.innerWidth
canvas.height=window.innerHeight

//c means context
let c = canvas.getContext('2d')

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

var mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener('mousemove', function(e){
  mouse.x = e.x
  mouse.y = e.y
})

//Weather properties
var density = 2000
var intensity = 3
var windSpeed = 1
var windDirection = -1
var cloudSize = 500
var cloudPosition = 0

//backdrop
function Sky(){
  this.draw = function(){
    c.beginPath()
    c.moveTo(0,0)
    c.fillStyle=("rgba(195,235,255,1)")
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

//cloud
function Cloud(x,dx,speed){

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
  var shouldChange = false
  if ((Math.random()*1000)>790) shouldChange = true
  if(shouldChange) {
    if(windSpeed >= 0 && windSpeed <= 5){
    windSpeed += (Math.random()-.5)
  }

}
}
//Create initial rainfall
var raindropArray = []
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
}

animate()
