weed.MainMenu = function(game)
{
    this.loadBar = null;
    this.BG = null;
    this.preBG = null;
    this.titletext = null;
    this.bubble1= null;
    this.bubble2= null;
    this.bubble3= null;
    this.game_name = null;
    this.leaves = null;
    this.bubble1_click = null;
    
    
};

weed.MainMenu.prototype = {                 // to make methods preload(),create() etc available to all objects of bunnyDefender
	
	preload: function()
    {   
        this.load.image('test', 'images/Mobile/assets/menu_sprite/test.png');
        this.load.image('bubble_blue','images/Mobile/assets/menu_sprite/sky_blue.png');
        this.load.image('bubble_green','images/Mobile/assets/menu_sprite/light_green.png');
        this.load.image('bubble_yellow','images/Mobile/assets/menu_sprite/yellow1.png');
        this.load.image('name', 'images/Mobile/assets/menu_sprite/title_1.png');
        this.load.image('leaves', 'images/Mobile/assets/menu_sprite/falling_leaf.png');
       
       
        this.preBG= this.add.sprite(0 ,0 ,'prebackground');
        this.preBG.alpha = 1;
        t1 = this.add.tween(this.preBG).delay(0).to({alpha: 1}, 500, Phaser.Easing.Linear.None, false, 0).start();
        t1.onComplete.add(this.backgroundload, this);
        
        /*this.loadBar = this.add.sprite(this.world.centerX, this.world.centerY+200, 'leaf'); 
        this.loadBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.loadBar,1);*/
        
        
        
        
        
              
        
    },
    
    backgroundload: function()
    {
        this.BG= this.add.sprite(0 ,0 ,'background');
        this.BG.alpha = 0;
        t2 = this.add.tween(this.BG).delay(200).to({alpha: 0.8}, 500, Phaser.Easing.Linear.None, false, 0).start();
        t2.onComplete.add(this.leafAnimations, this);
    },
    
//------------------------------------------------------------------------------------------------    
    
    create: function()
    {
        
        //this.loadBar.cropEnabled = false; //force show the whole thing
                 
        
    },
    
    leafAnimations: function()
    {
        this.loadBar = this.add.sprite(this.world.centerX, this.world.height+300, 'leaf'); 
        this.loadBar.anchor.setTo(0.5, 0.5);
        t3 = this.add.tween(this.loadBar).delay(200).to({x: this.world.centerX, y: this.world.centerY+300}, 1000, Phaser.Easing.Quadratic.OutIn, false, 0).start();
        
        t3.onComplete.add(this.bubbleLoad, this);
        
    },
    
    bubbleLoad: function(){
        
        this.bubble1 = this.add.sprite(this.world.centerX-210, -300, 'bubble_yellow'); 
        this.bubble1.anchor.setTo(0.5, 0.5);
        this.add.tween(this.bubble1)
                        .to({ y: -300 }, 2000, Phaser.Easing.Cubic.Out, true)
                        .to({ y: this.world.centerY +130 + 6 }, 3000, Phaser.Easing.Cubic.Out);
        
        
            
        this.bubble2 = this.add.sprite(this.world.centerX, -300, 'bubble_green'); 
        //this.bubble1.aplha = 0.1;
        this.bubble2.anchor.setTo(0.5, 0.5); // Sprites anchor is in the center of it
        this.add.tween(this.bubble2)
                        .to({ y: -300 }, 2000, Phaser.Easing.Cubic.Out, true)
                        .to({ y: this.world.centerY + 6 }, 3000, Phaser.Easing.Cubic.Out);
        this.bubble2.inputEnabled = true;
        this.bubble2.events.onInputDown.add(this.button2, this);
                        
        this.bubble3 = this.add.sprite(this.world.centerX+210, -300, 'bubble_blue'); 
        //this.bubble1.aplha = 0.1;
        this.bubble3.anchor.setTo(0.5, 0.5); // Sprites anchor is in the center of it
        t6 = this.add.tween(this.bubble3)
                        .to({ y: -300 }, 2000, Phaser.Easing.Cubic.Out, true)
                        .to({ y: this.world.centerY + 130 + 6 }, 3000, Phaser.Easing.Cubic.Out);
        
        this.bubbleAnimations();
                      
    },
        
    
    bubbleAnimations: function()
    {
        
        
        //this.bubble1 = this.add.sprite(this.world.centerX-210, this.world.centerY+130, 'bubble_yellow'); 
        //this.bubble1.aplha = 0.1;
        //this.bubble1.anchor.setTo(0.5, 0.5); // Sprites anchor is in the center of it
        this.add.tween(this.bubble1)
                        .to({ y: this.world.centerY +130 - 6 }, 1000, Phaser.Easing.Linear.None, true)
                        .to({ y: this.world.centerY +130 + 6 }, 1000, Phaser.Easing.Linear.None)
                        .loop();
        this.add.tween(this.bubble1)
                        .to({ x: this.world.centerX-210 - 3 }, 1000, Phaser.Easing.Linear.None, true)
                        .to({ x: this.world.centerX-210 + 3 }, 1000, Phaser.Easing.Linear.None)
                        .loop();
        
        
        //this.bubble2 = this.add.sprite(this.world.centerX, this.world.centerY-250, 'bubble_green'); 
        //this.bubble1.aplha = 0.1;
        //this.bubble2.anchor.setTo(0.5, 0.5); // Sprites anchor is in the center of it
        this.add.tween(this.bubble2)
                        .to({ y: this.world.centerY - 6 }, 1000, Phaser.Easing.Linear.None, true)
                        .to({ y: this.world.centerY + 6 }, 1000, Phaser.Easing.Linear.None)
                        .loop();
        //this.bubble3 = this.add.sprite(this.world.centerX+210, this.world.centerY+130, 'bubble_blue'); 
        //this.bubble1.aplha = 0.1;
        //this.bubble3.anchor.setTo(0.5, 0.5); // Sprites anchor is in the center of it
        this.add.tween(this.bubble3)
                        .to({ y: this.world.centerY + 130 - 6 }, 1000, Phaser.Easing.Linear.None, true)
                        .to({ y: this.world.centerY + 130 + 6 }, 1000, Phaser.Easing.Linear.None)
                        .loop();
        this.add.tween(this.bubble3)
                        .to({ x: this.world.centerX+210 + 3 }, 1000, Phaser.Easing.Linear.None, true)
                        .to({ x: this.world.centerX+210 - 3 }, 1000, Phaser.Easing.Linear.None)
                        .loop();
        this.loadName();
    },
    
    
    loadName: function(){
       
        
        this.game_name = this.add.sprite(-10, 20, 'name');
        this.game_name.alpha = 0;
        t6 = this.add.tween(this.game_name).delay(1000).to({alpha: 1}, 2500, Phaser.Easing.Linear.None, false, 0).start();
        t6.onComplete.add(this.droppingLeaves, this);
        
    },
    
    
    droppingLeaves: function(){
        this.leaves = this.add.group();
        this.leaves.alpha = this.rnd.realInRange(0.1, 0.3);
        for(var i=0; i<15; i++){
           var leaf = this.leaves.create(this.rnd.integerInRange(0, this.world.width), this.rnd.integerInRange(-30, this.world.height), 'leaves');
            
            this.physics.enable(leaf, Phaser.Physics.ARCADE);
            leaf.enableBody = true;
            leaf.body.velocity.y = this.rnd.integerInRange(100, 200);
            leaf.checkWorldBounds = true;
            leaf.events.onOutOfBounds.add(this.resetLeaf, this);
        }
        
        
        
    },
    
    resetLeaf: function(l){
        if(l.y> this.world.height){
           
            l.reset(this.rnd.integerInRange(0, this.world.width), 0);
            l.body.velocity.y = this.rnd.integerInRange(100, 200);
        }
    },
    
        
    button2 : function()
    {
        this.state.start('PlayGame'); 
    },
    
    
};