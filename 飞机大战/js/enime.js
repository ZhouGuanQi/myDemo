
/*
 *  敌机
		属性 敌机元素本身
		功能 创建敌机，敌机移动，碰撞
 */
function Enime(obj,type){
	
	//战场
	this.body_main = obj.body_main;
	this.type = type;
	
	this.enimes = obj.enimes;	
	//初始化敌机功能
	this.innit();
}
Enime.prototype.innit = function(){
	//创建敌机
	this.creatEnime();
	//敌机运动
	this.planeMove();
}
Enime.prototype.creatEnime = function(){
	//创建敌机
	
	
	if(this.type == "small"){
		this.enimePlane = document.createElement("div");
		this.hp = 1;
		this.bgArr = ["plane1_die1","plane1_die2","plane1_die3"];
		this.enimeSpeed = 20;
		this.enimePlane.className = "enemy-small";
		this.body_main.appendChild(this.enimePlane);
		//把敌机放入战场
		this.enimePlane.style.left = getRand(0,this.body_main.offsetWidth-this.enimePlane.offsetWidth) + "px";
		this.enimePlane.style.top =  -this.enimePlane.offsetHeight + "px";
	}
	if(this.type == "middle"){
		this.enimePlane = document.createElement("div");
		//生命值
		this.hp = 3;
		//把敌机的爆炸状态存入一个数组中，以便敌机死掉后的爆炸状态处理。
		this.bgArr = ["plane2_die1","plane2_die2","plane2_die3","plane2_die4"];
		this.enimePlane.className = "enemy-middle";
		//敌机攻击速度
		this.enimeSpeed = 40;
		this.body_main.appendChild(this.enimePlane);
		//把敌机放入战场
		this.enimePlane.style.left = getRand(0,this.body_main.offsetWidth-this.enimePlane.offsetWidth) + "px";
		this.enimePlane.style.top =  -this.enimePlane.offsetHeight + "px";
	}
	if(this.type == "large"){
		this.enimePlane = document.createElement("div");
		this.hp = 6;
		this.bgArr = ["plane3_die1","plane3_die2","plane3_die3","plane3_die4","plane3_die5","plane3_die6"];
		this.enimePlane.className = "enemy-large";
		this.enimeSpeed = 80;
		this.body_main.appendChild(this.enimePlane);
		//把敌机放入战场
		this.enimePlane.style.left = getRand(0,this.body_main.offsetWidth-this.enimePlane.offsetWidth) + "px";
		this.enimePlane.style.top =  -this.enimePlane.offsetHeight + "px";
	}
	
	/*this.body_main.appendChild(this.enimePlane);
	//把敌机放入战场
	this.enimePlane.style.left = getRand(0,this.body_main.offsetWidth-this.enimePlane.offsetWidth) + "px";
	this.enimePlane.style.top =  -this.enimePlane.offsetHeight + "px";*/
}
//敌机的移动
Enime.prototype.planeMove = function(){
	var speed = 5;
	this.enimeTimer = setInterval(function(){
		this.enimePlane.style.top = this.enimePlane.offsetTop + speed + "px";
		if(this.enimePlane.offsetTop > this.body_main.offsetHeight + this.enimePlane.offsetHeight){
			this.enimePlane.remove();
			clearInterval(this.enimeTimer);
		}
	}.bind(this),this.enimeSpeed);
}
//敌机的受伤
Enime.prototype.hurt = function(){
	this.hp--;
	if(this.hp == 0){
		
		this.die();
		
	}
}
Enime.prototype.die = function(){
	clearInterval(this.enimeTimer);
	/*var arr = ["plane1_die1","plane1_die2","plane1_die3"];
	var arr = ["plane1_die1","plane1_die2","plane1_die3"];
	var arr = ["plane1_die1","plane1_die2","plane1_die3"];*/
	
	//当敌机死掉时把集合里的这架敌机删除，避免敌机死掉后还在阻止子弹的发射。
	this.enimes.delete(this);
	/*setTimeout(function(){
		this.enimePlane.remove();
	}.bind(this),500);*/
	setInterval(function(){
		if(this.bgArr.length == 0){
			this.enimePlane.remove();
			return;
		}
		this.enimePlane.style.background = "url(images/"+this.bgArr.shift()+".png) no-repeat";
		
	}.bind(this),200);
	
	
	
	
}

