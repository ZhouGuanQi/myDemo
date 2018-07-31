	//战斗机
	/*
	 * 战斗机
	 * 	    属性 飞机元素（div）
	 * 	    功能 
	 * 		创建飞机，飞机移动，
	 */
	function MyPlane(engine){
		this.plane = document.createElement("div");
		this.body_main = engine.body_main;//引擎中的战场	
		this.level = engine.level;
		this.enimes = engine.enimes;
		//初始化战斗机功能
		this.innit();
	}
	MyPlane.prototype.innit = function(){
		//添加战斗机
		this.creatPlane();
		//发射子弹（不停的添加子弹，发射无数的子弹）
		//var con =0 
		setInterval(function(){//用定时器的方式每隔一段时间去发射一颗子弹
			new Bullet(this);
		}.bind(this),this.level);
		//new Bullet(this);//这里只创建了一颗子弹
	}
	//添加战斗机
	MyPlane.prototype.creatPlane = function(){
		//my-warplain
		this.plane.className = "my-warplain";
		//如何拿到引擎的战场
		this.body_main.appendChild(this.plane);
		this.plane.style.bottom = 0;
		this.plane.style.left = (this.body_main.offsetWidth-this.plane.offsetWidth)/2 + "px";		
		//战斗机移动
		this.planeMove();
	}
	MyPlane.prototype.planeMove = function(){
		var that = this;
		this.body_main.onmousemove = function(e){
			var e = e || event;
			var l = e.pageX - that.plane.offsetWidth/2 - this.offsetLeft
			//飞机移动的边界处理
			l = l < 0 ? 0 : (l>this.offsetWidth - that.plane.offsetWidth ? this.offsetWidth - that.plane.offsetWidth : l);
			
			that.plane.style.left = l + "px";
		}
	}