var VILImg = new Image();
VILImg.src = "village.png";
function Village(mapWidth, mapHeight,context){
    this.mapWidth = mapWidth; //rộng
    this.mapHeight = mapHeight; //cao
    this.context = context; //ngữ cảnh

    //kích cỡ
    this.halfSize = 500;//Math.floor(Math.random()*30)+30;
    this.size =  this.halfSize*2;
// điểm xuất hiện 1/cách từ trái qua. 2.từ trên xuống
    this.left = 450;// Math.floor(Math.random()*(mapWidth-this.size))+1;
    this.top = 300;
    // tốc độ đi xuống và đi ngang
   // this.speedY = 0;//Math.floor(Math.random()*5);
   // this.speedX =2;// Math.floor(Math.random()*3)-3;
    //xoay
   // this.angle = 0;//(Math.PI/180)*Math.floor(Math.random()*360);
   // this.isExploded = false;
  //  this.explosionCounter = 3;
}
Village.prototype.explode = function(){
    this.isCollided = true; //va chạm

    snd.currentTime=0;
    snd.play();
}

Village.prototype.draw = function(){
    var img = this.isCollided? explodeImg: VILImg;

    this.context.save();
    this.context.translate(this.left+this.halfSize,this.top+this.halfSize);
    //this.context.rotate(this.angle);
    this.context.drawImage(img,400,-400,200,-200);
    this.context.restore();
}

Village.prototype.update = function(){
    if(this.isCollided)
        this.explosionCounter--;
    if(this.explosionCounter==0)
        this.isExploded = true;

    if(this.left < 0 || this.right > this.mapWidth)
        this.speedX = -this.speedX;
    if(this.bottom > this.mapHeight)
        this.explode();

    this.top += this.speedY;
    this.left += this.speedX;
    this.right = this.left + this.size;
    this.bottom = this.top + this.size;
}


Village.prototype.collide = function(x,y){
    return this.left <= x && this.right >= x &&
        this.top <= y && this.bottom >= y;
}
