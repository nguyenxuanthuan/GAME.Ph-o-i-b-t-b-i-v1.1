var UFOImg = new Image();
UFOImg.src = "enemy.png";
var explodeImg = new Image();
explodeImg.src = "explosion.png";
var snd = new Audio("explosion.wav");	


function Enemy(mapWidth, mapHeight,context){
	this.mapWidth = mapWidth;
	this.mapHeight = mapHeight;
	this.context = context;

	//kích cỡ
	this.halfSize = 40;//Math.floor(Math.random()*30)+30;
	this.size =  this.halfSize*2;
// điểm xuất hiện 1/cách từ trái qua. 2.từ trên xuống
	this.left = 720;// Math.floor(Math.random()*(mapWidth-this.size))+1;
	this.top =Math.floor(Math.random()*260);
	// tốc độ đi xuống và đi ngang
	this.speedY = 0;//Math.floor(Math.random()*5);
	this.speedX =2;// Math.floor(Math.random()*3)-3;
	//xoay
	this.angle = 0;//(Math.PI/180)*Math.floor(Math.random()*360);
	this.isExploded = false;
	this.isCollided = false;
	this.explosionCounter = 3;
}
Enemy.prototype.explode = function(){ //phát nổ
	this.isCollided = true; //va chạm
	
	snd.currentTime=0; //thời điểm hiện tại
	snd.play(); //chạy - file âm thanh
}

Enemy.prototype.draw = function(){
	var img = this.isCollided? explodeImg: UFOImg; //hiện thị img = phát nổ nếu va chạm or UFO
		
	this.context.save();
	this.context.translate(this.left+this.halfSize,this.top+this.halfSize); //dịch
	this.context.rotate(this.angle); //xoay
	this.context.drawImage(img,-this.halfSize,-this.halfSize,this.size,this.size);				
	this.context.restore(); //khôi phục
}

Enemy.prototype.update = function(){
	if(this.isCollided)
		this.explosionCounter--;
	if(this.explosionCounter==0) //bộ đếm nổ
		this.isExploded = true; //phát nổ
	if(this.left < 0 || this.right > this.mapWidth)
		this.speedX = -this.speedX;

	//chạm đáy thì nổ
	if(this.bottom > this.mapHeight)
		this.explode();

	this.top += this.speedY;
	this.left += this.speedX;
	this.right = this.left + this.size;
	this.bottom = this.top + this.size;

}


Enemy.prototype.collide = function(x,y){
	return this.left <= x && this.right >= x &&
		this.top <= y && this.bottom >= y;
}
