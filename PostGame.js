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
            
       
                
        this.BG= this.add.sprite(0 ,0 ,'prebackground');
        this.BG.alpha = 1;
        t4 = this.add.tween(this.BG).delay(0).to({alpha: 0}, 800, Phaser.Easing.Linear.None, false).start();
       
        this.preBG= this.add.sprite(0 ,0 ,'background');
        this.preBG.alpha = 0;
        this.add.tween(this.preBG).delay(0).to({alpha: 1}, 800, Phaser.Easing.Linear.None, true)
        .onComplete.add(function()
        {
            this.score_image= this.add.sprite(this.world.centerX-10,-150 ,'score_sprite');  //-----------------score text
            this.score_image.anchor.setTo(0.5, 0.5);
            this.add.tween(this.score_image).to({x: this.world.centerX-10, y: 150}, 800, Phaser.Easing.Bounce.Out, true) 
            .onComplete.add(this.buckets_zoom_left, this);  
        }, this);
        
       
        
        
        //this.gotoMainMenu();
    
    },
    
    
    
    buckets_zoom_left: function()
    {
         this.bucket_left = this.add.sprite(this.world.centerX-120, 420, 'bucket_left');
         this.bucket_left.anchor.setTo(0.5,0.5);
         this.bucket_left.scale.x = 0.4;
         this.bucket_left.scale.y = 0.4;
         this.add.tween(this.bucket_left.scale).to({ x :0.4, y :0.4 }, 300, Phaser.Easing.Linear.None,true)
                .to({ x :0.5, y :0.5 }, 300, Phaser.Easing.Linear.None)
                .to({ x :0.4, y :0.4 }, 300, Phaser.Easing.Linear.None)
                .onComplete.add(function()
                    {
                        this.time.events.repeat(800, 1, this.bucket_zoom_right, this);
                    }, this);
    },

    bucket_zoom_right: function()            
    {
    
        this.plus =this.add.sprite(this.world.centerX, 420, 'plus');
        this.plus.anchor.setTo(0.5,0.5);
        this.plus.scale.x = 0.15;
        this.plus.scale.y = 0.15;
        this.add.tween(this.plus.scale).to({ x :0.17, y :0.17 }, 200, Phaser.Easing.Linear.None, true)
                        .to({ x :0.15, y :0.15 }, 200, Phaser.Easing.Linear.None, true);

        this.bucket_right = this.add.sprite(this.world.centerX+120, 420, 'bucket_right');
        this.bucket_right.anchor.setTo(0.5,0.5);
        this.bucket_right.scale.x = 0.4;
        this.bucket_right.scale.y = 0.4;
        this.add.tween(this.bucket_right.scale).to({ x :0.4, y :0.4 }, 300, Phaser.Easing.Linear.None, true)
        .onComplete.add(function()
                            {
                                this.add.tween(this.bucket_right.scale).to({ x :0.5, y :0.5 }, 300, Phaser.Easing.Linear.None, true)
                                .onComplete.add(function()
                                    {
                                        this.add.tween(this.bucket_right.scale).to({ x :0.4, y :0.4 }, 300, Phaser.Easing.Linear.None, true)
                                        .onComplete.add(this.calculateScores, this);
                                    }    , this);

                            }, this);
   
    },
    

    
    calculateScores: function()
    {
        /*weed.totalCannabis= 99;             //---------------------total cannabis collected in good pot
        weed.totalGarbage = 56;             //---------------------total garbage in good pot (penalty)
        weed.bad_in_garbage = 89;           //---------------------total garbage in bad pot (bonus)*/
        this.totalScore = weed.totalCannabis-weed.totalGarbage+weed.bad_in_garbage;
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
        this.separate_score_Digits_totalGarbage();
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
                    console.log(this.a);
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
                    console.log(this.b);
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
                    console.log(this.b);
                }
    },
        
    tensplace_complete_garbageInGood: function()
    {
         if(this.hundredsplace!=0)
         this.time.events.repeat(100, this.hundredsplace, this.display_numbers_hundredsplace_garbageInGood, this);

        else
           this.separate_score_Digits_garbageInBad();

         
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
                    console.log(this.c);
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
                    
                    this.c= 0;
                    console.log(this.c);
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
       
        if(this.tensplace!=0)
        this.time.events.repeat(100, this.tensplace, this.display_numbers_tensplace_garbageInBad, this);

        else
            this.render_totalscore();        

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
                    console.log(this.m);
                }
        
                if(this.m== this.tensplace)
                {
                    this.temp_sprite= this.add.sprite(this.world.centerX+110,1000 ,this.spritename_green(this.m));
                    this.temp_sprite.anchor.setTo(0.5, 0.5);
                    this.temp_sprite.scale.x = 0.4;
                    this.temp_sprite.scale.y = 0.4;
                    this.temp_sprite.alpha = 1;
                    this.add.tween(this.temp_sprite).delay(0).to({alpha: 1}, 750, Phaser.Easing.Linear.None, true)
                    .onComplete.add(this.tensplace_complete_garbageInBad, this);
                   
                    this.m= 0;
                    
                }
    },


    tensplace_complete_garbageInBad: function()
    {
        
        if(this.hundredsplace!=0)
        this.time.events.repeat(100, this.tensplace, this.display_numbers_hundredsplace_garbageInBad, this);

        else
            this.render_totalscore();
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

                    this.n= 0;
                    
                }
    },
//--------------------------------------------------------end of total garbage in bad---------------------------------------------------- 

//------------------------------------------------to render backdrop screen---------------------------------------------------------------
render_totalscore: function()
    {
    
    this.time.events.repeat(150, 1, function()
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
    var ratio = weed.totalCannabis/totalGarbage_temp;
    
    if(weed.totalCannabis > 40 )
    {
        this.time.events.repeat(220, 1,this.rating_selector, this, 1);    
        this.time.events.repeat(440, 1,this.rating_selector, this, 2); 
        this.time.events.repeat(660, 1,this.rating_selector, this, 3);
        this.time.events.repeat(880, 1,this.rating_selector, this, 4);
        this.time.events.repeat(1100, 1,this.rating_selector, this, 5);
        this.time.events.repeat(1300, 1,this.render_buttons, this);
           
       
    }
    if(weed.totalCannabis > 30 && weed.totalCannabis <= 40)
    {
        this.time.events.repeat(220, 1,this.rating_selector, this, 1);    
        this.time.events.repeat(440, 1,this.rating_selector, this, 2); 
        this.time.events.repeat(660, 1,this.rating_selector, this, 3);
        this.time.events.repeat(880, 1,this.rating_selector, this, 4);
        this.time.events.repeat(1080, 1,this.render_buttons, this);
    }
    if(weed.totalCannabis > 20 && weed.totalCannabis <= 30)
    {
        this.time.events.repeat(220, 1,this.rating_selector, this, 1);    
        this.time.events.repeat(440, 1,this.rating_selector, this, 2); 
        this.time.events.repeat(660, 1,this.rating_selector, this, 3);
        this.time.events.repeat(860, 1,this.render_buttons, this);
    }
    if(weed.totalCannabis > 10 && weed.totalCannabis <= 20)
    {
        this.time.events.repeat(220, 1,this.rating_selector, this, 1);    
        this.time.events.repeat(440, 1,this.rating_selector, this, 2); 
        this.time.events.repeat(640, 1,this.render_buttons, this);    
    }
    if(weed.totalCannabis <= 10 && weed.totalCannabis > 0)
    {
        this.time.events.repeat(220, 1,this.rating_selector, this, 1);    
        this.time.events.repeat(420, 1,this.render_buttons, this);
    }
    if(weed.totalCannabis <= 0)
    {
        this.time.events.repeat(420, 1,this.render_buttons, this);
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
    this.add.tween(this.button_left_text).to({alpha: 0.8}, 250, Phaser.Easing.Linear.None, false).start();

    this.button_right_text = this.add.sprite(this.world.centerX+155,this.world.centerY+465, 'highscore_text_right');
    this.button_right_text.anchor.setTo(0.5, 0.5);
    this.button_right_text.alpha = 0;
    this.button_right_text.scale.x=0.6;
    this.button_right_text.scale.y=0.6;
    this.add.tween(this.button_right_text).to({alpha: 0.8}, 250, Phaser.Easing.Linear.None, false).start();

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
                    this.state.start('PlayGame');
                }   , this);    
    }    
}