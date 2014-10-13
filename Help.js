weed.Help = function(game)
{
   
};

weed.Help.prototype = 
{
   preload: function()
    {
        this.BG= this.add.sprite(0 ,0 ,'background');
        this.BG.alpha = 1;
        this.add.tween(this.BG).delay(0).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, false, 0).start();
       
       
        
    },
  
    create: function()
    {
        this.page1_load();
        
    },
    
  
    
    page1_load: function()
    {
        this.page1= this.add.sprite(0 ,0 ,'page1');
        this.page1.scale.x= 1.161;
        this.page1.scale.y= 1.22;
        this.page1.alpha = 0;
        this.add.tween(this.page1).delay(0).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, false, 0).start();
        
        this.back_arrow1 =this.add.sprite(this.world.centerX-50, 1100, 'back_arrow');
        this.back_arrow1.anchor.setTo(0.5, 0.5);
        this.back_arrow1.scale.x = 0.7;
        this.back_arrow1.scale.y = 0.7;
        this.back_arrow1.inputEnabled = true;
        this.back_arrow1.events.onInputDown.add(this.back_menu, this);
        
        this.back_arrow1 =this.add.sprite(this.world.centerX+50, 1100, 'next_arrow');
        this.back_arrow1.anchor.setTo(0.5, 0.5);
        this.back_arrow1.scale.x = 0.7;
        this.back_arrow1.scale.y = 0.7;
        this.back_arrow1.inputEnabled = true;
        this.back_arrow1.events.onInputDown.add(this.page2_load, this);
    },
    
    page2_load: function()
    {
        
        
       
        
        this.page2= this.add.sprite(-3 ,-2 ,'page2');
        this.page2.scale.x= 1.17;
        this.page2.scale.y= 1.22;
        this.page2.alpha = 0;
        this.add.tween(this.page2).delay(0).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, false).start();
       
        this.back_arrow2 =this.add.sprite(this.world.centerX-50, 1100, 'back_arrow');
        this.back_arrow2.anchor.setTo(0.5, 0.5);
        this.back_arrow2.scale.x = 0.7;
        this.back_arrow2.scale.y = 0.7;
        this.back_arrow2.inputEnabled = true;
        this.back_arrow2.events.onInputDown.add(this.page1_load, this);
        
                    
        this.back_arrow2 =this.add.sprite(this.world.centerX+50, 1100, 'next_arrow');
        this.back_arrow2.anchor.setTo(0.5, 0.5);
        this.back_arrow2.scale.x = 0.7;
        this.back_arrow2.scale.y = 0.7;
        this.back_arrow2.inputEnabled = true;
        this.back_arrow2.events.onInputDown.add(this.back_menu, this);
        
        
    },
    
   
         
    back_menu: function()
    {
        this.state.start('MainMenu');
    }
};