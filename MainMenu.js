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

weed.MainMenu.prototype = {                 
	
	preload: function()
    {   
        
       
        this.preBG= this.add.sprite(0 ,0 ,'prebackground');
        this.preBG.alpha = 1;
        t1 = this.add.tween(this.preBG).to({alpha: 1}, 250, Phaser.Easing.Linear.None, false, 0).start();
        t1.onComplete.add(this.backgroundload, this);
        
        /*this.loadBar = this.add.sprite(this.world.centerX, this.world.centerY+200, 'leaf'); 
        this.loadBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.loadBar,1);*/
        
        
    },
    
    backgroundload: function()
    {
        

        this.BG= this.add.sprite(0 ,0 ,'background');
        this.BG.alpha = 0;
        t2 = this.add.tween(this.BG).to({alpha: 0.8}, 250, Phaser.Easing.Linear.None, false, 0).start();
        t2.onComplete.add(this.loadName, this);


    },
    
//------------------------------------------------------------------------------------------------    
    
    create: function()
    {
        
        //this.loadBar.cropEnabled = false; //force show the whole thing
                
        
    },
    
    loadName: function(){
       
        this.game_name1 = this.add.sprite(this.world.centerX-150, 65, 'text_a');
        this.game_name1.anchor.setTo(0.5,0.5);
        this.game_name1.scale.x = 0.7;
        this.game_name1.scale.y = 0.7;
        this.game_name1.alpha = 0;
        this.add.tween(this.game_name1).delay(100).to({alpha: 1}, 800, Phaser.Easing.Linear.None, false, 0).start();
        

        this.game_name2 = this.add.sprite(this.world.centerX+60, 65, 'text_leaf');
        this.game_name2.anchor.setTo(0.5,0.5);
        this.game_name2.scale.x = 0.7;
        this.game_name2.scale.y = 0.7;
        this.game_name2.alpha = 0;
        this.add.tween(this.game_name2).delay(100).to({alpha: 1}, 800, Phaser.Easing.Linear.None, false, 0).start();
        
        this.game_name3 = this.add.sprite(this.world.centerX, 200, 'text_story');
        this.game_name3.anchor.setTo(0.5,0.5);
        this.game_name3.scale.x = 0.4;
        this.game_name3.scale.y = 0.4;
        this.game_name3.alpha = 0;
        t6 = this.add.tween(this.game_name3).delay(100).to({alpha: 1}, 800, Phaser.Easing.Linear.None, false, 0).start();
        t6.onComplete.add(this.leafAnimations, this);

    },
    leafAnimations: function()
    {
        this.loadBar = this.add.sprite(this.world.centerX, this.world.centerY+300, 'leaf'); 
        this.loadBar.anchor.setTo(0.5, 0.5);
        this.loadBar.alpha =0;
        t3 = this.add.tween(this.loadBar).to({alpha:0.8}, 800, Phaser.Easing.Linear.None, false, 0).start();
        t3.onComplete.add(this.bubbleLoad, this);
              
    },
    
    bubbleLoad: function()
    {
        
        this.bubble1 = this.add.sprite(this.world.centerX-210, this.world.centerY+130, 'bubble_yellow'); 
        this.bubble1.anchor.setTo(0.5, 0.5);
        this.bubble1.alpha = 0;
        this.add.tween(this.bubble1).to({alpha: 0.8}, 1000, Phaser.Easing.Linear.None, false).start();
        this.bubble1.inputEnabled = true;
        this.bubble1.events.onInputDown.add(this.button1, this);
        
            
        this.bubble2 = this.add.sprite(this.world.centerX, this.world.centerY, 'bubble_green'); 
        this.bubble2.anchor.setTo(0.5, 0.5); // Sprites anchor is in the center of it
        this.bubble2.alpha = 0;
        this.add.tween(this.bubble2).to({alpha: 0.8}, 1000, Phaser.Easing.Linear.None, false).start();
        this.bubble2.inputEnabled = true;
        this.bubble2.events.onInputDown.add(this.button2, this);
                        
        this.bubble3 = this.add.sprite(this.world.centerX+210, this.world.centerY+130, 'bubble_blue'); 
        this.bubble3.anchor.setTo(0.5, 0.5); // Sprites anchor is in the center of it
        this.bubble3.alpha = 0;
        this.add.tween(this.bubble3).to({alpha: 0.8}, 1000, Phaser.Easing.Linear.None, false).start();
        this.bubble3.inputEnabled = true;
        this.bubble3.events.onInputDown.add(this.button3, this);

      if(weed.sound_mute ==true)
        {
            this.sound_control_off();
            
        }
        
        this.sound_on = this.add.sprite(this.world.centerX-260, 1100, 'sound_on'); 
        this.sound_on.alpha=0;
        this.sound_on.anchor.setTo(0.5, 0.5);
        this.sound_on.scale.x =0.3;
        this.sound_on.scale.y =0.3;
        
        if(weed.sound_mute == false)
        {
        
        this.add.tween(this.sound_on).to({alpha: 0.8}, 1000, Phaser.Easing.Linear.None, false).start();
        this.sound.mute = false;
        this.sound_on.inputEnabled = true;
        this.sound_on.events.onInputDown.add(this.sound_control_off, this);
        }
        
        this.about = this.add.sprite(this.world.centerX+260, 1100, 'about'); 
        this.about.alpha=0;
        this.about.anchor.setTo(0.5, 0.5);
        this.about.scale.x =0.3;
        this.about.scale.y =0.3;
        this.about.inputEnabled=true;
        this.about.events.onInputDown.add(this.about_button, this);
        this.add.tween(this.about).to({alpha: 0.7}, 1000, Phaser.Easing.Linear.None, false).start()
        .onComplete.add(this.bubbleAnimations, this);
        
    },
    
    

 sound_control_off: function()
    {
            weed.sound_mute= true;
            this.sound.mute= true;
            this.add.tween(this.sound_on).to({alpha: 0}, 500, Phaser.Easing.Linear.None, false).start();
            this.sound_on.inputEnabled= false;

            this.sound_off = this.add.sprite(this.world.centerX-260, 1100, 'sound_off'); 
            this.sound_off.alpha=0;
            this.sound_off.anchor.setTo(0.5, 0.5);
            this.sound_off.scale.x =0.3;
            this.sound_off.scale.y =0.3
            this.add.tween(this.sound_off).to({alpha: 0.8}, 500, Phaser.Easing.Linear.None, false).start();
            this.sound_off.inputEnabled= true;
            this.sound_off.events.onInputDown.add(this.sound_control_on, this);

        
    },

    sound_control_on:function()
    {
            weed.sound_mute= false;
            this.sound.mute= false;
            this.sound_off.inputEnabled =false;
            this.sound_off.alpha =0.8;
            this.add.tween(this.sound_off).to({alpha: 0}, 500, Phaser.Easing.Linear.None, false).start();
            
            this.sound_on.alpha= 0;
            this.add.tween(this.sound_on).to({alpha: 0.8}, 500, Phaser.Easing.Linear.None, false).start();
            this.sound_on.inputEnabled= true;
            this.sound_on.events.onInputDown.add(this.sound_control_off, this);
    },
 bubbleAnimations: function()
    {
        
        
       
        /*this.add.tween(this.bubble1)
                        .to({ y: this.world.centerY +130 - 6 }, 1000, Phaser.Easing.Linear.None, true)
                        .to({ y: this.world.centerY +130 + 6 }, 1000, Phaser.Easing.Linear.None)
                        .loop();
        this.add.tween(this.bubble1)
                        .to({ x: this.world.centerX-210 - 3 }, 1000, Phaser.Easing.Linear.None, true)
                        .to({ x: this.world.centerX-210 + 3 }, 1000, Phaser.Easing.Linear.None)
                        .loop();
        
        
       
        this.add.tween(this.bubble2)
                        .to({ y: this.world.centerY - 6 }, 1000, Phaser.Easing.Linear.None, true)
                        .to({ y: this.world.centerY + 6 }, 1000, Phaser.Easing.Linear.None)
                        .loop();
        
        this.add.tween(this.bubble3)
                        .to({ y: this.world.centerY + 130 - 6 }, 1000, Phaser.Easing.Linear.None, true)
                        .to({ y: this.world.centerY + 130 + 6 }, 1000, Phaser.Easing.Linear.None)
                        .loop();
        this.add.tween(this.bubble3)
                        .to({ x: this.world.centerX+210 + 3 }, 1000, Phaser.Easing.Linear.None, true)
                        .to({ x: this.world.centerX+210 - 3 }, 1000, Phaser.Easing.Linear.None)
                        .loop();
*/
        this.droppingLeaves();
        var random_temp = this.rnd.integerInRange(1, 2);
        var volume = 0.5;
        var i = 0;
        if(random_temp == 1 && this.mainMenuAudio==null){
            this.mainMenuAudio = this.add.audio('main_menu_audio_1');
            this.mainMenuAudio.play('', 0, 0, true);
            this.time.events.repeat(50, 1000000, function(){
                
                if(i != volume && this.mainMenuAudio!=null){
                    this.mainMenuAudio.volume = i;
                    i = i+0.01;

                }
                if(i >= volume && this.mainMenuAudio!=null){
                    this.mainMenuAudio.volume = i;
                    i = volume;

                }
            }, this);
            
        }
        if(random_temp == 2 && this.mainMenuAudio==null){
            volume =0.7;
            this.mainMenuAudio = this.add.audio('main_menu_audio_2');
            this.mainMenuAudio.play('', 0, 0, true);
            this.time.events.repeat(50, 1000000, function(){
                
                if(i != volume && this.mainMenuAudio!=null){
                    this.mainMenuAudio.volume = i;
                    i = i+0.01;

                }
                if(i >= volume && this.mainMenuAudio!=null){
                    this.mainMenuAudio.volume = i;
                    i = volume;

                }
            }, this);
        }
                
        
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
        if(this.mainMenuAudio != null){
            this.mainMenuAudio.stop();
            this.mainMenuAudio=null;
        }
        this.state.start('PlayGame'); 
    },
    
    button1 : function()
    {
       
        this.state.start('HighScores'); 
    },
    
    button3: function()
    {
        
        this.state.start('Help');
    },
    
    about_button: function()
    {
        this.state.start('about');
    }
    
};