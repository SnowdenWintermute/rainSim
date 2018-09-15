function Menu() {


  this.active = false

  //TRIANGLE VALUES
  this.tWidth = 30
  this.x1 = innerWidth/2-this.tWidth/2
  this.y1 = innerHeight - 30
  this.x2 = innerWidth/2
  this.y2 = innerHeight-60
  this.x3 = innerWidth/2+this.tWidth/2
  this.y3 = innerHeight-30

  this.x1Closed = innerWidth/2-this.tWidth/2
  this.y1Closed = innerHeight - 30
  this.x2Closed = innerWidth/2
  this.y2Closed = innerHeight-60
  this.x3Closed = innerWidth/2+this.tWidth/2
  this.y3Closed = innerHeight-30

  this.x1Open = innerWidth/2-this.tWidth/2
  this.y1Open = innerHeight-60
  this.x2Open = innerWidth/2+60
  this.y2Open = innerHeight - 30
  this.x3Open = innerWidth/2+this.tWidth/2
  this.y3Open = innerHeight-60

  //RECT VALUES
  this.rectx = innerWidth/2-20
  this.recty = innerHeight-65
  this.rectw = 40
  this.recth = 40

  this.rectxClosed = innerWidth/2-20
  this.rectyClosed = innerHeight-65
  this.rectwClosed = 40
  this.recthClosed = 40

  this.rectxOpen = (innerWidth/12)*1
  this.rectyOpen = (innerHeight/12)*7
  this.rectwOpen = innerWidth/12*10
  this.recthOpen = innerHeight/12*4.5

  this.draw = function(){
    //DRAW RECT
    c.beginPath()
    c.rect(this.rectx,this.recty,this.rectw,this.recth)
    c.fillStyle="#2e454d"
    c.fill()

    //DRAW TRIANGLE
    c.beginPath()
    c.fillStyle = "#49F"
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

    if(mouse.x>=this.rectx
      && mouse.y>=this.rectyClosed
      && mouse.x<=this.rectxClosed+this.rectwClosed
      && mouse.y<=this.rectyClosed+this.recthClosed
      ){
        menuState.clickable=true
      }else{
        menuState.clickable = false
      }
      if(menuState.active){
        //Animate menu rectangle to open
        if(this.rectx>=this.rectxOpen) this.rectx -=30
        if(this.recty>=this.rectyOpen) this.recty -=30
        if(this.rectw<=this.rectwOpen) this.rectw +=60
        if(this.recth<=this.recthOpen) this.recth +=60
        //Animate menu triangle
        if(this.y1>this.y1Open) this.y1 -=5
        if(this.y3>this.y3Open) this.y3 -=5
        if(this.y2<this.y2Open) this.y2 +=5
        //Once animation complete
        if(this.rectx<=this.rectxOpen) menuState.loaded = true
      }
      if(!menuState.active){
        //Animate menu rectangle to closed
        if(this.rectx<this.rectxClosed) this.rectx +=30
        if(this.recty<this.rectyClosed) this.recty +=30
        if(this.rectw>this.rectwClosed) this.rectw -=60
        if(this.recth>this.recthClosed) this.recth -=60
        //Animate menu triangle
        if(this.y1<this.y1Closed) this.y1 +=5
        if(this.y3<this.y3Closed) this.y3 +=5
        if(this.y2>this.y2Closed) this.y2 -=5
        //Once animation complete
        if(this.rectx>=this.rectxOpen) menuState.loaded = false
      }

    this.draw()
  }
}
