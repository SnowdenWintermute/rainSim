//SLIDER

function VerticalSlider(x,y,width,height,sColor,tColor,altColor,setter){
  let tWidth = width
  let tHeight = 25
  let tx = x
  let ty = y + height/2 - tHeight/2

  this.sColor = sColor
  this.tColor = tColor
  this.altColor = altColor

  this.active = false

  this.x = x
  this.y = y
  this.width = width
  this.height = height
  this.ty = ty
  this.tx = tx
  this.tWidth = tWidth
  this.tHeight= tHeight
  let tCenter = {
    x: this.tx + this.tWidth/2,
    y: this.ty + this.tHeight/2,
    xMax: this.x+this.width-this.tWidth/2,
    xMin: this.x+this.tWidth/2,
    yMax: this.y+this.height-this.tHeight/2,
    yMin: this.y+this.tHeight/2
  }
  this.tCenter = tCenter
  let percent = 50
  let yPrev = tCenter.y
  this.tCenter=tCenter
  this.percent = percent
  this.yPrev = this.tCenter.y
  this.draw = function(){
    //slide bar
    c.beginPath()
    c.rect(this.x,this.y,this.width,this.height)
    c.fillStyle = this.sColor
    c.fill()
    //slide toggle
    c.beginPath()
    c.rect(this.tx,this.ty,this.tWidth,this.tHeight)
    c.fillStyle = this.tColor
    c.fill()
    c.beginPath()
    //Center Dot
    c.fillStyle= this.sColor
    c.beginPath()
    c.arc(tCenter.x,tCenter.y,2,0,Math.PI*2)
    c.fill()
  }

  this.update = function(){
    //if holding toggle and not out of bounds, slide it with mouse
    //if click on bar, move toggle
    if(mouse.x>this.x
      && mouse.x<this.x+this.width
      && mouse.y>this.y
      && mouse.y<this.y+this.height
      && !mouse.interacting
      && (mouse.down||finger.down)){
        this.active = true
        mouse.interacting = true
      }

      if(mouse.up){
        this.active = false
        mouse.interacting = false
      }
      if(this.active){
        this.tColor = this.altColor
        this.tCenter.y = mouse.y
        this.ty = this.tCenter.y - this.tHeight/2
      }else{
        this.tColor = tColor
      }
    //if out of bounds top or bot, reset to top or bot
    if(this.ty<this.y){
      this.ty = this.y
      this.tCenter.y = this.ty + this.tHeight/2
    }
    if(this.ty+this.tHeight>this.y+this.height){
      this.ty = this.y+this.height-this.tHeight
      this.tCenter.y = this.ty + this.tHeight/2
    }

    //Get percent of bar that slider is at
    this.percent = ((this.tCenter.y-this.y-this.tHeight/2)/(this.tCenter.yMax-this.y-this.tHeight/2)*100-100)*-1

    //Set attribute based on slider position
    if(this.yPrev!==this.tCenter.y){
      setter(this.percent)
    }
    this.yPrev = this.tCenter.y
    this.draw()
  }
}


function HorizontalSlider(x,y,width,height,sColor,tColor,altColor,setter){
  //Toggle position and dimensions
  let tWidth = 25
  let tHeight = height
  let tx = x + width/2 - tWidth/2
  let ty = y

  //Colors
  this.sColor = sColor
  this.tColor = tColor
  this.altColor = altColor

  //Assign variables to this object instance
  this.x = x
  this.y = y
  this.width = width
  this.height = height
  this.ty = ty
  this.tx = tx
  this.tWidth = tWidth
  this.tHeight= tHeight
  let tCenter = {
    x: this.tx + this.tWidth/2,
    y: this.ty + this.tHeight/2,
    xMax: this.x+this.width-this.tWidth/2,
    xMin: this.x+this.tWidth/2,
    yMax: this.y+this.height-this.tHeight/2,
    yMin: this.y+this.tHeight/2
  }
  this.tCenter = tCenter
  let percent = 50
  let yPrev = tCenter.y
  let xPrev = tCenter.x
  this.tCenter=tCenter
  this.percent = percent
  this.yPrev = this.tCenter.y
  this.xPrev = this.tCenter.x
  this.draw = function(){
    //slide bar
    c.beginPath()
    c.rect(this.x,this.y,this.width,this.height)
    c.fillStyle = this.sColor
    c.fill()
    //slide toggle
    c.beginPath()
    c.rect(this.tx,this.ty,this.tWidth,this.tHeight)
    c.fillStyle = this.tColor
    c.fill()
    c.beginPath()
    //Center Dot
    c.fillStyle= this.sColor
    c.beginPath()
    c.arc(tCenter.x,tCenter.y,2,0,Math.PI*2)
    c.fill()
  }

  this.update = function(){
    //if holding toggle and not out of bounds, slide it with mouse
    //if click on bar, move toggle
    if(mouse.x>this.x
      && mouse.x<this.x+this.width
      && mouse.y>this.y
      && mouse.y<this.y+this.height
      && !mouse.interacting
      && (mouse.down||finger.down)){
        this.active = true
        mouse.interacting = true
      }

      if(mouse.up){
        this.active = false
        mouse.interacting = false
      }
      if(this.active){
        this.tColor = this.altColor
        this.tCenter.x = mouse.x
        this.tx = this.tCenter.x - this.tWidth/2
      }else{
        this.tColor = tColor
      }

    //if out of bounds top or bot, reset to top or bot
    if(this.tx<this.x){
      this.tx = this.x
      this.tCenter.x = this.tx + this.tWidth/2
    }
    if(this.tx+this.tWidth>this.x+this.width){
      this.tx = this.x+this.width-this.tWidth
      this.tCenter.x = this.tx + this.tWidth/2
    }

    //Get percent of bar that slider is at
    this.percent = (this.tCenter.x-this.x-this.tWidth/2)/(this.tCenter.xMax-this.x-this.tWidth/2)*100

    //Set attribute based on slider position
    if(this.xPrev!==this.tCenter.x){
      setter(this.percent)
    }
    //update xPrevious to current x position
    this.xPrev = this.tCenter.x
    this.draw()
  }
}
