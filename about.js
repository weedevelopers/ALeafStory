weed.about = function(game)
{
   
};

weed.about.prototype = 
{
   preload: function()
    {
        this.BG= this.add.sprite(0 ,0 ,'background');
        this.BG.alpha = 1;
        this.add.tween(this.BG).delay(0).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, false).start();
       
      
        
    },
    
    create: function()
    {
         this.about_page();
       
    
    },
    
    
    about_page: function()
    {
        
        this.page1= this.add.sprite(-436,-426,'about_us');
        this.page1.alpha=0;
        this.page1.scale.x=1.01;
        this.add.tween(this.page1).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, false).start();
        
        this.back_arrow1 =this.add.sprite(this.world.centerX-50, 1100, 'back_arrow');
        this.back_arrow1.anchor.setTo(0.5, 0.5);
        this.back_arrow1.scale.x = 0.7;
        this.back_arrow1.scale.y = 0.7;
        this.back_arrow1.inputEnabled = true;
        this.back_arrow1.events.onInputDown.add(this.back_menu1, this);
        
        this.back_arrow1 =this.add.sprite(this.world.centerX+50, 1100, 'next_arrow');
        this.back_arrow1.anchor.setTo(0.5, 0.5);
        this.back_arrow1.scale.x = 0.7;
        this.back_arrow1.scale.y = 0.7;
        this.back_arrow1.inputEnabled = true;
        this.back_arrow1.events.onInputDown.add(this.more_page, this);
    },
    
    more_page: function()
    {
        
        this.add.tween(this.page1).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, false).start();
        this.page2= this.add.sprite(-6,0,'more');
        this.page2.alpha=0;
        this.page2.scale.x=1.2;
        this.page2.scale.y=1.2;
        this.add.tween(this.page2).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, false).start();
        
        
        this.back_arrow2 =this.add.sprite(this.world.centerX-50, 1100, 'back_arrow');
        this.back_arrow2.anchor.setTo(0.5, 0.5);
        this.back_arrow2.scale.x = 0.7;
        this.back_arrow2.scale.y = 0.7;
        this.back_arrow2.inputEnabled = true;
        this.back_arrow2.events.onInputDown.add(this.about_page, this);
        
                    
        this.back_arrow2 =this.add.sprite(this.world.centerX+50, 1100, 'next_arrow');
        this.back_arrow2.anchor.setTo(0.5, 0.5);
        this.back_arrow2.scale.x = 0.7;
        this.back_arrow2.scale.y = 0.7;
        this.back_arrow2.inputEnabled = true;
        this.back_arrow2.events.onInputDown.add(this.back_menu1, this);
    },
    
    back_menu1: function()
    {
        this.state.start('MainMenu');
    }
    
};