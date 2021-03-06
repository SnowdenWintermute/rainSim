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

let menuState = {
  clicked: false,
  active: false,
  loaded: false,
  textSize: innerWidth/45
}

let finger = {
  x: undefined,
  y: undefined,
  down: false
}

let menuHidden = true

window.addEventListener('mousemove', function(e){
  mouse.x = e.x
  mouse.y = e.y
})
window.addEventListener('click',function(e){
  mouse.xClick = e.x
  mouse.yClick = e.y
  if(menuState.clickable&&(!menuState.active)){
    menuState.active = true
  }else if(menuState.clickable&&menuState.active){
    menuState.active = false
  }
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
  c.clearRect(0,0, innerWidth,innerHeight)
  canvas.width = innerWidth
  canvas.height = innerHeight
  slideWidth = innerWidth/12*4
  densitySlider = new HorizontalSlider(innerWidth/12,innerHeight/12*8,slideWidth,slideHeight,"lightblue","darkblue","blue",setDensity,"Density")
  windSlider = new HorizontalSlider(innerWidth/12*7,innerHeight/12*8,slideWidth,slideHeight,"lightblue","darkblue","blue",setWindSpeed,"Direction/Speed")
  speedSlider = new HorizontalSlider(innerWidth/12*7,(innerHeight/12)*10,slideWidth,slideHeight,"lightblue","darkblue","blue",setWindSpeed,"Fall Speed")
  sizeSlider = new HorizontalSlider(innerWidth/12,(innerHeight/12)*10,slideWidth,slideHeight,"lightblue","darkblue","blue",setWindSpeed,"Size")
  menu = new Menu()
  menuState.textSize = innerWidth/30
  makeItRain()
})

//Weather properties
let density = 2000
let intensity = 1.4
let fallSpeed = 1
let sizeMod = 1
let windSpeed = 0
let windDirection = 1
let cloudSize = 500
let cloudPosition = 0

function setDensity(percent) {
  density = percent*24
  makeItRain()
}
function setWindSpeed(percent) {
  if(percent>50)windSpeed = percent/20
  if(percent<50)windSpeed = (percent-100)/20 *-1
  if(percent>50) windDirection = percent/50
  if(percent<50) windDirection = (percent-100)/50
  if(percent===50) windDirection = 0
}
function setSpeed(percent){
  fallSpeed = percent/25
}
function setSizeMod(percent){
  sizeMod = percent/20
}

let slideHeight = 25
let slideWidth = innerWidth/12*4

bg = new Backdrop()
sky = new Sky()
densitySlider = new HorizontalSlider(innerWidth/12,innerHeight/12*8,slideWidth,slideHeight,"lightblue","darkblue","blue",setDensity,"Density")
windSlider = new HorizontalSlider(innerWidth/12*7,innerHeight/12*8,slideWidth,slideHeight,"lightblue","darkblue","blue",setWindSpeed,"Direction/Speed")
speedSlider = new HorizontalSlider(innerWidth/12*7,(innerHeight/12)*10,slideWidth,slideHeight,"lightblue","darkblue","blue",setSpeed,"Fall Speed")
sizeSlider = new HorizontalSlider(innerWidth/12,(innerHeight/12)*10,slideWidth,slideHeight,"lightblue","darkblue","blue",setSizeMod,"Size")
menu = new Menu()

//raindrop object
function Raindrop(x, y, radius, speed, color){
  this.x = x
  this.radius = radius
  this.speed = speed
  this.y = y
  this.color = color
  this.draw = function(){
    c.beginPath()
    c.arc(x, y, radius, 0, (Math.PI), true)
    c.bezierCurveTo(x-radius, y+radius*.85, x+radius, y+radius*.85, x+radius, y)
    c.fillStyle = this.color
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
  let x = getRandomArbitrary(-innerWidth/2,innerWidth+innerWidth/2)
  let y = getRandomArbitrary(-60, -1000)
  let size = getRandomArbitrary(1,3.2) * sizeMod
  let speed = size * intensity * fallSpeed
  let color = "rgba(50,150,190,.7)"
  raindropArray.push(new Raindrop(x, y, size, speed,color))
}

function updateDrops(){
  for(drop of raindropArray){
    drop.update()
    if(drop.y > innerHeight || drop.x > innerWidth+innerWidth/2 || drop.x < - innerWidth/2){
      //remove drop and create new one
      raindropArray.splice(raindropArray.indexOf(drop),1)
      generateDrop()
    }
  }
}

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
  bg.update()
  menu.update()
  if(menuState.loaded){
  densitySlider.update()
  windSlider.update()
  speedSlider.update()
  sizeSlider.update()
}
}

animate()
