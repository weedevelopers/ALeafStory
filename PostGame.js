weed.PostGame = function(game){
    this.initialScore = null;
    this.finalScore = null;
    this.bonusScore = null;
    this.penaltyScore = null;
    this.score_image = null;
    this.totalScore = null;
    this.nullsprite = null;
    this.i = null;
    this.j = null;
    this.k = null;
    this.onesplace =null;
    this.tensplace = null;
    this.hundredsplace = null;
    this.a =null;
    this.b= null;
    this.c= null;
    this.l= null;
    this.m= null;
    this.n= null;
};

weed.PostGame.prototype = {
    
    create: function()
    {
            
       
        //this.input.disbaled = false;       
        this.BG= this.add.sprite(0 ,0 ,'prebackground');
        this.BG.alpha = 1;
        t4 = this.add.tween(this.BG).delay(0).to({alpha: 0}, 800, Phaser.Easing.Linear.None, false).start();
       
        this.preBG= this.add.sprite(0 ,0 ,'background');
        this.preBG.alpha = 0;
        this.add.tween(this.preBG).delay(0).to({alpha: 1}, 800, Phaser.Easing.Linear.None, true)
        .onComplete.add(function()
        {
            
            this.score_bounce_audio = this.add.audio('score_bounce_audio');
            this.score_bounce_audio.play('', 0, 1, false);

            this.score_image= this.add.sprite(this.world.centerX-10,-150 ,'score_sprite');  //-----------------score text
            this.score_image.anchor.setTo(0.5, 1);
            this.add.tween(this.score_image).to({x: this.world.centerX-10, y: 250}, 1500, Phaser.Easing.Bounce.Out, true) 
            .onComplete.add(this.buckets_zoom_left, this);  
        }, this);
        
    //-----------------------------------------------------------------audio-----------------------------------
        this.scrolling_audio= this.add.audio('scrolling_numbers');
        this.scrolling_audio.play('', 0, 0, true);
	
    
    },
    
    
    
    buckets_zoom_left: function()
    {
         this.bucket_left = this.add.sprite(this.world.centerX-120, 420, 'bucket_left');
         this.bucket_left.anchor.setTo(0.5,0.5);
         this.bucket_left.scale.x = 0.4;
         this.bucket_left.scale.y = 0.4;

         this.pot1_audio =this.add.audio('pot1_audio');
        
         this.add.tween(this.bucket_left.scale).to({ x :0.4, y :0.4 }, 500, Phaser.Easing.Linear.None,true)
                                 .to({ x :0.5, y :0.5 }, 500, Phaser.Easing.Linear.None)
                                 .to({ x :0.4, y :0.4 }, 500, Phaser.Easing.Linear.None)
                .onComplete.add(function()
                    {
                        this.pot1_audio.play('', 0, 1, false);
                        this.time.events.repeat(800, 1, this.plus_animation, this);
                    }, this);
    },

    plus_animation: function()
    {
        this.plus =this.add.sprite(this.world.centerX, 420, 'plus');
        this.plus.anchor.setTo(0.5,0.5);
        this.plus.scale.x = 0.15;
        this.plus.scale.y = 0.15;
        this.add.tween(this.plus.scale).to({ x :0.17, y :0.17 }, 200, Phaser.Easing.Linear.None, true)
                        .to({ x :0.15, y :0.15 }, 200, Phaser.Easing.Linear.None)
                        .onComplete.add(this.bucket_zoom_right, this);
    },

    bucket_zoom_right: function()            
    {
    
        

        this.bucket_right = this.add.sprite(this.world.centerX+120, 420, 'bucket_right');
        this.bucket_right.anchor.setTo(0.5,0.5);
        this.bucket_right.scale.x = 0.4;
        this.bucket_right.scale.y = 0.4;

        this.pot2_audio =this.add.audio('pot2_audio');
        
        
        this.add.tween(this.bucket_right.scale).to({ x :0.4, y :0.4 }, 500, Phaser.Easing.Linear.None, true)
        .onComplete.add(function()
                            {
                                this.pot2_audio.play('', 0, 1, false);
                                this.add.tween(this.bucket_right.scale).to({ x :0.5, y :0.5 }, 500, Phaser.Easing.Linear.None, true)
                                .onComplete.add(function()
                                    {
                                        this.add.tween(this.bucket_right.scale).to({ x :0.4, y :0.4 }, 500, Phaser.Easing.Linear.None, true)
                                        .onComplete.add(this.calculateScores, this);
                                    }    , this);

                            }, this);
   
    },
    

    
    calculateScores: function()
    {
       /* weed.totalCannabis=100 ;             //---------------------total cannabis collected in good pot
        weed.totalGarbage = 100;             //---------------------total garbage in good pot (penalty)
        weed.bad_in_garbage = 100;    */     //---------------------total garbage in bad pot (bonus)*/
        this.totalScore = weed.totalCannabis-weed.totalGarbage+weed.bad_in_garbage;
        
         if (this.game.device.localStorage)
            {

               var temp =0;
               var i,t;
               var arr= []; 
               var pos= 0;    
               var flag =0;
                
                  
               for(i=0; i<10; i++)
                {
                    t=i+1;
                    t= t.toString();
                    arr[i] = Math.floor(localStorage.getItem('HighScore'+t));
                    
                    if((this.totalScore>= arr[i]) && (flag==0))
                    {
                        pos =i;
                        flag=1;
                    }   
                }
                
                
            if(flag==1)
            {
                for(i = 0; i < pos; i++)
                {
                    t= i+1;
                    t= t.toString();
                    localStorage.setItem('HighScore'+t,arr[i]);
                }
                
                temp= pos+1;
                temp= temp.toString();
                localStorage.setItem('HighScore'+temp, this.totalScore);
               
                
                for(i = pos + 1; i < arr.length; i++)
                {
                    t= i+1;
                    t= t.toString();
                    localStorage.setItem('HighScore'+t,arr[i-1]);
                }
                    
            }
                /*var temp = 0;
                localStorage.setItem('HighScore1', temp);
                localStorage.setItem('HighScore2', temp);
                localStorage.setItem('HighScore3', temp);
                localStorage.setItem('HighScore4', temp);
                localStorage.setItem('HighScore5', temp);
                localStorage.setItem('HighScore6', temp);
                localStorage.setItem('HighScore7', temp);
                localStorage.setItem('HighScore8', temp);
                localStorage.setItem('HighScore9', temp);
                localStorage.setItem('HighScore10', temp);*/

            }
        


        this.separate_score_Digits_totalCannabis();
           
    },
//------------------------------------------------------score digit separator----------------------------------------------------------    
    
    separate_score_Digits_totalCannabis: function()
    {

        var d1, d2, d3; //the number will be d1d2d3 and not d3d2d1
        var str = weed.totalCannabis.toString();
        this.i =0;
        this.j=0;
        this.k=0;

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
        
       
        
        this.time.events.repeat(100, this.onesplace, this.display_numbers_onesplace, this);     // displays totalCannabis
       
    },
   
   separate_score_Digits_totalGarbage: function()            // displays total penalty
    {

        var d1, d2, d3; //the number will be d1d2d3 and not d3d2d1
        var str = weed.totalGarbage.toString();
        this.a =0;
        this.b=0;
        this.c= 0;

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
        this.time.events.repeat(100, this.onesplace, this.display_numbers_onesplace_garbageInGood, this);
        
     },

   separate_score_Digits_garbageInBad: function()            // display total bonus
    {

        var d1, d2, d3; //the number will be d1d2d3 and not d3d2d1
        var str = weed.bad_in_garbage.toString();
        this.l =0;
        this.m =0;
        this.n =0;

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
        this.time.events.repeat(100, this.onesplace, this.display_numbers_onesplace_garbageInBad, this);
        
     },



//--------------------------------------------------total cannnabis score display-------------------------------------------------------
    
    display_numbers_onesplace: function()
    {
               
            this.text1 = this.add.sprite(this.world.centerX-180, 665, 'goodstuff');
            this.text1.anchor.setTo(0.5, 0.5);
            this.text1.scale.x= 0.85;
            this.text1.scale.y= 0.85;    

            this.scrolling_audio.volume =1;
           
                if(this.i < this.onesplace)
                {
                    if(this.hundredsplace == 0)
                    {
                        this.temp_sprite= this.add.sprite(this.world.centerX+185,660 ,this.spritename_green(this.i));
                        this.temp_sprite.anchor.setTo(0.5, 0.5);
                        this.temp_sprite.scale.x = 0.7;
                        this.temp_sprite.scale.y = 0.7;
                        this.temp_sprite.alpha = 1;
                        this.add.tween(this.temp_sprite).delay(0).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);
                        this.i= this.i+1;
                    }

                    else
                    {
                        this.temp_sprite= this.add.sprite(this.world.centerX+210,660 ,this.spritename_green(this.i));
                        this.temp_sprite.anchor.setTo(0.5, 0.5);
                        this.temp_sprite.scale.x = 0.7;
                        this.temp_sprite.scale.y = 0.7;
                        this.temp_sprite.alpha = 1;
                        this.add.tween(this.temp_sprite).delay(0).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);
                        this.i= this.i+1;
                    }                   
                    
                }
        
                if(this.i== this.onesplace)
                {
                    
                 if(this.hundredsplace == 0)  
                 { 
                    this.temp_sprite= this.add.sprite(this.world.centerX+185,660 ,this.spritename_green(this.i));
                    this.temp_sprite.anchor.setTo(0.5, 0.5);
                    this.temp_sprite.scale.x = 0.7;
                    this.temp_sprite.scale.y = 0.7;
                    this.temp_sprite.alpha = 1;
                    this.add.tween(this.temp_sprite).delay(0).to({alpha: 1}, 100, Phaser.Easing.Linear.None, true)
                    .onComplete.add(this.onesplace_complete, this);
                    this.i= 0;
                    
                 }
                else  
                 { 
                    this.temp_sprite= this.add.sprite(this.world.centerX+210,660 ,this.spritename_green(this.i));
                    this.temp_sprite.anchor.setTo(0.5, 0.5);
                    this.temp_sprite.scale.x = 0.7;
                    this.temp_sprite.scale.y = 0.7;
                    this.temp_sprite.alpha = 1;
                    this.add.tween(this.temp_sprite).delay(0).to({alpha: 1}, 100, Phaser.Easing.Linear.None, true)
                    .onComplete.add(this.onesplace_complete, this);
                    this.i= 0;
                    
                 }
                } 
    },
        
    onesplace_complete: function()
    {
         this.time.events.repeat(100, this.tensplace, this.display_numbers_tensplace, this);
    },
  
     display_numbers_tensplace: function()
    {
                if(this.j < this.tensplace)
                {
                    if(this.hundredsplace == 0)
                    {
                        this.temp_sprite= this.add.sprite(this.world.centerX+75,660 ,this.spritename_green(this.j));
                        this.temp_sprite.anchor.setTo(0.5, 0.5);
                        this.temp_sprite.scale.x = 0.7;
                        this.temp_sprite.scale.y = 0.7;
                        this.temp_sprite.alpha = 1;
                        this.add.tween(this.temp_sprite).delay(0).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);
                        this.j= this.j+1;
                    
                    }
                    else
                    {
                        this.temp_sprite= this.add.sprite(this.world.centerX+100,660 ,this.spritename_green(this.j));
                        this.temp_sprite.anchor.setTo(0.5, 0.5);
                        this.temp_sprite.scale.x = 0.7;
                        this.temp_sprite.scale.y = 0.7;
                        this.temp_sprite.alpha = 1;
                        this.add.tween(this.temp_sprite).delay(0).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);
                        this.j= this.j+1;
                        
                    }
                }
        
                if(this.j== this.tensplace)
                {
                    
                    if(this.hundredsplace ==0)
                    {
                        this.temp_sprite= this.add.sprite(this.world.centerX+75,660 ,this.spritename_green(this.j));
                        this.temp_sprite.anchor.setTo(0.5, 0.5);
                        this.temp_sprite.scale.x = 0.7;
                        this.temp_sprite.scale.y = 0.7;
                        this.temp_sprite.alpha = 1;
                        
                        this.add.tween(this.temp_sprite).delay(0).to({alpha: 1}, 100, Phaser.Easing.Linear.None, true)
                        .onComplete.add(this.tensplace_complete, this);
                        this.j= 0;
                        
                    }
                    
                    else
                    {
                        this.temp_sprite= this.add.sprite(this.world.centerX+100,660 ,this.spritename_green(this.j));
                        this.temp_sprite.anchor.setTo(0.5, 0.5);
                        this.temp_sprite.scale.x = 0.7;
                        this.temp_sprite.scale.y = 0.7;
                        this.temp_sprite.alpha = 1;
                        this.add.tween(this.temp_sprite).delay(0).to({alpha: 1}, 100, Phaser.Easing.Linear.None, true)
                        .onComplete.add(this.tensplace_complete, this);
                        this.j= 0;
                    }
                }
    },
        
    tensplace_complete: function()
    {
        if(this.hundredsplace!=0)
         this.time.events.repeat(100, this.hundredsplace, this.display_numbers_hundredsplace, this);

        if(this.hundredsplace==0)
        {
            this.scrolling_audio.volume=0;
            this.separate_score_Digits_totalGarbage();
        }
        
    },
      display_numbers_hundredsplace: function()
    {
        
                if(this.k < this.hundredsplace)
                {
                    this.temp_sprite= this.add.sprite(this.world.centerX+10,660 ,this.spritename_green(this.k));
                    this.temp_sprite.anchor.setTo(0.5, 0.5);
                    this.temp_sprite.scale.x = 0.7;
                    this.temp_sprite.scale.y = 0.7;
                    this.temp_sprite.alpha = 1;
                    this.add.tween(this.temp_sprite).delay(0).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);
                    this.k= this.k+1;
                    
                }
        
                if(this.k== this.hundredsplace)
                {
                    this.temp_sprite= this.add.sprite(this.world.centerX+10,660 ,this.spritename_green(this.k));
                    this.temp_sprite.anchor.setTo(0.5, 0.5);
                    this.temp_sprite.scale.x = 0.7;
                    this.temp_sprite.scale.y = 0.7;
                    this.temp_sprite.alpha = 1;
                    this.add.tween(this.temp_sprite).delay(0).to({alpha: 1}, 100, Phaser.Easing.Linear.None, true)
                    .onComplete.add(this.separate_score_Digits_totalGarbage, this);    
                    this.scrolling_audio.volume=0;
                    this.k= 0;
                    
                }
    },
    
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
//--------------------------------------------------------end of total Cannabis score display------------------------------------------------   
    

//--------------------------------------------------total garbage in good-----------------------------------------------------------------    

 display_numbers_onesplace_garbageInGood: function()
    {
            this.text2 = this.add.sprite(this.world.centerX-200, 860, 'notso_goodstuff');
            this.text2.anchor.setTo(0.5, 0.5);
            this.text2.scale.x= 0.55;
            this.text2.scale.y= 0.55;    

            this.scrolling_audio.volume =1;

                if(this.a < this.onesplace)
                {
                    this.temp_sprite= this.add.sprite(this.world.centerX+160,860 ,this.spritename_red(this.a));
                    this.temp_sprite.anchor.setTo(0.5, 0.5);
                    this.temp_sprite.scale.x = 0.4;
                    this.temp_sprite.scale.y = 0.4;
                    this.temp_sprite.alpha = 1;
                    this.add.tween(this.temp_sprite).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);
                    this.a= this.a+1;
                    
                }
        
                if(this.a== this.onesplace)
                {
                    this.temp_sprite= this.add.sprite(this.world.centerX+160,860 ,this.spritename_red(this.a));
                    this.temp_sprite.anchor.setTo(0.5, 0.5);
                    this.temp_sprite.scale.x = 0.4;
                    this.temp_sprite.scale.y = 0.4;
                    this.temp_sprite.alpha = 1;
                    this.add.tween(this.temp_sprite).to({alpha: 1}, 100, Phaser.Easing.Linear.None, true)
                    .onComplete.add(this.onesplace_complete_garbageInGood, this);
                    this.a= 0;
                   
                }
    },
        
    onesplace_complete_garbageInGood: function()
    {
         this.time.events.repeat(100, this.tensplace, this.display_numbers_tensplace_garbageInGood, this);
    },
  
     display_numbers_tensplace_garbageInGood: function()
    {
                if(this.b < this.tensplace)
                {
                    this.temp_sprite= this.add.sprite(this.world.centerX+105,860 ,this.spritename_red(this.b));
                    this.temp_sprite.anchor.setTo(0.5, 0.5);
                    this.temp_sprite.scale.x = 0.4;
                    this.temp_sprite.scale.y = 0.4;
                    this.temp_sprite.alpha = 1;
                    this.add.tween(this.temp_sprite).delay(0).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);
                    this.b= this.b+1;
                    
                }
        
                if(this.b== this.tensplace)
                {
                    this.temp_sprite= this.add.sprite(this.world.centerX+105,860 ,this.spritename_red(this.b));
                    this.temp_sprite.anchor.setTo(0.5, 0.5);
                    this.temp_sprite.scale.x = 0.4;
                    this.temp_sprite.scale.y = 0.4;
                    this.temp_sprite.alpha = 1;
                    this.add.tween(this.temp_sprite).delay(0).to({alpha: 1}, 100, Phaser.Easing.Linear.None, true)
                  .onComplete.add(this.tensplace_complete_garbageInGood, this);
                    this.b= 0;
                    
                }
    },
        
    tensplace_complete_garbageInGood: function()
    {
         if(this.hundredsplace!=0)
         this.time.events.repeat(100, this.hundredsplace, this.display_numbers_hundredsplace_garbageInGood, this);

         if(this.hundredsplace==0)
           { 
                this.scrolling_audio.volume =0;
                this.separate_score_Digits_garbageInBad();
           }    
         
    },
      display_numbers_hundredsplace_garbageInGood: function()
    {
                if(this.c < this.hundredsplace)
                {
                    this.temp_sprite= this.add.sprite(this.world.centerX+50,860 ,this.spritename_red(this.c));
                    this.temp_sprite.anchor.setTo(0.5, 0.5);
                    this.temp_sprite.scale.x = 0.4;
                    this.temp_sprite.scale.y = 0.4;
                    this.temp_sprite.alpha = 1;
                    this.add.tween(this.temp_sprite).delay(0).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);
                    this.c= this.c+1;
                    
                }
        
                if(this.c== this.hundredsplace)
                {
                    this.temp_sprite= this.add.sprite(this.world.centerX+50,860 ,this.spritename_red(this.c));
                    this.temp_sprite.anchor.setTo(0.5, 0.5);
                    this.temp_sprite.scale.x = 0.4;
                    this.temp_sprite.scale.y = 0.4;
                    this.temp_sprite.alpha = 1;
                    this.add.tween(this.temp_sprite).delay(0).to({alpha: 1}, 100, Phaser.Easing.Linear.None, true)
                    .onComplete.add(this.separate_score_Digits_garbageInBad, this);
                    this.scrolling_audio.volume =0;
                    this.c= 0;
                    
                }
    },
    
    spritename_red : function(num)
    {
        switch (num)
        {
                case 0:
                    spriteName = 'zero_red';
                    return spriteName;
                    break;
                case 1:
                    spriteName = 'one_red';
                    return spriteName;
                    break;
                case 2:
                    spriteName = 'two_red';
                    return spriteName;
                    break;
                case 3:
                    spriteName = 'three_red';
                    return spriteName;
                    break;
                case 4:
                    spriteName = 'four_red';
                    return spriteName;
                    break;
                case 5:
                    spriteName = 'five_red';
                    return spriteName;
                    break;
                case 6:
                    spriteName = 'six_red';
                    return spriteName;
                    break;
                case 7:
                    spriteName = 'seven_red';
                    return spriteName;
                    break;
                case 8:
                    spriteName = 'eight_red';
                    return spriteName;
                    break;
                case 9:
                    spriteName = 'nine_red';
                    return spriteName;
                    break;
                default:
                    console.log('Error, not valid');
                    break;
            }
            
    },
//---------------------------------------------------end of total garbage in good-----------------------------------------------------------


//----------------------------------------------------total garbage in bad---------------------------------------------------------------

 display_numbers_onesplace_garbageInBad: function()
    {
            
            this.text3 = this.add.sprite(this.world.centerX-200, 1000, 'bonus');
            this.text3.anchor.setTo(0.5, 0.5);
            this.text3.scale.x= 0.6;
            this.text3.scale.y= 0.6;

            this.scrolling_audio.volume =1;
                if(this.l < this.onesplace)
                {
                    this.temp_sprite= this.add.sprite(this.world.centerX+170,1000 ,this.spritename_green(this.l));
                    this.temp_sprite.anchor.setTo(0.5, 0.5);
                    this.temp_sprite.scale.x = 0.4;
                    this.temp_sprite.scale.y = 0.4;
                    this.temp_sprite.alpha = 1;
                    this.add.tween(this.temp_sprite).delay(0).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);
                    this.l= this.l+1;
                    
                }
        
                if(this.l== this.onesplace)
                {
                    this.temp_sprite= this.add.sprite(this.world.centerX+170,1000 ,this.spritename_green(this.l));
                    this.temp_sprite.anchor.setTo(0.5, 0.5);
                    this.temp_sprite.scale.x = 0.4;
                    this.temp_sprite.scale.y = 0.4;
                    this.temp_sprite.alpha = 1;
                    this.add.tween(this.temp_sprite).delay(0).to({alpha: 1}, 100, Phaser.Easing.Linear.None, true)
                    .onComplete.add(this.onesplace_complete_garbageInBad, this);

                    this.l= 0;
                    
                }
    },
      
    onesplace_complete_garbageInBad: function()
    {
       
        if(this.tensplace!=0 || this.hundredsplace!=0)
        this.time.events.repeat(100, this.tensplace, this.display_numbers_tensplace_garbageInBad, this);

        else
            {
                this.scrolling_audio.volume=0;
                this.render_totalscore();        
            }

    },   
  
  
     display_numbers_tensplace_garbageInBad: function()
    {
                if(this.m < this.tensplace)
                {
                    this.temp_sprite= this.add.sprite(this.world.centerX+110,1000 ,this.spritename_green(this.m));
                    this.temp_sprite.anchor.setTo(0.5, 0.5);
                    this.temp_sprite.scale.x = 0.4;
                    this.temp_sprite.scale.y = 0.4;
                    this.temp_sprite.alpha = 1;
                    this.add.tween(this.temp_sprite).delay(0).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);
                    this.m= this.m+1;
                    
                }
        
                if(this.m== this.tensplace)
                {
                    this.temp_sprite= this.add.sprite(this.world.centerX+110,1000 ,this.spritename_green(this.m));
                    this.temp_sprite.anchor.setTo(0.5, 0.5);
                    this.temp_sprite.scale.x = 0.4;
                    this.temp_sprite.scale.y = 0.4;
                    this.temp_sprite.alpha = 1;
                    this.add.tween(this.temp_sprite).delay(0).to({alpha: 1}, 100, Phaser.Easing.Linear.None, true)
                    .onComplete.add(this.tensplace_complete_garbageInBad, this);
                   
                    this.m= 0;
                    
                }
    },


    tensplace_complete_garbageInBad: function()
    {
        
        if(this.hundredsplace!=0)
        this.time.events.repeat(100, this.tensplace, this.display_numbers_hundredsplace_garbageInBad, this);

        else
            {
                this.scrolling_audio.volume =0;
                this.render_totalscore();
            }
    },   
        
    
      display_numbers_hundredsplace_garbageInBad: function()
    {
                if(this.n < this.hundredsplace)
                {
                    this.temp_sprite= this.add.sprite(this.world.centerX+55,1000 ,this.spritename_green(this.n));
                    this.temp_sprite.anchor.setTo(0.5, 0.5);
                    this.temp_sprite.scale.x = 0.4;
                    this.temp_sprite.scale.y = 0.4;
                    this.temp_sprite.alpha = 1;
                    this.add.tween(this.temp_sprite).delay(0).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);
                    this.n= this.n+1;
                    
                }
        
                if(this.n== this.hundredsplace)
                {
                    this.temp_sprite= this.add.sprite(this.world.centerX+55,1000 ,this.spritename_green(this.n));
                    this.temp_sprite.anchor.setTo(0.5, 0.5);
                    this.temp_sprite.scale.x = 0.4;
                    this.temp_sprite.scale.y = 0.4;
                    this.temp_sprite.alpha = 1;
                    

                    this.add.tween(this.temp_sprite).delay(0).to({alpha: 1}, 100, Phaser.Easing.Linear.None, true)
                    .onComplete.add(this.render_totalscore, this);
                    this.scrolling_audio.volume =0;
                    this.n= 0;
                    
                }
    },
//--------------------------------------------------------end of total garbage in bad---------------------------------------------------- 

//------------------------------------------------to render backdrop screen---------------------------------------------------------------
render_totalscore: function()
    {
    
    this.time.events.repeat(1000, 1, function()
        {
            this.backdrop = this.add.sprite(this.world.centerX,this.world.centerY+100, 'totalscore_screen');
            this.backdrop.anchor.setTo(0.5, 0.5);
            this.backdrop.alpha = 0;
            this.backdrop.scale.x=1.9;
            this.backdrop.scale.y=2;
            this.add.tween(this.backdrop).to({alpha: 0.9}, 800, Phaser.Easing.Linear.None, false).start()
            .onComplete.add(this.render_totalscore2, this);

        }, this);
    

    },

render_totalscore2: function()
    {

            this.button_left = this.add.sprite(this.world.centerX-155,this.world.centerY+465, 'button_left');
            this.button_left.anchor.setTo(0.5, 0.5);
            this.button_left.alpha = 0;
            this.button_left.scale.x=1.9;
            this.button_left.scale.y=2;
            this.button_left.inputEnabled = true;
            this.button_left.events.onInputDown.add(this.gotoPlayGame, this);


            this.button_right = this.add.sprite(this.world.centerX+155,this.world.centerY+465, 'button_right');
            this.button_right.anchor.setTo(0.5, 0.5);
            this.button_right.alpha = 0;
            this.button_right.scale.x=1.9;
            this.button_right.scale.y=2;
            this.button_right.inputEnabled = true;
            this.button_right.events.onInputDown.add(this.gotoMainMenu, this);
            
        var d1, d2, d3; //the number will be d1d2d3 and not d3d2d1
        var str = this.totalScore.toString();
        this.i =0;
        this.j=0;
        this.k=0;

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
        
        this.temp_sprite = this.add.sprite(this.world.centerX+35,410 ,this.spritename_green(this.onesplace));
        this.temp_sprite.anchor.setTo(0.5, 0.5);
        this.temp_sprite.scale.x = 0.8;
        this.temp_sprite.scale.y = 0.8;

                    this.add.tween(this.temp_sprite.scale)
                                    .to({x: 0.8, y: 0.8 }, 500, Phaser.Easing.Linear.None, true)
                                    .to({ x: 0.85, y: 0.85 }, 500, Phaser.Easing.Linear.None)
                                    .loop();
       
        this.temp_sprite = this.add.sprite(this.world.centerX-85,410 ,this.spritename_green(this.tensplace));
        this.temp_sprite.anchor.setTo(0.5, 0.5);
        this.temp_sprite.scale.x = 0.8;
        this.temp_sprite.scale.y = 0.8;

                    this.add.tween(this.temp_sprite.scale)
                                    .to({x: 0.8, y: 0.8 }, 500, Phaser.Easing.Linear.None, true)
                                    .to({ x: 0.85, y: 0.85 }, 500, Phaser.Easing.Linear.None)
                                    .loop();

        if(this.hundredsplace!=0)
        {
            this.temp_sprite = this.add.sprite(this.world.centerX-205,410 ,this.spritename_green(this.hundredsplace));
            this.temp_sprite.anchor.setTo(0.5, 0.5);
            this.temp_sprite.scale.x = 0.8;
            this.temp_sprite.scale.y = 0.8;

                    this.add.tween(this.temp_sprite.scale)
                                    .to({x: 0.8, y: 0.8 }, 500, Phaser.Easing.Linear.None, true)
                                    .to({ x: 0.85, y: 0.85 }, 500, Phaser.Easing.Linear.None)
                                    .loop();
        }

        this.temp_sprite = this.add.sprite(this.world.centerX+165,410 ,'exclaimation');
        this.temp_sprite.anchor.setTo(0.5, 0.5);
        this.temp_sprite.alpha = 1;
        this.temp_sprite.scale.x = 0.8;
        this.temp_sprite.scale.y = 0.8;

                    this.add.tween(this.temp_sprite.scale)
                                    .to({x: 0.8, y: 0.8 }, 500, Phaser.Easing.Linear.None, true)
                                    .to({ x: 0.85, y: 0.85 }, 500, Phaser.Easing.Linear.None)
                                    .loop();

        var b= 0;
        b=Math.floor(localStorage.getItem('HighScore1'));
        console.log(b);                          
         if(this.totalScore == b)
         {
            
            this.add.tween(this.score_image.scale).to({y:0}, 500, Phaser.Easing.Linear.None, false).start()
            .onComplete.add(function()
                            {
                                this.newbest_audio = this.add.audio('newbest_audio');
                                this.newbest_audio.play('', 0, 1, false);
                                
                                this.high1= this.add.sprite(this.world.centerX-10, -150, 'new_high1');
                                this.high1.anchor.setTo(0.5, 0.5);  
                                this.high1.scale.setTo(0.5,0.5);  
                                this.add.tween(this.high1).to({x: this.world.centerX-10, y: 65}, 700, Phaser.Easing.Bounce.Out, false).start();
                               
                                this.high2=this.add.sprite(this.world.centerX-10, -150, 'new_high2');
                                this.high2.anchor.setTo(0.5,0.5);
                                this.high2.scale.setTo(0.8,0.8);
                                this.add.tween(this.high2).to({x: this.world.centerX-10, y: 185}, 800, Phaser.Easing.Bounce.Out, false).start();
                               

                            }, this); 
          }                  

        this.render_rating(); 
    },

render_rating: function()
{
        this.temp_sprite = this.add.sprite(this.world.centerX,835 ,'smiley_joint');
        this.temp_sprite.anchor.setTo(0.5, 0.5);
        this.temp_sprite.scale.x = 1;
        this.temp_sprite.scale.y = 1;

        this.temp_sprite = this.add.sprite(this.world.centerX+205,725,'joint');
        this.temp_sprite.anchor.setTo(0.5, 0.5);
        this.temp_sprite.scale.x = 0.7;
        this.temp_sprite.scale.y = 0.7;
        this.temp_sprite.angle = 10;
        this.temp_sprite.alpha = 0.3;

        this.temp_sprite = this.add.sprite(this.world.centerX+120,635,'joint');
        this.temp_sprite.anchor.setTo(0.5, 0.5);
        this.temp_sprite.scale.x = 0.7;
        this.temp_sprite.scale.y = 0.7;
        this.temp_sprite.angle -= 23;
        this.temp_sprite.alpha = 0.3;

        this.temp_sprite = this.add.sprite(this.world.centerX-10,605,'joint');
        this.temp_sprite.anchor.setTo(0.5, 0.5);
        this.temp_sprite.scale.x = 0.7;
        this.temp_sprite.scale.y = 0.7;
        this.temp_sprite.angle -= 53;
        this.temp_sprite.alpha = 0.3;

        this.temp_sprite = this.add.sprite(this.world.centerX-140,645,'joint');
        this.temp_sprite.anchor.setTo(0.5, 0.5);
        this.temp_sprite.scale.x = 0.7;
        this.temp_sprite.scale.y = 0.7;
        this.temp_sprite.angle -= 83;
        this.temp_sprite.alpha = 0.3;

        this.temp_sprite = this.add.sprite(this.world.centerX-220,730,'joint');
        this.temp_sprite.anchor.setTo(0.5, 0.5);
        this.temp_sprite.scale.x = 0.7;
        this.temp_sprite.scale.y = 0.7;
        this.temp_sprite.angle -= 118;
        this.temp_sprite.alpha = 0.3;

        this.rating_calculator();

},   

rating_calculator: function()
{
    //var ratio=3.5;
    var totalGarbage_temp;
    if(weed.totalGarbage == 0){
    totalGarbage_temp = 1;
    }
    else{
        totalGarbage_temp = weed.totalGarbage;
    }
   
    
    if(weed.totalCannabis >= 180 )
    {
        this.time.events.repeat(230, 1,this.rating_selector, this, 1);    
        this.time.events.repeat(460, 1,this.rating_selector, this, 2); 
        this.time.events.repeat(690, 1,this.rating_selector, this, 3);
        this.time.events.repeat(920, 1,this.rating_selector, this, 4);
        this.time.events.repeat(1150, 1,this.rating_selector, this, 5);
        this.time.events.repeat(1380, 1,this.render_buttons, this);
           
       
    }
    if(weed.totalCannabis >= 120 && weed.totalCannabis < 180)
    {
        this.time.events.repeat(230, 1,this.rating_selector, this, 1);    
        this.time.events.repeat(460, 1,this.rating_selector, this, 2); 
        this.time.events.repeat(690, 1,this.rating_selector, this, 3);
        this.time.events.repeat(920, 1,this.rating_selector, this, 4);
        this.time.events.repeat(1380, 1,this.render_buttons, this);
    }
    if(weed.totalCannabis >= 60 && weed.totalCannabis < 120)
    {
        this.time.events.repeat(230, 1,this.rating_selector, this, 1);    
        this.time.events.repeat(460, 1,this.rating_selector, this, 2); 
        this.time.events.repeat(690, 1,this.rating_selector, this, 3);
        this.time.events.repeat(920, 1,this.render_buttons, this);
    }
    if(weed.totalCannabis >20 && weed.totalCannabis < 60)
    {
        this.time.events.repeat(230, 1,this.rating_selector, this, 1);    
        this.time.events.repeat(460, 1,this.rating_selector, this, 2); 
        this.time.events.repeat(690, 1,this.render_buttons, this);    
    }
    if(weed.totalCannabis <= 20 && weed.totalCannabis > 0)
    {
        this.time.events.repeat(230, 1,this.rating_selector, this, 1);    
        this.time.events.repeat(460, 1,this.render_buttons, this);
    }
    if(weed.totalCannabis <= 0)
    {
        this.time.events.repeat(430, 1,this.render_buttons, this);
    }

},

rating_selector: function(num)
{
     switch (num)
        {
                case 1:
                    this.temp_sprite = this.add.sprite(this.world.centerX-220,730,'joint');
                    this.temp_sprite.anchor.setTo(0.5, 0.5);
                    this.temp_sprite.scale.x = 0.7;
                    this.temp_sprite.scale.y = 0.7;
                    this.temp_sprite.angle -= 118;
                    this.temp_sprite.alpha = 0.3;
                    this.add.tween(this.temp_sprite).to({alpha: 1}, 150, Phaser.Easing.Linear.None, false).start();
                    break;
                case 2:
                    this.temp_sprite = this.add.sprite(this.world.centerX-140,645,'joint');
                    this.temp_sprite.anchor.setTo(0.5, 0.5);
                    this.temp_sprite.scale.x = 0.7;
                    this.temp_sprite.scale.y = 0.7;
                    this.temp_sprite.angle -= 83;
                    this.temp_sprite.alpha = 0.3;
                    this.add.tween(this.temp_sprite).to({alpha: 1}, 150, Phaser.Easing.Linear.None, false).start();
                    break;  
                case 3:
                    this.temp_sprite = this.add.sprite(this.world.centerX-10,605,'joint');
                    this.temp_sprite.anchor.setTo(0.5, 0.5);
                    this.temp_sprite.scale.x = 0.7;
                    this.temp_sprite.scale.y = 0.7;
                    this.temp_sprite.angle -= 53;
                    this.temp_sprite.alpha = 0.3;
                    this.add.tween(this.temp_sprite).to({alpha: 1}, 150, Phaser.Easing.Linear.None, false).start();
                    break;
                case 4:
                    this.temp_sprite = this.add.sprite(this.world.centerX+120,635,'joint');
                    this.temp_sprite.anchor.setTo(0.5, 0.5);
                    this.temp_sprite.scale.x = 0.7;
                    this.temp_sprite.scale.y = 0.7;
                    this.temp_sprite.angle -= 23;
                    this.temp_sprite.alpha = 0.3;
                    this.add.tween(this.temp_sprite).to({alpha: 1}, 150, Phaser.Easing.Linear.None, false).start();
                    break;
                case 5:
                    this.temp_sprite = this.add.sprite(this.world.centerX+205,725,'joint');
                    this.temp_sprite.anchor.setTo(0.5, 0.5);
                    this.temp_sprite.scale.x = 0.7;
                    this.temp_sprite.scale.y = 0.7;
                    this.temp_sprite.angle = 10;
                    this.temp_sprite.alpha = 0.3;
                    this.add.tween(this.temp_sprite).to({alpha: 1}, 150, Phaser.Easing.Linear.None, false).start();
                    break;    
                             

        }              //end of switch      

},

render_buttons: function()
{
    this.button_left_text = this.add.sprite(this.world.centerX-155,this.world.centerY+465, 'highscore_text_left');
    this.button_left_text.anchor.setTo(0.5, 0.5);
    this.button_left_text.alpha = 0;
    this.button_left_text.scale.x=0.6;
    this.button_left_text.scale.y=0.6;
    this.add.tween(this.button_left_text).delay(200).to({alpha: 0.8}, 250, Phaser.Easing.Linear.None, false).start();
    

    this.button_right_text = this.add.sprite(this.world.centerX+155,this.world.centerY+465, 'highscore_text_right');
    this.button_right_text.anchor.setTo(0.5, 0.5);
    this.button_right_text.alpha = 0;
    this.button_right_text.scale.x=0.6;
    this.button_right_text.scale.y=0.6;
    this.add.tween(this.button_right_text).delay(200).to({alpha: 0.8}, 250, Phaser.Easing.Linear.None, false).start()
    .onComplete.add(this.smoke, this);
    
   

},
    
smoke: function()
    {
         this.smoke_audio =this.add.audio('smoke');
         this.smoke_audio.play('',0,1,false);

        var volume = 0;
        var i = 0;
        volume = 0.5;
            this.scoreScreen_audio = this.add.audio('main_menu_audio_2');
            this.scoreScreen_audio.play('', 0, 0, true);
            this.time.events.repeat(200, 1000000, function(){
                
                if(i != volume ){
                    this.scoreScreen_audio.volume = i;
                    i = i+0.01;

                }
                if(i >= volume ){
                    this.scoreScreen_audio.volume = i;
                    i = volume;

                }
            }, this);
    },
//----------------------------------------------end of render backdrop screen----------------------------------------------------------
//---------------------------------------------------------------UPDATE-------------------------------------------------------------------------
    update: function()
    {
    },
    
    gotoMainMenu: function(){
        
        weed.totalCannabis = 0;
        weed.totalGarbage = 0;
        weed.bad_in_garbage= 0;
        weed.good_in_garbage = 0;

        this.add.tween(this.button_right_text.scale).to({ x :0.7, y :0.7 }, 200, Phaser.Easing.Linear.None, true)
        .onComplete.add(function()
                {   
                    this.postGameShutDown();
                    this.scoreScreen_audio.stop();
                    this.state.start('MainMenu');
                }   , this); 

    }, 
    gotoPlayGame: function()
    {
        weed.totalCannabis = 0;
        weed.totalGarbage = 0;
        weed.bad_in_garbage= 0;
        weed.good_in_garbage = 0;
        this.add.tween(this.button_left_text.scale).to({ x :0.7, y :0.7 }, 200, Phaser.Easing.Linear.None, true)
        .onComplete.add(function()
                {
                    this.postGameShutDown();
                    this.scoreScreen_audio.stop();
                    this.state.start('PlayGame');
                }   , this);    
    },





    postGameShutDown: function(){
        
        if(this.score_image != null){
            this.score_image.destroy();
        }
        if(this.bucket_left != null){
            this.bucket_left.destroy();
        }
        if(this.plus != null){
            this.plus.destroy();
        }
        if(this.bucket_right != null){
            this.bucket_right.destroy();
        }
        if(this.text1 != null){
            this.text1.destroy();
        }
        if(this.temp_sprite != null){
            this.temp_sprite.destroy();
        }
        if(this.text2 != null){
            this.text2.destroy();
        }
        if(this.text3 != null){
            this.text3.destroy();
        }
        if(this.backdrop != null){
            this.backdrop.destroy();
        }
        if(this.button_left != null){
            this.button_left.destroy();
        }
        if(this.button_right != null){
            this.button_right.destroy();
        }
        if(this.button_left_text != null){
            this.button_left_text.destroy();
        }
        if(this.button_right_text != null){
            this.button_right_text.destroy();
        }
        if(this.BG != null){
            this.BG.destroy();
        }
        if(this.preBG != null){
            this.preBG.destroy();
        }

        this.BG = null;
        this.preBG = null;
        this.score_image = null;
        this.bucket_left = null;
        this.plus = null;
        this.bucket_right = null;
        this.text1 = null;
        this.temp_sprite = null;
        this.text2 = null;
        this.text3 = null;
        this.backdrop = null;
        this.button_left = null;
        this.button_right = null;
        this.button_left_text = null;
        this.button_right_text = null;
    }

};