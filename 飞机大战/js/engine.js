	function GameEngine(){
		//战场
		this.body_main = document.getElementById("body_main");
		//游戏难度选项
		this.options = document.getElementById("options").children;
		//创建一个set集合，用来保存所有的敌机信息；
		this.enimes = new Set();
		//保存游戏等级难度属性
		this.level = 0;
		
		//初始化游戏功能
		this.innit();
		
	}
	
	GameEngine.prototype.innit = function(){
		//alert("开始了")
		//选项功能实现；
		this.tableChoise();
	}
	
	//点击选项,选择游戏难度
	GameEngine.prototype.tableChoise = function(){
		//this
		var _this = this;
		for (var i = 0; i < this.options.length; i++) {
			this.options[i].onclick = function(){
				//this
				//把点击难度选项时保存难度值
				_this.level = this.getAttribute("level");
				//alert(_this.level);
				//把当前选项的元素删除进入欢迎动画
				this.parentNode.remove();
				//欢迎动画登场
				_this.showWelcome();
			};
		}
	}
	//欢迎页动画
	GameEngine.prototype.showWelcome = function(){
		//logo出场
		this.addLogo();
		//小飞机动画
		this.smallPlaneAnimate();
		//战场背景动画
		this.bodyBGAnimate();
		//3秒后进入战场
		setTimeout(function(){
			this.clearWelcome();
			//游戏开始
			this.gameStart();
		}.bind(this),3000);
	}
	//游戏开始
	GameEngine.prototype.gameStart = function(){
		//战斗机出场
		new MyPlane(this);
		//敌机出场
		setInterval(function(){
			//当前每出现一架敌机时，把这架敌机保存到一个集合里，作为引擎的属性存在
			//如何保存
			//把敌机保存到集合中。
			this.enimes.add(new Enime(this,"small"));
		}.bind(this),500);
		setInterval(function(){
			this.enimes.add(new Enime(this,"middle"));
			//new Enime(this,"middle");
		}.bind(this),getRand(3000,6000));
		setInterval(function(){
			this.enimes.add(new Enime(this,"large"));
			//new Enime(this,"large");
		}.bind(this),getRand(6000,10000));
	}
	//添加logo
	GameEngine.prototype.addLogo = function(){
		this.logo = document.createElement("div");
		this.logo.className = "logo";
		this.body_main.appendChild(this.logo);
	}
	//小飞机动画
	GameEngine.prototype.smallPlaneAnimate = function(){
		//创建小飞机
		this.smallPlane = document.createElement("div");
		this.smallPlane.className = "loading";
		this.body_main.appendChild(this.smallPlane);
		var i = 1;
		this.smallPlaneTimer = setInterval(function(){
			i++;
			this.smallPlane.style.background = "url(images/loading"+i+".png) no-repeat";
			if(i == 3){
				i = 0;
			}
		}.bind(this),500);		
	}
	//战场背景动画
	GameEngine.prototype.bodyBGAnimate = function(){
		var speed = 0;
		setInterval(function(){
			this.body_main.style.backgroundPositionY = (speed+=5) + "px";
		}.bind(this),50);
	}
	//清除欢迎动画
	GameEngine.prototype.clearWelcome = function(){
		this.logo.remove();
		this.smallPlane.remove();
		clearInterval(this.smallPlaneTimer);
	}