weed.PreGame = function(game)
{
    this.bubble1 = null;
    this.bubble2 = null;
};

weed.PreGame.prototype =
{             
    
    preload: function()
    {
        this.BG= this.add.sprite(0 ,0 ,'background');
        this.BG.alpha = 1;
        t4 = this.add.tween(this.BG).delay(0).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, false, 0).start();
       
        this.preBG= this.add.sprite(0 ,0 ,'prebackground');
        this.preBG.alpha = 0;
        t5 = this.add.tween(this.preBG).delay(0).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
        
    },
    
    create: function()
    {
        this.bubble1 = this.add.sprite(this.world.centerX-150, 600, 'bubble_darkblue'); 
        this.bubble1.anchor.setTo(0.5, 0.5);
        this.bubble1.alpha = 0;
        this.bubble2 = this.add.sprite(this.world.centerX+150, 600, 'bubble_red'); 
        this.bubble2.anchor.setTo(0.5, 0.5);
        this.bubble2.alpha = 0;
        
        this.bubble1.inputEnabled = true;
        this.bubble1.events.onInputDown.add(this.game1, this);
        this.bubble2.inputEnabled = true;
        this.bubble2.events.onInputDown.add(this.game1, this);
        
        t6=  this.add.tween(this.bubble1).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
        t6.onComplete.add(this.zoom1, this);               
        t8=  this.add.tween(this.bubble2).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
        t8.onComplete.add(this.zoom2, this);               
    },
    
    zoom1: function()
    {
        t7= this.add.tween(this.bubble1.scale).to({ x :1.1, y :1.1 }, 700, Phaser.Easing.Linear.None,true);
        t7.onComplete.add(this.bubble1_float, this);
        
        
    },
    
    bubble1_float: function()
    {
        this.add.tween(this.bubble1)
                        .to({ y: 600 - 6 }, 1000, Phaser.Easing.Linear.None, true)
                        .to({ y: 600 + 6 }, 1000, Phaser.Easing.Linear.None)
                        .loop();
        
    },
//------------------------------------------------------------------------------------------------------------------------------------------------    
    zoom2: function()
    {
        t9= this.add.tween(this.bubble2.scale).to({ x :1.1, y :1.1 }, 700, Phaser.Easing.Linear.None,true);
        t9.onComplete.add(this.bubble2_float, this);
    },
    
    bubble2_float: function()
    {
        this.add.tween(this.bubble2)
                        .to({ y: 600 - 6 }, 1000, Phaser.Easing.Linear.None, true)
                        .to({ y: 600 + 6 }, 1000, Phaser.Easing.Linear.None)
                        .loop();
       
    },
    
 //----------------------------------------------------------------------------------------------------------------------------------   
    game1: function()
    {
        this.state.start('PlayGame');
    }
    
    
	
}