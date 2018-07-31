/*
 * 
 * 子弹
 * 		
		属性 子弹元素(div)
			战场、子弹发射速度由选择难度时决定this.level
			
		功能  创建子弹，子弹移动，碰撞
 * 
 */
function Bullet(obj){//子弹的类
	//从引擎到飞机再到子弹
	this.body_main = obj.body_main;//引擎中的战场	
	//this.level = obj.level;
	this.plane = obj.plane;
	//接收敌机集合
	this.enimes = obj.enimes;
	//console.log(this.level);
	//初始化子弹功能
	this.innit();
}
Bullet.prototype.innit = function(){
	/*
	 * 这里的子弹，是一个弹的功能
	 */
	//子弹创建
	this.creatBullet();
	//子弹发射
	//setInterval(function(){//每隔一段时间去执行一下子弹的运动，不合适
	this.bulletMove();
	//}.bind(this),this.level);
}
Bullet.prototype.creatBullet = function(){
	this.bullet = document.createElement("div");
	this.bullet.className = "bullet";
	this.body_main.appendChild(this.bullet);
	
	this.bullet.style.left = this.plane.offsetLeft+this.plane.offsetWidth/2-this.bullet.offsetWidth/2+"px";
	this.bullet.style.top = this.plane.offsetTop-this.bullet.offsetHeight + "px";
	
}
//子弹运动
Bullet.prototype.bulletMove = function(){
	var speed = 0;
	this.bulletTimer = setInterval(function(){
		this.bullet.style.top = this.bullet.offsetTop+speed + "px";
		speed -= 5;
		
		//console.log(this.enimes);
		//子弹的运动里实现与敌机的碰撞,找到敌机集合，遍历每架敌机
		//如何拿到敌机,敌机的集合保存在this.enimes中
		//遍历this.enimes这个集合。
		
		for(var en of this.enimes){
			//console.log(en.enimePlane);
			if(pz(this.bullet,en.enimePlane)){
				clearInterval(this.bulletTimer);
				this.bullet.className = "bullet_die";  
				setTimeout(function(){
					this.bullet.remove();
				}.bind(this),100);
				en.hurt();
				//en.removEnemy();
			}
		}
		
		/*if(pz(this.bullet,飞机div)){
			
		}*/
		
		
		if(this.bullet.offsetTop < 0){
			this.bullet.remove();
			clearInterval(this.bulletTimer);
		}
	}.bind(this),30);
}

