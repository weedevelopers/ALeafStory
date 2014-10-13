weed.HighScores = function(game)
{
   this.highscore_text =null;
   this.highscore_num = null;

};

weed.HighScores.prototype = 
{
   preload: function()
    {
        this.BG= this.add.sprite(0 ,0 ,'background');
        this.BG.alpha = 1;
        this.add.tween(this.BG).delay(0).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, false, 0).start();
       
        this.preBG= this.add.sprite(0 ,0 ,'prebackground');
        this.preBG.alpha = 0;
        this.add.tween(this.preBG).delay(0).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, false, 0).start();
        
    },
    
    create: function()
    {
        this.highscore_text = this.add.sprite(this.world.centerX-150, 120, 'best_text');
        this.highscore_text.scale.x =0.5;
        this.highscore_text.scale.y= 0.5;
        this.highscore_text.anchor.setTo(0.5,0.5);
        
        this.highscore_text = this.add.sprite(this.world.centerX+150, 120, 'trips_text');
        this.highscore_text.scale.x =0.5;
        this.highscore_text.scale.y= 0.5;
        this.highscore_text.anchor.setTo(0.5,0.5);
        
        this.score_table();
        
        
    },
    
    score_table: function()
    {   
        this.i =1;
        
        var t, local; 
        if (this.game.device.localStorage)
            {

            for(var j=1; j<=9; j++)
                {
                    t= j.toString();
                    local = Math.floor(localStorage.getItem('HighScore'+t));
                    this.highscore_num = local;
                    this.separate_highscore_digits();
                    
                }
                
                    local = Math.floor(localStorage.getItem('HighScore'+'10'));
                    this.highscore_num = local;
                    this.separate_highscore_digits();
              
    
            }
        
        this.back();        // go back to main menu
                
    },      
    
    
    
    separate_highscore_digits: function()            // display total bonus
    {

        var d1, d2, d3; //the number will be d1d2d3 and not d3d2d1
        
        var str = this.highscore_num.toString();
        

        if(str.length ==3)
        {
            d1 = str.charCodeAt(0)-48;
            d2 = str.charCodeAt(1)-48;
            d3 = str.charCodeAt(2)-48;
            this.hundredsplace= d1;
            this.tensplace= d2;
            this.onesplace= d3;
        }
        
        if(str.length ==2)
        {
            d1 = str.charCodeAt(0)-48;
            d2 = str.charCodeAt(1)-48;
            this.hundredsplace= 0;
            this.tensplace= d1;
            this.onesplace= d2;
        }
        
        if(str.length ==1)
        {
            d1 = str.charCodeAt(0)-48;
            this.hundredsplace = 0;
            this.tensplace= 0;
            this.onesplace= d1;
        }
        
         this.display_highscore();
     },

display_highscore: function()
    {
        
            this.highscore_text= this.add.sprite(this.world.centerX-175,220+(80*this.i) ,this.numbers_black(this.i));
            this.highscore_text.anchor.setTo(0.5, 0.5);
            this.highscore_text.scale.x = 1;
            this.highscore_text.scale.y = 1;
        
       
            this.highscore_text= this.add.sprite(this.world.centerX+175,220+(80*this.i) ,this.spritename_green(this.onesplace));
            this.highscore_text.anchor.setTo(0.5, 0.5);
            this.highscore_text.scale.x = 0.3;
            this.highscore_text.scale.y = 0.3;
        
        if(this.tensplace!=0 || this.hundredsplace!=0)
        {
            this.highscore_text= this.add.sprite(this.world.centerX+175-40,220+(80*this.i) ,this.spritename_green(this.tensplace));
            this.highscore_text.anchor.setTo(0.5, 0.5);
            this.highscore_text.scale.x = 0.3;
            this.highscore_text.scale.y = 0.3;
        }
        
        if(this.hundredsplace!=0)
        {
            this.highscore_text= this.add.sprite(this.world.centerX+175-80,220+(80*this.i) ,this.spritename_green(this.hundredsplace));
            this.highscore_text.anchor.setTo(0.5, 0.5);
            this.highscore_text.scale.x = 0.3;
            this.highscore_text.scale.y = 0.3;
        }
            
        this.i= this.i+1;
        
        
            
    },
    
    
numbers_black: function(num)
    {
        switch (num)
        {
                case 10:
                    spriteName = '10_black';
                    return spriteName;
                    break;
                case 1:
                    spriteName = '1_black';
                    return spriteName;
                    break;
                case 2:
                    spriteName = '2_black';
                    return spriteName;
                    break;
                case 3:
                    spriteName = '3_black';
                    return spriteName;
                    break;
                case 4:
                    spriteName = '4_black';
                    return spriteName;
                    break;
                case 5:
                    spriteName = '5_black';
                    return spriteName;
                    break;
                case 6:
                    spriteName = '6_black';
                    return spriteName;
                    break;
                case 7:
                    spriteName = '7_black';
                    return spriteName;
                    break;
                case 8:
                    spriteName = '8_black';
                    return spriteName;
                    break;
                case 9:
                    spriteName = '9_black';
                    return spriteName;
                    break;
                default:
                    console.log('Error, not valid');
                    break;
            }
            
    } ,
    
    spritename_green : function(num)
    {
        switch (num)
        {
                case 0:
                    spriteName = 'zero_green';
                    return spriteName;
                    break;
                case 1:
                    spriteName = 'one_green';
                    return spriteName;
                    break;
                case 2:
                    spriteName = 'two_green';
                    return spriteName;
                    break;
                case 3:
                    spriteName = 'three_green';
                    return spriteName;
                    break;
                case 4:
                    spriteName = 'four_green';
                    return spriteName;
                    break;
                case 5:
                    spriteName = 'five_green';
                    return spriteName;
                    break;
                case 6:
                    spriteName = 'six_green';
                    return spriteName;
                    break;
                case 7:
                    spriteName = 'seven_green';
                    return spriteName;
                    break;
                case 8:
                    spriteName = 'eight_green';
                    return spriteName;
                    break;
                case 9:
                    spriteName = 'nine_green';
                    return spriteName;
                    break;
                default:
                    console.log('Error, not valid');
                    break;
            }
            
    },
    
    back: function()
    {
        this.back_arrow =this.add.sprite(this.world.centerX, 1100, 'back_arrow');
        this.back_arrow.anchor.setTo(0.5, 0.5);
        this.back_arrow.scale.x = 0.7;
        this.back_arrow.scale.y = 0.7;
        this.back_arrow.inputEnabled = true;
        this.back_arrow.events.onInputDown.add(this.backbutton, this);
        
        this.add.tween(this.back_arrow.scale)
                                    .to({x: 0.7, y: 0.7 }, 500, Phaser.Easing.Linear.None, true)
                                    .to({ x: 0.75, y: 0.75 }, 500, Phaser.Easing.Linear.None)
                                    .loop();
    },
    
    backbutton: function()
    {
        this.state.start('MainMenu');
    }
   
};
	