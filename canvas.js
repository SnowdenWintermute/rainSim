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
  xClick: undefined,
  yClick: undefined,
  down: false,
  up: true,
  interacting: false
}
let finger = {
  x: undefined,
  y: undefined,
  down: false
}

window.addEventListener('mousemove', function(e){
  mouse.x = e.x
  mouse.y = e.y
})
window.addEventListener('click',function(e){
  mouse.xClick = e.x
  mouse.yClick = e.y
})
window.addEventListener('mousedown',function(e){
  mouse.down = true
  mouse.up = false
})
window.addEventListener('mouseup',function(e){
  mouse.down = false
  mouse.up = true
})
window.addEventListener('touchstart',function(e){
  mouse.x = e.touches[0].pageX
  mouse.y = e.touches[0].pageY
  mouse.down = true
  mouse.up = false
})
window.addEventListener('touchmove',function(e){
  mouse.x = e.touches[0].pageX
  mouse.y = e.touches[0].pageY
})
window.addEventListener('touchend',function(e){
  mouse.down = false
  mouse.up = true
})
window.addEventListener('resize',function(e){
  makeItRain()
})

//Weather properties
let density = 2000
let intensity = 1.4
let windSpeed = 0
let windDirection = 1
let cloudSize = 500
let cloudPosition = 0


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
  c.lineTo(innerWidth/2.5,innerHeight/5*3.5)
  c.lineTo(innerWidth,innerHeight/4*3)
  c.lineTo(innerWidth,innerHeight)
  c.lineTo(0,innerHeight)
  c.lineTo(0,innerHeight/4*3)
  c.fillStyle = ("#58C")
  c.lineWidth = 15
  c.fill()
}
}

function setDensity(percent) {
  density = percent*24
  makeItRain()
}
function setWindSpeed(percent) {
  if(percent>50)windSpeed = percent/20
  if(percent<50)windSpeed = (percent-100)/20 *-1
  if(percent>50) windDirection = percent/50
  if(percent<50) windDirection = (percent-100)/50
}

bg = new Backdrop()
sky = new Sky()
slider = new VerticalSlider(50,30,25,240,"lightblue","darkblue","blue",setDensity)
hSlider = new HorizontalSlider(100,200,240,30,"lightblue","darkblue","blue",setWindSpeed)
menu = new Menu()

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

// function changeWind(){
//   let shouldChange = false
//   if ((Math.random()*1000)>790) shouldChange = true
//   if(shouldChange) {
//     if(windSpeed >= 0 && windSpeed <= 5){
//     windSpeed += (Math.random()-.5)
//   }
// }
// }

//Create initial rainfall
let raindropArray = []
function makeItRain(){
  raindropArray = []
for(let i=0;i<density;i++){
  generateDrop()
}
}

makeItRain()

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0,0, innerWidth,innerHeight)
  sky.draw()
  updateDrops()
  bg.draw()
  slider.update()
  hSlider.update()
  menu.update()
}

animate()
