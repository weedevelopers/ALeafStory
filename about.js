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
       
        this.page1= this.add.sprite(-436,-426,'about_us');
        this.page1.alpha=0;
        this.page1.scale.x=1.01;
        this.add.tween(this.page1).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, false).start();
       
        
    },
    
    create: function()
    {
       
    
        this.back_arrow =this.add.sprite(this.world.centerX, 1100, 'back_arrow');
        this.back_arrow.anchor.setTo(0.5, 0.5);
        this.back_arrow.scale.x = 0.7;
        this.back_arrow.scale.y = 0.7;
        this.back_arrow.inputEnabled = true;
        this.back_arrow.events.onInputDown.add(this.backbutton1, this);
        
        this.add.tween(this.back_arrow.scale)
                                    .to({x: 0.7, y: 0.7 }, 500, Phaser.Easing.Linear.None, true)
                                    .to({ x: 0.75, y: 0.75 }, 500, Phaser.Easing.Linear.None)
                                    .loop();
    },
    
    backbutton1: function()
    {
        this.state.start('MainMenu');
    }
    
};