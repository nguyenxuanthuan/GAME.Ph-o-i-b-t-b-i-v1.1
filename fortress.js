
function Fortress(mapWidth, mapHeight,context){
	this.context = context;
	this.mapWidth = mapWidth;
	this.mapHeight = mapHeight;
	this.radius = 75;
	this.speedX = 0;
	this.speedY = 0;
	this.power = 3;
	this.cx = mapWidth*0;
	this.cy = mapHeight;
	this.angle = 0;
	this.balls = [];
	this.cannonHeight = this.radius/3;
	this.cannonWidth = this.cannonHeight*6;
	this.scores = 0;
}
Fortress.prototype.draw = function(){
	
	var context = this.context;
	context.save();
	context.fillStyle = "green";
	context.beginPath();	
	context.arc(this.cx, this.cy, this.radius,0, Math.PI*2);
	context.closePath();
	context.fill();

	// cannon	
	context.save();
	context.translate(this.cx,this.cy);
	context.rotate(this.angle);
	context.fillStyle = "red";
	context.beginPath();		
	context.rect(0,-this.cannonHeight/2,this.cannonWidth,this.cannonHeight);
	context.closePath();
	context.fill();
	context.restore();

	// yellow circle		
	context.fillStyle = "yellow";
	context.beginPath();
	context.arc(this.cx,this.cy,this.radius/2,0,Math.PI*2,true);
	context.closePath();
	context.fill();
	context.restore();
	
	for(var i=0;i<this.balls.length;i++)
	{
		this.balls[i].draw(context);
	}

};

Fortress.prototype.update = function(enemy){

    for(var i=0;i<this.balls.length;i++)
    {
        var ball = this.balls[i];        
        if(ball.update())
        {
            this.balls.splice(i--,1);
        }else{		
			for(var j=0;j<enemy.length;j++)
			{
				var ob = enemy[j];			

				if(ob.collide(ball.cx, ball.cy))
				{
					ob.explode();
					this.balls.splice(i--,1);
					this.scores++;
					break;			
				}
			}			
		}
    }
};
Fortress.prototype.handleInput = function(keyStates){
	this.speedX = 0;
	this.speedY = 0;
	/*
	if(keyStates[Keys.KEY_W])
		this.moveUp();
	if(keyStates[Keys.KEY_S])
		this.moveDown();
	*/
	if(keyStates[Keys.KEY_A])
		this.moveLeft();
	if(keyStates[Keys.KEY_D])
		this.moveRight();
	this.move();
};
Fortress.prototype.fire = function(){        
    if(this.balls.length > 4)
        return;
    var directionX = Math.cos(this.angle);
    var directionY = Math.sin(this.angle);
    
    var startX = this.cx + this.cannonWidth * directionX;
    var startY = this.cy + this.cannonWidth * directionY;

    var ball = new Ball(this.mapWidth,this.mapHeight,startX,startY,directionX,directionY);
    this.balls.push(ball);
};
Fortress.prototype.rotateCannon = function(targetX, targetY){
	var dx = targetX - this.cx;
	var dy = targetY - this.cy;
	this.angle = Math.atan2(dy,dx);
};
Fortress.prototype.move = function(){
	this.cx += this.speedX;
	this.cy += this.speedY;

	this.left = this.cx - this.radius;
	this.top = this.cy - this.radius;
	this.right = this.cx + this.radius;
	this.bottom = this.cy + this.radius;
};
Fortress.prototype.moveUp = function(){
    this.speedY = -this.power;
};
Fortress.prototype.moveDown = function(){
    this.speedY = this.power;
};
Fortress.prototype.moveLeft = function(){
	this.speedX = -this.power;
};
Fortress.prototype.moveRight = function(){
	this.speedX = this.power;
};
