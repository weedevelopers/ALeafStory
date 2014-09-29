weed.PlayGame = function(game)
{
    this.BG = null;
    this.preBG = null;
    this.empty_bin1 = null;
    this.empty_bin2 = null;
    this.plusOneText = null;
    this.minusTwoText = null;
    this.readyScreen = null;
    this.readyText = null;
    this.readyNumber = null;
    this.unitsPlace = null;
    this.tensPlace = null;
    this.hundredsPlace = null;
    
    this.smilingFaceLeft = null;
    this.smilingFaceRight = null;
    this.sadFaceLeft = null;
    this.sadFaceRight = null;
    this.happyFace = null;

    
    this.overmessage;       // game over text
    this.secondsElapsed = 15;   // counter for incrementing seconds
    this.timer;             // phaser timer to keep track of seconds elapsed
    this.t = null;
    this.t_counter = 0;
    this.counter_1_for_updateTimerDependentCalls = 0;
    this.renderPowerUpsTimer = 100;
    

    this.temp_pause_input_variable = 0;
    this.doubleScoreSeconds = -1;
    this.stopTimerSignal = false;
    this.stopTimerCounter = -1;
    this.powerSelector = 0;
    this.doubleScoreLeaf = null;
    this.stopTimerLeaf = null;
    this.doubleScoreActivated = false;
    this.minusFourActivated = false;
    this.stopTimerActivated = false;
    this.doubleBonusSignal = false;
    this.speedOfPowerUpSprites = 350;
    this.callRenderGameOverScreenOnce = 0;
};


weed.PlayGame.prototype = {
    

    preload: function()
    {
        this.BG= this.add.sprite(0 ,0 ,'background');
        this.BG.alpha = 1;
        t4 = this.add.tween(this.BG).delay(0).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, false, 0).start();
       
        this.preBG= this.add.sprite(0 ,0 ,'prebackground');
        this.preBG.alpha = 0;
        t5 = this.add.tween(this.preBG).delay(0).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, false, 0).start();
        
    },

//-------------------------------------------------------------END----------------------------------------------------------------//






    
//---------------------------------------------------------------create()--------------------------------------------------------------//   
    create: function()
    {
        //this.secondsElapsed= 60;
        this.input.disabled = true;
        //Creates a new stand-alone Phaser.Timer object
        this.timer = this.time.create(false);               
        this.timer.loop(1000, this.updateSeconds, this);
        
        this.renderStaticObjects();
        
        this.renderDragableObjects();
        
        this.renderminusFourPowerOnStartup();
        
        this.physics.startSystem(Phaser.Physics.ARCADE); 
        
        this.renderReadyScreen();  


        this.cannabisLeaves.enableBody = true;
        //this.cannabisLeaves.setAll('inputEnabled', 'true');
        this.cannabisLeaves.callAll('events.onInputDown.add', 'events.onInputDown', this.inputDownOnCannabis);
        this.cannabisLeaves.callAll('events.onInputUp.add', 'events.onInputUp', this.inputUpOnCannabis);

        /*this.cannabisLeaves.events.onInputDown.add(function(){
                
            }, this);
        this.cannabisLeaves.events.onInputUp.add(function(){
            this.add.tween(this.cannabisLeaves.scale).to({x: 0.3, y:  0.3}, 100, Phaser.Easing.Linear.None, true); 
        }, this);*/
        this.garbageLeaves.enableBody = true;
        this.garbageLeaves.callAll('events.onInputDown.add', 'events.onInputDown', this.inputDownOnGarbage);
        this.garbageLeaves.callAll('events.onInputUp.add', 'events.onInputUp', this.inputUpOnGarbage);
        this.minusFourLeaves.enableBody = true;
        this.minusFourLeaves.callAll('events.onInputDown.add', 'events.onInputDown', this.inputDownOnMinusFour);
        this.minusFourLeaves.callAll('events.onInputUp.add', 'events.onInputUp', this.inputUpOnMinusFour);
        this.empty_bin1.enableBody = true;
        this.empty_bin2.enableBody = true;
       
        
        
    },

//-------------------------------------------------------------END----------------------------------------------------------------//


//------------------------------------------------------CLICK DETECTION---------------------------------------------------------------//


    inputDownOnCannabis: function(item){
        //this.add.tween(item.scale).to({x: 0.35, y:  0.35}, 100, Phaser.Easing.Linear.None, true);
        var x,y;
        x = item.scale.x;
        y = item.scale.y;
        if(x == 0.25 && y == 0.25){
            item.scale.x = 0.28;
            item.scale.y = 0.28;
        }
        else{
            item.scale.x = 0.08;
            item.scale.y = 0.08;
        }
    },
    
    inputUpOnCannabis: function(item){
        var x,y;
        x = item.scale.x;
        y = item.scale.y;
        if(x == 0.28 && y == 0.28){
            item.scale.x = 0.25;
            item.scale.y = 0.25;
        }
        else{
            item.scale.x = 0.07;
            item.scale.y = 0.07;
        }
    },

    inputDownOnGarbage: function(item){
        var x,y;
        x = item.scale.x;
        y = item.scale.y;
        if(x == 0.3 && y == 0.3){
            item.scale.x = 0.34;
            item.scale.y = 0.34;
        }
        if(x == 0.32 && y == 0.32){
            item.scale.x = 0.36;
            item.scale.y = 0.36;
        }
        
        if(x == 0.185 && y == 0.185){
            item.scale.x = 0.2;
            item.scale.y = 0.2;
        }
        
    },

    inputUpOnGarbage: function(item){
        var x,y;
        x = item.scale.x;
        y = item.scale.y;
        if(x == 0.34 && y == 0.34){
            item.scale.x = 0.3;
            item.scale.y = 0.3;
        }
        if(x == 0.36 && y == 0.36){
            item.scale.x = 0.32;
            item.scale.y = 0.32;
        }
        if(x == 0.2 && y == 0.2){
            item.scale.x = 0.185;
            item.scale.y = 0.185;
        }
    },
    

    inputDownOnMinusFour: function(item){
        item.scale.x = 0.17;
        item.scale.y = 0.17;
    },

    inputUpOnMinusFour:function(item){
        item.scale.x = 0.15;
        item.scale.y = 0.15;
    },

//-------------------------------------------------------------END----------------------------------------------------------------//


//---------------------------------------------------------UPDATE SECONDS------------------------------------------------------------------//
    updateSeconds: function()
    {
      
       this.separateDigits(this.secondsElapsed);
       this.secondsElapsed--; 
       this.doubleScoreSeconds--;
       //console.log(doubleScoreSeconds);
       this.stopTimerCounter--;
       this.renderPowerUpsTimer--;
       
       
       this.updateTimerDependentCalls();

      
                  
    },
    
    
    updateTimerDependentCalls: function(){
      
        if(this.stopTimerSignal == true && this.stopTimerCounter <= 4 && this.stopTimerCounter >= 0){
            this.secondsElapsed ++;
            this.unitsPlaceTween.pause();
            this.tensPlaceTween.pause();
            this.add.tween(this.powerStopTimerAnimation).delay(800).to({alpha: 1}, 600, Phaser.Easing.Linear.None, true)
                                                            .to({alpha: 0.95}, 600, Phaser.Easing.Linear.None, true)
                                                                .loop();

        }
        if(this.stopTimerSignal == true && this.stopTimerCounter < 0 ){
            this.stopTimerSignal = false;
            this.stopTimerActivated = false;
            this.powerStopTimerAnimation.destroy();
            if(this.doubleBonusSignal == false){
                var volume = 0.2;
                var i = 0;
                this.time.events.repeat(50, 40, function(){
                    
                    //console.log('this is running');
                    if(i < volume && this.playGameAudio != null){
                        this.playGameAudio.volume = i;
                        i = i+0.01;
                        

                    }
                    if(i >= volume && this.playGameAudio != null){
                        this.playGameAudio.volume = i;
                        i = volume;
                        //console.log('current volume = ' +  this.playGameAudio.volume);
                        
                    }
                }, this);
            }

            this.unitsPlaceTween.resume();
            this.tensPlaceTween.resume();

        }

        if(this.doubleScoreSeconds <= 5 && this.doubleScoreSeconds >= 0 && this.doubleBonusSignal == true){
            
            this.add.tween(this.powerDoubleBonusAnimation).delay(800).to({alpha: 1}, 600, Phaser.Easing.Linear.None, true)
                                                            .to({alpha: 0.95}, 600, Phaser.Easing.Linear.None, true)
                                                                .loop();
        }
        else if(this.doubleScoreSeconds < 0 && this.doubleBonusSignal == true){
            this.powerDoubleBonusAnimation.destroy();
            this.doubleBonusSignal = false;
        } 
            



        if(weed.totalCannabis >= 7 && weed.totalCannabis <= 9){
          this.renderHalfCannabis();
        }
        /*if((weed.totalCannabis+weed.good_in_garbage) >= 20 && this.counter_1_for_updateTimerDependentCalls == 0 ){
            this.renderDragableCannabisRealTime();
            this.renderDragableGarbageRealTime();
            this.counter_1_for_updateTimerDependentCalls ++;
          
        }*/
        /*if((weed.totalCannabis+weed.good_in_garbage) % 6 == 0 && this.counter_1_for_updateTimerDependentCalls != 0){
            this.renderDragableCannabisRealTime();
            this.renderDragableGarbageRealTime();
            weed.totalCannabis ++;
            this.counter_1_for_updateTimerDependentCalls ++;
        }*/
        if(this.cannabisLeaves != null && this.cannabisLeaves.length < this.rnd.integerInRange(1, 3)){
            this.renderDragableCannabisRealTime();
            this.renderDragableGarbageRealTime();
            this.cannabisLeaves.callAll('events.onInputDown.add', 'events.onInputDown', this.inputDownOnCannabis);
            this.cannabisLeaves.callAll('events.onInputUp.add', 'events.onInputUp', this.inputUpOnCannabis);
            this.garbageLeaves.callAll('events.onInputDown.add', 'events.onInputDown', this.inputDownOnGarbage);
            this.garbageLeaves.callAll('events.onInputUp.add', 'events.onInputUp', this.inputUpOnGarbage);

        }
        
        
        if(weed.totalCannabis >= 15 && weed.totalCannabis <= 17){
            this.renderFullCannabis();
        }
        if(weed.bad_in_garbage >= 7 && weed.bad_in_garbage <= 9){
            
            this.renderHalfGarbage();
        }
        if(weed.bad_in_garbage >= 15 && weed.bad_in_garbage <= 17){
            this.renderFullGarbage();
        }
        var temp_random_for_power = this.rnd.integerInRange(3, 4);
        
        if(this.renderPowerUpsTimer % temp_random_for_power == 0 && this.secondsElapsed > 0){
            this.selectPower();
        }
        
    },

//-----------------------------------------------------------------END----------------------------------------------------------------//






//------------------------------------------------------------DRAGABLE OBJECTS-----------------------------------------------------------------//
    renderDragableObjects: function()
    
    {
        var cannabisleaf1, cannabisleaf2;
        this.cannabisLeaves = this.add.group();
        var g,c;
        g = this.rnd.integerInRange(1, 2);
        s = this.rnd.integerInRange(2, 3);
        c = this.rnd.integerInRange(12, 15);
        
            for(var i=0; i<c; i++)
        {
            cannabisleaf1 = this.add.sprite(this.rnd.integerInRange(50, this.world.width-50), this.rnd.integerInRange(300, this.world.height-500), 'game_leaf_cannabis1');
            cannabisleaf1.anchor.setTo(0.5, 0.5);
            cannabisleaf1.scale.x = 0.25;
            cannabisleaf1.scale.y = 0.25;
            this.cannabisLeaves.add(cannabisleaf1, true);
            this.physics.arcade.enable(cannabisleaf1);
            cannabisleaf1.body.collideWorldBounds = true;
            
            cannabisleaf1.inputEnabled = true;
            cannabisleaf1.input.enableDrag();
            
           
        }

            
         for(var i=0; i<c; i++)
        {
           cannabisleaf2 = this.add.sprite(this.rnd.integerInRange(50, this.world.width-50),this.rnd.integerInRange(300, this.world.height-500), 'game_leaf_cannabis2');
            cannabisleaf2.anchor.setTo(0.5, 0.5);
            cannabisleaf2.scale.x = 0.07;
            cannabisleaf2.scale.y = 0.07;
            this.cannabisLeaves.add(cannabisleaf2, true);
            this.physics.arcade.enable(cannabisleaf2);
            cannabisleaf2.body.collideWorldBounds = true;
            
            cannabisleaf2.inputEnabled = true;
            cannabisleaf2.input.enableDrag();
            
        }
     
    //----------------------------------------------------------garbage objects----------------------------------------------------------------    
        this.garbageLeaves = this.add.group();
        
        var leaf1;
        var leaf2, leaf3, leaf4, leaf5, leaf6, leaf7, leaf8;
        var seed1, seed2, seed3;
        
        
        for(var i=0; i<g; i++){
           leaf1 = this.add.sprite(this.rnd.integerInRange(50, this.world.width-50), this.rnd.integerInRange(300, this.world.height-500), 'game_leaf1');
            leaf1.anchor.setTo(0.5, 0.5);
            leaf1.scale.x=0.3;
            leaf1.scale.y = 0.3;
            this.garbageLeaves.add(leaf1, true);
            this.physics.arcade.enable(leaf1);
            leaf1.body.collideWorldBounds = true;
            
            leaf1.inputEnabled = true;
            leaf1.input.enableDrag();
            
            
            
        }
        
       
        
        
        for(var i=0; i<g; i++){
           leaf2 = this.add.sprite(this.rnd.integerInRange(50, this.world.width-50), this.rnd.integerInRange(300, this.world.height-500), 'game_leaf2');
            leaf2.anchor.setTo(0.5, 0.5);
            leaf2.scale.x=0.32;
            leaf2.scale.y = 0.32;
            this.garbageLeaves.add(leaf2, true);
            this.physics.arcade.enable(leaf2);
            leaf2.body.collideWorldBounds = true;

            
            leaf2.inputEnabled = true;
            leaf2.input.enableDrag();
           
        }
        
        
        
        for(var i=0; i<g; i++){
            leaf3 = this.add.sprite(this.rnd.integerInRange(50, this.world.width-50), this.rnd.integerInRange(300, this.world.height-500), 'game_leaf3');
            leaf3.anchor.setTo(0.5, 0.5);
            leaf3.scale.x=0.3;
            leaf3.scale.y = 0.3;
            this.garbageLeaves.add(leaf3, true);
            this.physics.arcade.enable(leaf3);
            leaf3.body.collideWorldBounds = true;

            
            leaf3.inputEnabled = true;
            leaf3.input.enableDrag();
            
        }
        
        
        
        for(var i=0; i<g; i++){
            leaf4 = this.add.sprite(this.rnd.integerInRange(50, this.world.width-50), this.rnd.integerInRange(300, this.world.height-500), 'game_leaf4');
            leaf4.anchor.setTo(0.5, 0.5);
            leaf4.scale.x=0.32;
            leaf4.scale.y = 0.32;
            this.garbageLeaves.add(leaf4, true);
            this.physics.arcade.enable(leaf4);
            leaf4.body.collideWorldBounds = true;

            
            leaf4.inputEnabled = true;
            leaf4.input.enableDrag();
           
        }
        
        
        
        /*for(var i=0; i<g; i++){
            leaf5 = this.add.sprite(this.rnd.integerInRange(150, this.world.width-150), this.rnd.integerInRange(300, this.world.height-500), 'game_leaf5');
            leaf5.anchor.setTo(0.5, 0.5);
            leaf5.scale.x=0.1;
            leaf5.scale.y = 0.1;
            this.garbageLeaves.add(leaf5, true);
            this.physics.arcade.enable(leaf5);
            leaf5.body.collideWorldBounds = true;

            leaf5.inputEnabled = true;
            leaf5.input.enableDrag();
          
        }
        
        
        for(var i=0; i<g; i++){
            leaf6 = this.add.sprite(this.rnd.integerInRange(150, this.world.width-150), this.rnd.integerInRange(300, this.world.height-500), 'game_leaf6');
            leaf6.anchor.setTo(0.5, 0.5);
            leaf6.scale.x=0.1;
            leaf6.scale.y = 0.1;
            this.garbageLeaves.add(leaf6, true);
            this.physics.arcade.enable(leaf6);
            leaf6.body.collideWorldBounds = true;

            leaf6.inputEnabled = true;
            leaf6.input.enableDrag();
            
        }
        
    
        for(var i=0; i<g; i++){
            leaf7 = this.add.sprite(this.rnd.integerInRange(150, this.world.width-150), this.rnd.integerInRange(300, this.world.height-500), 'game_leaf7');
            leaf7.anchor.setTo(0.5, 0.5);
            leaf7.scale.x=0.1;
            leaf7.scale.y = 0.1;
            this.garbageLeaves.add(leaf7, true);
            this.physics.arcade.enable(leaf7);
            leaf7.body.collideWorldBounds = true;

            leaf7.inputEnabled = true;
            leaf7.input.enableDrag();
            
        }
        
        
        
        for(var i=0; i<g; i++){
            leaf8 = this.add.sprite(this.rnd.integerInRange(150, this.world.width-150), this.rnd.integerInRange(300, this.world.height-500), 'game_leaf8');
            leaf8.anchor.setTo(0.5, 0.5);
            leaf8.scale.x=0.1;
            leaf8.scale.y = 0.1;
            this.garbageLeaves.add(leaf8, true);
            this.physics.arcade.enable(leaf8);
            leaf8.body.collideWorldBounds = true;

            
            leaf8.inputEnabled = true;
            leaf8.input.enableDrag();
           
        }*/
       
        
        
        /*for(var i=0; i<g; i++){
            seed1 = this.add.sprite(this.rnd.integerInRange(150, this.world.width-150),this.rnd.integerInRange(300, this.world.height-500), 'seed1');
            seed1.anchor.setTo(0.5, 0.5);
            seed1.scale.x=0.1;
            seed1.scale.y = 0.1;
            this.garbageLeaves.add(seed1, true);
            this.physics.arcade.enable(seed1);
            seed1.body.collideWorldBounds = true;

            seed1.inputEnabled = true;
            seed1.input.enableDrag();
           
        }
       */
        
        for(var i=0; i<s; i++){
            seed2 = this.add.sprite(this.rnd.integerInRange(50, this.world.width-50), this.rnd.integerInRange(300, this.world.height-500), 'seed1');
            seed2.anchor.setTo(0.5, 0.5);
            seed2.scale.x=0.185;
            seed2.scale.y = 0.185;
            this.garbageLeaves.add(seed2, true);
            this.physics.arcade.enable(seed2);
            seed2.body.collideWorldBounds = true;

            seed2.inputEnabled = true;
            seed2.input.enableDrag();
            
        }
        
       
        
        for(var i=0; i<s; i++){
            seed3 = this.add.sprite(this.rnd.integerInRange(50, this.world.width-50), this.rnd.integerInRange(300, this.world.height-500), 'seed3');
            seed3.anchor.setTo(0.5, 0.5);
            seed3.scale.x=0.185;
            seed3.scale.y = 0.185;
            this.garbageLeaves.add(seed3, true);
            this.physics.arcade.enable(seed3);
            seed3.body.collideWorldBounds = true;

            seed3.inputEnabled = true;
            seed3.input.enableDrag();
            
        }
        
        //this.renderReadyScreen();               //--------------------starts the timer when everything is ready
        //console.log("rendered cannabis leaves="+this.cannabisLeaves.length);
        
    },

















    
    renderDragableCannabisRealTime: function(){
        var cannabisleaf1, cannabisleaf2;
        //this.cannabisLeaves = this.add.group();
        var c;
        c = this.rnd.integerInRange(2, 4);

        
            for(var i=0; i<c; i++)
        {
            cannabisleaf1 = this.add.sprite(this.rnd.integerInRange(50, this.world.width-50), this.rnd.integerInRange(300, this.world.height-500), 'game_leaf_cannabis1');
            cannabisleaf1.anchor.setTo(0.5, 0.5);
            cannabisleaf1.scale.x = 0.25;
            cannabisleaf1.scale.y = 0.25;
            this.cannabisLeaves.add(cannabisleaf1, true);
            this.physics.arcade.enable(cannabisleaf1);
            cannabisleaf1.body.collideWorldBounds = true;
            
            cannabisleaf1.inputEnabled = true;
            cannabisleaf1.input.enableDrag();
           
        }
            
         for(var i=0; i<c; i++)
        {
           cannabisleaf2 = this.add.sprite(this.rnd.integerInRange(50, this.world.width-50),this.rnd.integerInRange(300, this.world.height-500), 'game_leaf_cannabis2');
            cannabisleaf2.anchor.setTo(0.5, 0.5);
            cannabisleaf2.scale.x = 0.07;
            cannabisleaf2.scale.y = 0.07;
            this.cannabisLeaves.add(cannabisleaf2, true);
            this.physics.arcade.enable(cannabisleaf2);
            cannabisleaf2.body.collideWorldBounds = true;
            
            cannabisleaf2.inputEnabled = true;
            cannabisleaf2.input.enableDrag();
            
        }
    },
    
    renderDragableGarbageRealTime: function(){
        var g;
        var leaf1;
        var leaf2, leaf3, leaf4, leaf5, leaf6, leaf7, leaf8;
        var seed1, seed2, seed3;
        g = this.rnd.integerInRange(0, 2);
        s = this.rnd.integerInRange(1, 2);
        
        for(var i=0; i<g; i++){
           leaf1 = this.add.sprite(this.rnd.integerInRange(50, this.world.width-50), this.rnd.integerInRange(300, this.world.height-500), 'game_leaf1');
            leaf1.anchor.setTo(0.5, 0.5);
            leaf1.scale.x=0.3;
            leaf1.scale.y = 0.3;
            this.garbageLeaves.add(leaf1, true);
            this.physics.arcade.enable(leaf1);
            leaf1.body.collideWorldBounds = true;
            
            leaf1.inputEnabled = true;
            leaf1.input.enableDrag();
            
            
        }
       
        
        
        for(var i=0; i<g; i++){
           leaf2 = this.add.sprite(this.rnd.integerInRange(50, this.world.width-50), this.rnd.integerInRange(300, this.world.height-500), 'game_leaf2');
            leaf2.anchor.setTo(0.5, 0.5);
            leaf2.scale.x=0.32;
            leaf2.scale.y =0.32;
            this.garbageLeaves.add(leaf2, true);
            this.physics.arcade.enable(leaf2);
            leaf2.body.collideWorldBounds = true;

            
            leaf2.inputEnabled = true;
            leaf2.input.enableDrag();
           
        }
        
        
        
        for(var i=0; i<g; i++){
            leaf3 = this.add.sprite(this.rnd.integerInRange(50, this.world.width-50), this.rnd.integerInRange(300, this.world.height-500), 'game_leaf3');
            leaf3.anchor.setTo(0.5, 0.5);
            leaf3.scale.x=0.3;
            leaf3.scale.y =0.3;
            this.garbageLeaves.add(leaf3, true);
            this.physics.arcade.enable(leaf3);
            leaf3.body.collideWorldBounds = true;

            
            leaf3.inputEnabled = true;
            leaf3.input.enableDrag();
            
        }
       
        
        
        for(var i=0; i<g; i++){
            leaf4 = this.add.sprite(this.rnd.integerInRange(50, this.world.width-50), this.rnd.integerInRange(300, this.world.height-500), 'game_leaf4');
            leaf4.anchor.setTo(0.5, 0.5);
            leaf4.scale.x=0.32;
            leaf4.scale.y = 0.32;
            this.garbageLeaves.add(leaf4, true);
            this.physics.arcade.enable(leaf4);
            leaf4.body.collideWorldBounds = true;

            
            leaf4.inputEnabled = true;
            leaf4.input.enableDrag();
           
        }
        
        
        /*for(var i=0; i<g; i++){
            leaf5 = this.add.sprite(this.rnd.integerInRange(150, this.world.width-150), this.rnd.integerInRange(300, this.world.height-500), 'game_leaf5');
            leaf5.anchor.setTo(0.5, 0.5);
            leaf5.scale.x=0.1;
            leaf5.scale.y = 0.1;
            this.garbageLeaves.add(leaf5, true);
            this.physics.arcade.enable(leaf5);
            leaf5.body.collideWorldBounds = true;

            leaf5.inputEnabled = true;
            leaf5.input.enableDrag();
          
        }
        
        
        for(var i=0; i<g; i++){
            leaf6 = this.add.sprite(this.rnd.integerInRange(150, this.world.width-150), this.rnd.integerInRange(300, this.world.height-500), 'game_leaf6');
            leaf6.anchor.setTo(0.5, 0.5);
            leaf6.scale.x=0.1;
            leaf6.scale.y = 0.1;
            this.garbageLeaves.add(leaf6, true);
            this.physics.arcade.enable(leaf6);
            leaf6.body.collideWorldBounds = true;

            leaf6.inputEnabled = true;
            leaf6.input.enableDrag();
            
        }
        
    
        for(var i=0; i<g; i++){
            leaf7 = this.add.sprite(this.rnd.integerInRange(150, this.world.width-150), this.rnd.integerInRange(300, this.world.height-500), 'game_leaf7');
            leaf7.anchor.setTo(0.5, 0.5);
            leaf7.scale.x=0.1;
            leaf7.scale.y = 0.1;
            this.garbageLeaves.add(leaf7, true);
            this.physics.arcade.enable(leaf7);
            leaf7.body.collideWorldBounds = true;

            leaf7.inputEnabled = true;
            leaf7.input.enableDrag();
            
        }
        
        
        
        for(var i=0; i<g; i++){
            leaf8 = this.add.sprite(this.rnd.integerInRange(150, this.world.width-150), this.rnd.integerInRange(300, this.world.height-500), 'game_leaf8');
            leaf8.anchor.setTo(0.5, 0.5);
            leaf8.scale.x=0.1;
            leaf8.scale.y = 0.1;
            this.garbageLeaves.add(leaf8, true);
            this.physics.arcade.enable(leaf8);
            leaf8.body.collideWorldBounds = true;

            
            leaf8.inputEnabled = true;
            leaf8.input.enableDrag();
           
        }
       
        
        
        for(var i=0; i<g; i++){
            seed1 = this.add.sprite(this.rnd.integerInRange(150, this.world.width-150),this.rnd.integerInRange(300, this.world.height-500), 'seed1');
            seed1.anchor.setTo(0.5, 0.5);
            seed1.scale.x=0.1;
            seed1.scale.y = 0.1;
            this.garbageLeaves.add(seed1, true);
            this.physics.arcade.enable(seed1);
            seed1.body.collideWorldBounds = true;

            seed1.inputEnabled = true;
            seed1.input.enableDrag();
           
        }*/
       
        
        for(var i=0; i<s; i++){
            seed2 = this.add.sprite(this.rnd.integerInRange(50, this.world.width-50), this.rnd.integerInRange(300, this.world.height-500), 'seed1');
            seed2.anchor.setTo(0.5, 0.5);
            seed2.scale.x=0.185;
            seed2.scale.y = 0.185;
            this.garbageLeaves.add(seed2, true);
            this.physics.arcade.enable(seed2);
            seed2.body.collideWorldBounds = true;

            seed2.inputEnabled = true;
            seed2.input.enableDrag();
            
        }
       
        
        for(var i=0; i<s; i++){
            seed3 = this.add.sprite(this.rnd.integerInRange(50, this.world.width-50), this.rnd.integerInRange(300, this.world.height-500), 'seed3');
            seed3.anchor.setTo(0.5, 0.5);
            seed3.scale.x=0.185;
            seed3.scale.y = 0.185;
            this.garbageLeaves.add(seed3, true);
            this.physics.arcade.enable(seed3);
            seed3.body.collideWorldBounds = true;

            seed3.inputEnabled = true;
            seed3.input.enableDrag();
            
        }    
    
    
    },

//-------------------------------------------------------------END----------------------------------------------------------------//

    





//----------------------------------------------------------POT OBJECTS----------------------------------------------------------//

    
   renderPlusOne: function(){
        var text, style;
        text = '+1 ';
        style = { font: "70px Arial", fill: "#ffffff", align: "center" };
        this.plusOneText = this.add.text(150, this.world.height-350, text, style);
        this.plusOneText.setShadow(7, 7, 'rgba(0,0,0,0.5)', 5);
        this.plusOneText.anchor.setTo(0.5, 0.5);
        this.add.tween(this.plusOneText.scale)
                        .to({x: 1.2, y: 1.2 }, 500, Phaser.Easing.Linear.None, true);
        this.add.tween(this.plusOneText)
                        .to({x: 150, y: this.world.height-350 - 30}, 500, Phaser.Easing.Linear.None, true);
        this.add.tween(this.plusOneText)
                        .to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);

        },


    renderMinusTwo: function(){
        var text, style;
        text = '-2 ';
        style = { font: "70px Arial", fill: "#ff0000", align: "center" };
        this.plusOneText = this.add.text(this.world.width-150, this.world.height-350, text, style);
        this.plusOneText.setShadow(7, 7, 'rgba(0,0,0,0.5)', 5);
        this.plusOneText.anchor.setTo(0.5, 0.5);
        this.add.tween(this.plusOneText.scale)
                        .to({x: 1.2, y: 1.2 }, 500, Phaser.Easing.Linear.None, true);
        this.add.tween(this.plusOneText)
                        .to({x: this.world.width-150, y: this.world.height-350 - 30}, 500, Phaser.Easing.Linear.None, true);
        this.add.tween(this.plusOneText)
                        .to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);

        },
    
    renderStaticObjects: function()
    {
        this.empty_bin1 = this.add.sprite(150, this.world.height-300, 'empty_bin');
        this.empty_bin1.scale.x = 0.5;
        this.empty_bin1.scale.y = 0.5;
        this.empty_bin1.anchor.setTo(0.5, 0.5);
        this.physics.arcade.enable(this.empty_bin1);
        this.smilingFaceLeft = this.add.sprite(150, this.world.height-260, 'smile');
        this.smilingFaceLeft.anchor.setTo(0.5, 0.5);
        this.smilingFaceLeft.scale.x = 0.6;
        this.smilingFaceLeft.scale.y = 0.6;
        this.emptyBin1Name = this.add.sprite(150, this.world.height-150, 'goodstuff')
        this.emptyBin1Name.anchor.setTo(0.5, 0.5);
        this.emptyBin1Name.scale.x = 0.5;
        this.emptyBin1Name.scale.y = 0.5;

        this.empty_bin1_collision = this.add.sprite(150, this.world.height - 330, 'empty_bin_collision');
        this.empty_bin1_collision.scale.x = 0.5;
        this.empty_bin1_collision.scale.y = 0.19;
        this.empty_bin1_collision.anchor.setTo(0.5, 0.5);
        this.empty_bin1_collision.alpha = 0;
        this.physics.arcade.enable(this.empty_bin1_collision);

       
        
        this.empty_bin2 = this.add.sprite(this.world.width-150, this.world.height-300, 'empty_bin');
        this.empty_bin2.scale.x = 0.5;
        this.empty_bin2.scale.y = 0.5;
        this.empty_bin2.anchor.setTo(0.5, 0.5);
        this.physics.arcade.enable(this.empty_bin2);
        this.smilingFaceRight = this.add.sprite(this.world.width-150, this.world.height-260, 'smile');
        this.smilingFaceRight.anchor.setTo(0.5, 0.5);
        this.smilingFaceRight.scale.x = 0.6;
        this.smilingFaceRight.scale.y = 0.6;
        this.emptyBin2Name = this.add.sprite(this.world.width-150, this.world.height-150, 'notsogoodstuff')
        this.emptyBin2Name.anchor.setTo(0.5, 0.5);
        this.emptyBin2Name.scale.x = 0.5;
        this.emptyBin2Name.scale.y = 0.5;
        
        this.empty_bin2_collision = this.add.sprite(this.world.width-150, this.world.height-330, 'empty_bin_collision');
        this.empty_bin2_collision.scale.x = 0.5;
        this.empty_bin2_collision.scale.y = 0.19;
        this.empty_bin2_collision.anchor.setTo(0.5, 0.5);
        this.empty_bin2_collision.alpha = 0;
        this.physics.arcade.enable(this.empty_bin2_collision);
  
    
    }, 


    renderHappyFaceLeft: function(){
        this.smilingFaceLeft.alpha = 0;
        this.happyFaceLeft = this.add.sprite(150, this.world.height-260, 'happy');
        this.happyFaceLeft.anchor.setTo(0.5, 0.5);
        this.happyFaceLeft.scale.x = 0.6;
        this.happyFaceLeft.scale.y = 0.6;
        this.add.tween(this.happyFaceLeft).delay(100).to({alpha: 0}, 300, Phaser.Easing.Linear.None, true);
        this.add.tween(this.smilingFaceLeft).delay(100).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true);

    },

    renderHappyFaceRight: function(){
        this.smilingFaceRight.alpha = 0;
        this.happyFaceRight = this.add.sprite(this.world.width-150, this.world.height-260, 'happy');
        this.happyFaceRight.anchor.setTo(0.5, 0.5);
        this.happyFaceRight.scale.x = 0.6;
        this.happyFaceRight.scale.y = 0.6;
        this.add.tween(this.happyFaceRight).delay(100).to({alpha: 0}, 300, Phaser.Easing.Linear.None, true);
        this.add.tween(this.smilingFaceRight).delay(100).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true);

    },

    renderSadFaceRight: function(){
        this.smilingFaceRight.alpha = 0;
        this.sadFaceRight = this.add.sprite(this.world.width-150, this.world.height-260, 'sad');
        this.sadFaceRight.anchor.setTo(0.5, 0.5);
        this.sadFaceRight.scale.x = 0.6;
        this.sadFaceRight.scale.y = 0.6;
        this.add.tween(this.sadFaceRight).delay(100).to({alpha: 0}, 400, Phaser.Easing.Linear.None, true);
        this.add.tween(this.smilingFaceRight).delay(200).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true);
    },

    renderSadFaceLeft: function(){
        this.smilingFaceLeft.alpha = 0;
        this.sadFaceLeft = this.add.sprite(150, this.world.height-260, 'sad');
        this.sadFaceLeft.anchor.setTo(0.5, 0.5);
        this.sadFaceLeft.scale.x = 0.6;
        this.sadFaceLeft.scale.y = 0.6;
        this.add.tween(this.sadFaceLeft).delay(100).to({alpha: 0}, 400, Phaser.Easing.Linear.None, true);
        this.add.tween(this.smilingFaceLeft).delay(200).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true);
    }, 

    renderHalfCannabis: function(){
        this.empty_bin1_half = this.add.sprite(150, this.world.height-300, 'cannabis_half_bin');
        this.empty_bin1_half.scale.x = 0.5;
        this.empty_bin1_half.scale.y = 0.5;
        this.empty_bin1_half.anchor.setTo(0.5, 0.5);
        this.physics.arcade.enable(this.empty_bin1);
        this.world.bringToTop(this.empty_bin1_half);
        this.smilingFaceLeft = this.add.sprite(150, this.world.height-260, 'smile');
        this.smilingFaceLeft.anchor.setTo(0.5, 0.5);
        this.smilingFaceLeft.scale.x = 0.6;
        this.smilingFaceLeft.scale.y = 0.6;
        
        this.world.bringToTop(this.cannabisLeaves);
        this.world.bringToTop(this.garbageLeaves);
        this.world.bringToTop(this.minusFourLeaves);
    },
    
    renderFullCannabis: function(){
        this.empty_bin1_full = this.add.sprite(150, this.world.height-300, 'cannabis_full_bin');
        this.empty_bin1_full.scale.x = 0.5;
        this.empty_bin1_full.scale.y = 0.5;
        this.empty_bin1_full.anchor.setTo(0.5, 0.5);
        this.physics.arcade.enable(this.empty_bin1);
        this.world.bringToTop(this.empty_bin1_full);
        this.smilingFaceLeft = this.add.sprite(150, this.world.height-260, 'smile');
        this.smilingFaceLeft.anchor.setTo(0.5, 0.5);
        this.smilingFaceLeft.scale.x = 0.6;
        this.smilingFaceLeft.scale.y = 0.6;
        
        this.world.bringToTop(this.cannabisLeaves);
        this.world.bringToTop(this.garbageLeaves);
        this.world.bringToTop(this.minusFourLeaves);
    },
    
    renderHalfGarbage: function(){
        this.empty_bin2_half = this.add.sprite(this.world.width-150, this.world.height-300, 'garbage_half_bin');
        this.empty_bin2_half.scale.x = 0.5;
        this.empty_bin2_half.scale.y = 0.5;
        this.empty_bin2_half.anchor.setTo(0.5, 0.5);
        this.physics.arcade.enable(this.empty_bin2);
        this.world.bringToTop(this.empty_bin2_half);
        this.smilingFaceRight = this.add.sprite(this.world.width-150, this.world.height-260, 'smile');
        this.smilingFaceRight.anchor.setTo(0.5, 0.5);
        this.smilingFaceRight.scale.x = 0.6;
        this.smilingFaceRight.scale.y = 0.6;
        //
        this.world.bringToTop(this.cannabisLeaves);
        this.world.bringToTop(this.garbageLeaves);
        this.world.bringToTop(this.minusFourLeaves);
    },
    
    renderFullGarbage: function(){
        this.empty_bin2_full = this.add.sprite(this.world.width-150, this.world.height-300, 'garbage_full_bin');
        this.empty_bin2_full.scale.x = 0.5;
        this.empty_bin2_full.scale.y = 0.5;
        this.empty_bin2_full.anchor.setTo(0.5, 0.5);
        this.physics.arcade.enable(this.empty_bin2);
        this.world.bringToTop(this.empty_bin2_full);
        this.smilingFaceRight = this.add.sprite(this.world.width-150, this.world.height-260, 'smile');
        this.smilingFaceRight.anchor.setTo(0.5, 0.5);
        this.smilingFaceRight.scale.x = 0.6;
        this.smilingFaceRight.scale.y = 0.6;
        
        this.world.bringToTop(this.cannabisLeaves);
        this.world.bringToTop(this.garbageLeaves);
        this.world.bringToTop(this.minusFourLeaves);
    },

//-----------------------------------------------------END----------------------------------------------------------------//




//----------------------------------------------READY SCREEN--------------------------------------------------------------------------//
    renderReadyScreen: function(){
        this.readyScreen = this.add.sprite(this.world.centerX, this.world.centerY+60, 'pause_backdrop');
        this.readyScreen.anchor.setTo(0.5, 0.5);
        this.readyScreen.scale.x = 1.87;
        this.readyScreen.scale.y = 2.1;
        this.readyScreen.alpha = 0;
        readyScreenTween = this.add.tween(this.readyScreen).delay(600).to({alpha: 0.8}, 500, Phaser.Easing.Linear.None, true).onComplete.add(function(){
            
            this.readyText = this.add.sprite(this.world.centerX, this.world.centerY-40, 'readyText');
            this.readyText.anchor.setTo(0.5, 0.5);
            this.readyText.scale.x = 0.7;
            this.readyText.scale.y = 0.7;
            this.renderReadyScreenNumbers();
            
       }, this);
        
      },
    renderReadyScreenNumbers: function(){
                
                var t6, t7, t8, t9;
                
                this.readyNumber = this.add.sprite(this.world.centerX, this.world.centerY + 160, 'three_yellow');
                
                this.readyNumber.anchor.setTo(0.5, 0.5);
                this.readyNumber.alpha = 0;
                this.readyNumber.scale.x = 0;
                this.readyNumber.scale.y = 0;
                this.add.tween(this.readyNumber.scale)
                                 .to({x: 0.7, y: 0.7 }, 500, Phaser.Easing.Linear.None, true);
                
                this.add.tween(this.readyNumber)
                                    .to({alpha: 1}, 400, Phaser.Easing.Linear.None, true).onComplete.add(function(){
                this.add.tween(this.readyNumber)
                                    .to({alpha: 0}, 400, Phaser.Easing.Linear.None, true).onComplete.add(function(){ 
                this.readyNumber = this.add.sprite(this.world.centerX, this.world.centerY + 160, 'two_yellow');
                //this.readyNumber.setShadow(7, 7, 'rgba(0,0,0,0.5)', 5);
                this.readyNumber.anchor.setTo(0.5, 0.5);
                this.readyNumber.alpha = 0;
                this.readyNumber.scale.x = 0;
                this.readyNumber.scale.y = 0;
                this.add.tween(this.readyNumber.scale)
                                 .to({x: 0.7, y: 0.7 }, 500, Phaser.Easing.Linear.None, true);
                
                this.add.tween(this.readyNumber)
                                .to({alpha: 1}, 400, Phaser.Easing.Linear.None, true).onComplete.add(function(){
                this.add.tween(this.readyNumber)
                                    .to({alpha: 0}, 400, Phaser.Easing.Linear.None, true).onComplete.add(function(){
                this.readyNumber = this.add.sprite(this.world.centerX, this.world.centerY + 160, 'one_yellow');
                //this.readyNumber.setShadow(7, 7, 'rgba(0,0,0,0.5)', 5);
                this.readyNumber.anchor.setTo(0.5, 0.5);
                this.readyNumber.alpha = 0;
                this.readyNumber.scale.x = 0;
                this.readyNumber.scale.y = 0;
                this.add.tween(this.readyNumber.scale)
                                 .to({x: 0.7, y: 0.7 }, 500, Phaser.Easing.Linear.None, true);
                
                this.add.tween(this.readyNumber)
                                    .to({alpha: 1}, 400, Phaser.Easing.Linear.None, true).onComplete.add(function(){
                this.add.tween(this.readyNumber)
                                    .to({alpha: 0}, 400, Phaser.Easing.Linear.None, true).onComplete.add(function(){
                this.readyNumber = this.add.sprite(this.world.centerX, this.world.centerY + 160, 'goText');
                //this.readyNumber.setShadow(7, 7, 'rgba(0,0,0,0.5)', 5);
                this.readyNumber.anchor.setTo(0.5, 0.5);
                this.readyNumber.alpha = 0;
                this.readyNumber.scale.x = 0;
                this.readyNumber.scale.y = 0;
                this.add.tween(this.readyNumber.scale)
                                 .to({x: 0.7, y: 0.7 }, 500, Phaser.Easing.Linear.None, true);
                this.add.audio('ready_beep').play('', 0, 0.5, false);
                this.add.tween(this.readyNumber)
                                    .to({alpha: 1}, 400, Phaser.Easing.Linear.None, true).onComplete.add(function(){
                this.add.tween(this.readyNumber)
                                    .to({alpha: 0}, 400, Phaser.Easing.Linear.None, true).onComplete
                                    .add(this.removeReadyScreen, this);}, this);}, this);}, this);}, this);}, this);}, this);}, this);

                
            
            

        },

        removeReadyScreen: function(){
            this.add.tween(this.readyScreen).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);
            this.add.tween(this.readyText).to({alpha: 0}, 250, Phaser.Easing.Linear.None, true);
            this.add.tween(this.readyNumber).to({alpha: 0}, 250, Phaser.Easing.Linear.None, true);
            this.renderPauseButton();
            //console.log('ready screen removed');
            this.input.disabled = false;
            this.timer.start();

            
            this.playGameAudio = this.add.audio('gameplay_audio');
            this.playGameAudio.play('', 0, 0, true);
            var volume = 0.2;
            var i = 0;
            this.time.events.repeat(50, 40, function(){
                
                //console.log('this is running');
                if(i < volume && this.playGameAudio != null){
                    this.playGameAudio.volume = i;
                    i = i+0.01;
                    

                }
                if(i >= volume && this.playGameAudio != null){
                    this.playGameAudio.volume = i;
                    i = volume;
                    //console.log('current volume = ' +  this.playGameAudio.volume);
                    
                }
            }, this);
            

        },

        
            
     

  
//-----------------------------------------------------END----------------------------------------------------------------//







//---------------------------------------------------TIMER DISPLAY------------------------------------------------------------//

    separateDigits: function(num){

        var d1, d2, d3; //the number will be d1d2d3 and not d3d2d1
        var str = num.toString();
        d1 = str.charAt(0);
        d2 = str.charAt(1);
        d3 = str.charAt(2);
        //console.log(str);
        if(num >= 0){
            this.loadNumberImage(str);
        }

    },

    loadNumberImage: function(stringNumber){
        var i, spriteName;
        var length;
        /*var temp = 2-3;
        var temp1 = temp.toString();
        console.log(temp1);*/
        length = stringNumber.length;
        
        for(i = 0; i < length; i++){
            //console.log(stringNumber.charAt(i));
            switch (stringNumber.charAt(i)){

                case '0':
                    spriteName = 'zero';
                    break;
                case '1':
                    spriteName = 'one';
                    break;
                case '2':
                    spriteName = 'two';
                    break;
                case '3':
                    spriteName = 'three';
                    break;
                case '4':
                    spriteName = 'four';
                    break;
                case '5':
                    spriteName = 'five';
                    break;
                case '6':
                    spriteName = 'six';
                    break;
                case '7':
                    spriteName = 'seven';
                    break;
                case '8':
                    spriteName = 'eight';
                    break;
                case '9':
                    spriteName = 'nine';
                    break;
                
                default:
                    
                    console.log('Error, not valid');
                    break;
            }

            if(i == 0 && stringNumber.charAt(i) != 0 && stringNumber.length == 2){
                this.tensPlace = this.add.sprite(250, 30, spriteName);
                this.tensPlace.alpha = 0;

            }
            else if(i == 1 && i < stringNumber.length && stringNumber.length == 2){
                this.unitsPlace = this.add.sprite(300, 30, spriteName);
                this.unitsPlace.alpha = 0;
            }
           
            else if(i == 0 && stringNumber.length == 1 && stringNumber.charAt(i) >= '6'){
                this.tensPlace.destroy();
                this.unitsPlace = this.add.sprite(275, 30, spriteName);
                this.unitsPlace.alpha = 0;
            }
            else if(i == 0 && stringNumber.length == 1 && stringNumber.charAt(i) < '6'){
                this.tensPlace.destroy();
                var temp_string = spriteName + '_yellow';
                this.unitsPlace = this.add.sprite(275, 30, temp_string);
                this.unitsPlace.alpha = 0;
            }
            
            //console.log(i);
        }

        this.renderTimerOnScreen();
    },

    
    renderTimerOnScreen: function(){
            this.unitsPlace.scale.x = 0.375;
            this.unitsPlace.scale.y = 0.375;
            this.tensPlace.scale.x = 0.375;
            this.tensPlace.scale.y = 0.375;
        //this.separateDigits(this.secondsElapsed);
        if(this.t_counter == 0){

            
            this.unitsPlace.alpha = 1;
            this.tensPlace.alpha = 1;

            this.unitsPlaceTween = this.add.tween(this.unitsPlace.scale)
                            .to({ x: 0.3, y: 0.3 }, 500, Phaser.Easing.Linear.None, true)
                            .to({ x: 0.45, y: 0.45 }, 500, Phaser.Easing.Linear.None, true)
                            .loop();
            this.add.tween(this.unitsPlace).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
            if(this.tensPlace != null && this.tensPlace != '0'){
                this.tensPlaceTween = this.add.tween(this.tensPlace.scale)
                         .to({ x: 0.3, y: 0.3 }, 500, Phaser.Easing.Linear.None, true)
                            .to({ x: 0.45, y: 0.45 }, 500, Phaser.Easing.Linear.None, true)
                         .loop();
                this.add.tween(this.tensPlace).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
            }
            else if(this.tensPlace == '0'){this.tensPlace.destroy();}
            
            
        
        this.t_counter ++;
        }
        else{
            
            this.unitsPlace.alpha = 1;
            this.tensPlace.alpha = 1;
            this.unitsPlaceTween = this.add.tween(this.unitsPlace.scale)
                            .to({ x: 0.3, y: 0.3 }, 500, Phaser.Easing.Linear.None, true)
                            .to({ x: 0.45, y: 0.45 }, 500, Phaser.Easing.Linear.None, true);
            this.add.tween(this.unitsPlace).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);                
            if(this.tensPlace != null){
                this.tensPlaceTween = this.add.tween(this.tensPlace.scale)
                         .to({ x: 0.3, y: 0.3 }, 500, Phaser.Easing.Linear.None, true)
                            .to({ x: 0.45, y: 0.45 }, 500, Phaser.Easing.Linear.None, true);
                this.add.tween(this.tensPlace).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
                              
            }
        }
    },

//-------------------------------------------------------------END----------------------------------------------------------------//







    
//-----------------------------------------------------POWER-UPs---------------------------------------------------------//
    selectPower: function(){

        this.powerSelector = this.rnd.integerInRange(1, 4);
        //this.powerSelector = 1;
    
        
        switch(this.powerSelector){
            case 1:
                if(this.doubleScoreActivated == false){
                    this.renderPowerDoubleBonus();
                }
                break;
            case 2:
                if(this.minusFourActivated == false){
                    this.renderMinusFourPower();
                    this.minusFourLeaves.callAll('events.onInputDown.add', 'events.onInputDown', this.inputDownOnMinusFour);
                    this.minusFourLeaves.callAll('events.onInputUp.add', 'events.onInputUp', this.inputUpOnMinusFour);
                }
                break;
            case 3:
                if(this.stopTimerActivated == false){
                    this.renderStopTimerPower();
                }
                break;
            default:
                break;

        }
    },

    //--------------------------------------------------------powerSelect = 1---------------------------------------------------//

    activateDoubleBonus: function(obj1, obj2){
        if(this.doubleScoreLeaf.input.isDragged){
            this.renderPowerDoubleBonusActivated();
            this.renderHappyFaceLeft();
            this.doubleScoreSeconds = 5;
            this.doubleScoreActivated = false;
            this.doubleBonusSignal = true;
            this.doubleBonusAudio = this.add.audio('two_x_audio').play('', 0, 0.7, false);
            this.playGameAudio.volume = 0.2;
            if(this.stopTimerAudio != null){
                this.stopTimerAudio.stop();
                this.stopTimerAudio = null;
            }
        }
        obj2.destroy();

    },


    deactivateDoubleBonus: function(obj1, obj2){
        this.doubleBonusSignal = false;
        this.renderSadFaceRight();
        obj2.destroy();
    },


    renderPlusTwo: function(){
        var text, style;
        text = '+2 ';
        style = { font: "70px Arial", fill: "#33CC33", align: "center" };
        this.plusOneText = this.add.text(150, this.world.height-350, text, style);
        this.plusOneText.setShadow(7, 7, 'rgba(0,0,0,0.5)', 5);
        this.plusOneText.anchor.setTo(0.5, 0.5);
        this.add.tween(this.plusOneText.scale)
                        .to({x: 1.2, y: 1.2 }, 500, Phaser.Easing.Linear.None, true);
        this.add.tween(this.plusOneText)
                        .to({x: 150, y: this.world.height-350 - 30}, 500, Phaser.Easing.Linear.None, true);
        this.add.tween(this.plusOneText)
                        .to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);

    },


    renderPowerDoubleBonus: function(){
        this.doubleScoreLeaf = this.add.sprite(this.world.centerX - this.rnd.integerInRange(0, 200), this.world.centerY - this.rnd.integerInRange(0, 400), 'double_score_leaf');
        //this.doubleScoreLeaf.enableBody = true;
        this.doubleScoreLeaf.anchor.setTo(0.5, 0.5);
        this.doubleScoreLeaf.scale.x = 0.045;
        this.doubleScoreLeaf.scale.y = 0.045;
        this.physics.arcade.enable(this.doubleScoreLeaf);
        this.doubleScoreLeaf.body.collideWorldBounds = true;
        this.world.bringToTop(this.doubleScoreLeaf);
        this.randomMovementDoubleScoreLeaf = this.add.tween(this.doubleScoreLeaf).to({alpha: 1}, 500, Phaser.Easing.Linear.None, false);
        
        /*this.doubleScoreLeaf.body.velocity.x = this.rnd.integerInRange(100, 300);
        this.doubleScoreLeaf.body.bounce.set(1);*/
        //this.doubleScoreLeaf.body.velocity.y = 50;
        //temp_timer = this.time.create(false);
        this.time.events.repeat(1000, 200, function(){
            var x_next, y_next;
            if(this.doubleScoreLeaf != null){
                x_next = this.doubleScoreLeaf.x + this.rnd.integerInRange(-100, 100);
                y_next = this.doubleScoreLeaf.y + this.rnd.integerInRange(-100, 100);
            }
            if(this.doubleScoreLeaf == null){
                x_next = this.rnd.integerInRange(100, 200);
                y_next = this.rnd.integerInRange(250, 350);
                //console.log('Location of stopTimerLeaf is null');
            }
            
            if(y_next <= 125){
                y_next = this.doubleScoreLeaf.y + 150;
            }
            if(this.doubleScoreLeaf != null && this.doubleScoreLeaf.input.isDragged == false){
                this.randomMovementDoubleScoreLeaf = this.add.tween(this.doubleScoreLeaf).to({x: x_next, y: y_next}, 300, Phaser.Easing.Linear.None, true);
               
            }
            if(this.doubleScoreLeaf != null && this.doubleScoreLeaf.input.isDragged == true){
                this.randomMovementDoubleScoreLeaf.stop();
                
            }
            if(this.doubleScoreLeaf == null){
                //console.log('doubleScoreLeaf is null');
            }
            this.speedOfPowerUpSprites = this.speedOfPowerUpSprites - 2;
        }, this);
        

        this.doubleScoreActivated = true;


        this.doubleScoreLeaf.inputEnabled = true;
        this.doubleScoreLeaf.input.enableDrag();
        this.doubleScoreLeaf.events.onInputDown.add(function(){
            this.doubleScoreLeaf.scale.x = 0.055;
            this.doubleScoreLeaf.scale.y = 0.055;
        }, this);
        this.doubleScoreLeaf.events.onInputUp.add(function(){
            this.doubleScoreLeaf.scale.x = 0.045;
            this.doubleScoreLeaf.scale.y = 0.045;
        }, this);
        //if(this.doubleScoreLeaf.events.onDragStart){this.doubleScoreLeaf.body.moves = false;}
        //else if(this.doubleLeafScore.events.onDragStop){this.doubleScoreLeaf.body.moves = true;}

    },



    renderPowerDoubleBonusActivated: function(){
        if(this.powerStopTimerAnimation != null){
            this.powerStopTimerAnimation.destroy();
        }
        this.powerDoubleBonusAnimation = this.add.sprite(150, this.world.height-350, 'two_x_sprite');
        this.powerDoubleBonusAnimation.alpha = 0.7;
        this.powerDoubleBonusAnimation.scale.x = 0.4;
        this.powerDoubleBonusAnimation.scale.y = 0.4;

        //this.powerDoubleBonusAnimation.setShadow(0, 0, 'rbga(0, 0, 0, 0.5)', 7);
        //this.add.tween(this.powerDoubleBonusAnimation).to({k: 250}, 300, Phaser.Easing.Circular.None, true);
        this.add.tween(this.powerDoubleBonusAnimation).to({x: 200, y: this.world.height-450 }, 100, Phaser.Easing.Linear.None, true).onComplete.add(function(){
            this.add.tween(this.powerDoubleBonusAnimation).to({x: 235, y: this.world.height-450 }, 100, Phaser.Easing.Linear.None, true).onComplete.add(function(){
                this.add.tween(this.powerDoubleBonusAnimation).to({x: 270, y: this.world.height-350 }, 100, Phaser.Easing.Linear.None, true).onComplete.add(function(){
                    this.add.tween(this.powerDoubleBonusAnimation).to( { y: this.world.height-375}, 500, Phaser.Easing.Bounce.Out, true);
                }, this);
            }, this);}, this);
        
        
        this.add.tween(this.powerDoubleBonusAnimation.scale).to({ x: 0.6, y: 0.6 }, 300, Phaser.Easing.Linear.None, true);
        //this.add.tween(this.powerDoubleBonusAnimation).to({alpha: 1}, 300, Phaser.Easing.Linear.None, true);
        //this.powerDoubleBonusAnimationShadowTween = this.add.tween(this.powerDoubleBonusAnimationShadow).to({alpha: 0.2}, 400, Phaser.Easing.Linear.None, false);


    },



    //----------------------------------------------------------powerSelect = 2--------------------------------------//

    activateMinusFourSeconds: function(obj1, obj2){
        this.secondsElapsed = this.secondsElapsed - 4;
        obj2.destroy();
        this.renderMinusFour();
        this.minusFourActivated = false;
        this.renderSadFaceLeft();
        this.add.audio('minus_four_audio').play('', 0, 0.8, false);
        
        

    },

    deactivateMinusFourSeconds: function(obj1, obj2){
        this.renderHappyFaceRight();
        obj2.destroy();
    },

    renderMinusFour: function(){
        var text, style;
        text = '-4 ';
        style = { font: "70px Arial", fill: "#ff0000", align: "center" };
        this.plusOneText = this.add.text(150, this.world.height-350, text, style);
        this.plusOneText.setShadow(7, 7, 'rgba(0,0,0,0.5)', 5);
        this.plusOneText.anchor.setTo(0.5, 0.5);
        this.add.tween(this.plusOneText.scale)
                        .to({x: 1.2, y: 1.2 }, 500, Phaser.Easing.Linear.None, true);
        this.add.tween(this.plusOneText)
                        .to({x: 150, y: this.world.height-350 - 30}, 500, Phaser.Easing.Linear.None, true);
        this.add.tween(this.plusOneText)
                        .to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);

    },

    renderminusFourPowerOnStartup: function(){
        
        this.minusFourLeaves = this.add.group();

        for(var i=0; i<1; i++){
            minusFourLeaf = this.add.sprite(this.world.width, this.world.height, 'minus_four_leaf');
            minusFourLeaf.alpha = 0;
            minusFourLeaf.anchor.setTo(0.5, 0.5);
            minusFourLeaf.scale.x = 0.15;
            minusFourLeaf.scale.y = 0.15;
            minusFourLeaf.alpha = 0;
            this.physics.arcade.enable(minusFourLeaf);
            minusFourLeaf.body.collideWorldBounds = true;
            
            minusFourLeaf.inputEnabled = true;
            minusFourLeaf.input.enableDrag();
            this.minusFourLeaves.add(minusFourLeaf, true);
        }
    },

    renderMinusFourPower: function(){

        //this.minusFourLeaf = this.add.sprite(this.world.centerX - this.rnd.integerInRange(0, 200), this.world.centerY - this.rnd.integerInRange(0, 200), 'minus_four_leaf');
        //this.minusFourLeaf.enableBody = true;
        //this.minusFourLeaves = this.add.group();
        
        for(var i=0; i<1; i++){
            minusFourLeaf = this.add.sprite(this.world.centerX + this.rnd.integerInRange(-200, 200), this.world.centerY - this.rnd.integerInRange(-100, 200), 'minus_four_leaf');
            minusFourLeaf.anchor.setTo(0.5, 0.5);
            minusFourLeaf.scale.x = 0.15;
            minusFourLeaf.scale.y = 0.15;
            this.physics.arcade.enable(minusFourLeaf);
            minusFourLeaf.body.collideWorldBounds = true;
            
            minusFourLeaf.inputEnabled = true;
            minusFourLeaf.input.enableDrag();
            this.minusFourLeaves.add(minusFourLeaf, true);
        }
           
            
        this.minusFourActivated = false;
        /*this.minusFourLeaf.anchor.setTo(0.5, 0.5);
        this.minusFourLeaf.scale.x = 0.1;
        this.minusFourLeaf.scale.y = 0.1;
        this.physics.arcade.enable(this.minusFourLeaf);
        this.minusFourLeaf.body.collideWorldBounds = true;
        //this.minusFourLeaf.body.velocity.x = this.rnd.integerInRange(100, 300);
        //this.minusFourLeaf.body.bounce.set(1);
        //this.minusFourLeaf.body.velocity.y = 50;
        this.minusFourActivated = true;
        this.minusFourLeaf.inputEnabled = true;
        this.minusFourLeaf.input.enableDrag();
        //if(this.minusFourLeaf.events.onDragStart){this.minusFourLeaf.body.moves = false;}
        //else if(this.doubleLeafScore.events.onDragStop){this.minusFourLeaf.body.moves = true;}*/

    
    },

    
    

    //-----------------------------------------------powerSelect = 3---------------------------------------------------//
    

    activateStopTimer: function(obj1, obj2){
        if(this.stopTimerLeaf.input.isDragged){
            this.stopTimerCounter = 4;
        //console.log(this.stopTimerCounter);
            this.stopTimerSignal = true;
            this.renderHappyFaceLeft();
            this.renderStopTimerPowerActivated();
            this.playStopTimerAudio();
            
        }
        obj2.destroy();
        
    },


    playStopTimerAudio: function(){
        this.playGameAudio.volume = 0;
        this.stopTimerAudio = this.add.audio('time_stop_power_audio');
        this.stopTimerAudio.play('', 0, 1, false);
    },

    
    deactivateStopTimer: function(obj1, obj2){
        this.stopTimerActivated = false;
        this.renderSadFaceRight();
        obj2.destroy();
    },
    

    renderStopTimerPower: function(){

        this.stopTimerLeaf = this.add.sprite(this.world.centerX - this.rnd.integerInRange(0, 200), this.world.centerY - this.rnd.integerInRange(200, 400), 'stop_timer_leaf');
        //this.stopTimerLeaf.enableBody = true;
        this.stopTimerLeaf.anchor.setTo(0.5, 0.5);
        this.stopTimerLeaf.scale.x = 0.20;
        this.stopTimerLeaf.scale.y = 0.20;
        this.physics.arcade.enable(this.stopTimerLeaf);
        this.stopTimerLeaf.body.collideWorldBounds = true;
        this.world.bringToTop(this.stopTimerLeaf);
        //this.stopTimerLeaf.body.velocity.x = this.rnd.integerInRange(100, 300);
        //this.stopTimerLeaf.body.bounce.set(1);
        //this.stopTimerLeaf.body.velocity.y = 50;
        
        this.randomMovementStopTimerLeaf = this.add.tween(this.stopTimerLeaf).to({alpha: 1}, 500, Phaser.Easing.Linear.None, false);
        this.time.events.repeat(1000, 200, function(){
            var x_next, y_next;
            if(this.stopTimerLeaf != null){
                x_next = this.stopTimerLeaf.x + this.rnd.integerInRange(-100, 100);
                y_next = this.stopTimerLeaf.y + this.rnd.integerInRange(-100, 100);
            }
            if(this.stopTimerLeaf == null){
                x_next = this.rnd.integerInRange(100, 200);
                y_next = this.rnd.integerInRange(250, 350);
                //console.log('Location of stopTimerLeaf is null');
            }
            if(y_next <= 125){
                y_next = this.stopTimerLeaf.y + 150;
            }

            if(this.stopTimerLeaf != null && this.stopTimerLeaf.input.isDragged == false){
                this.randomMovementStopTimerLeaf = this.add.tween(this.stopTimerLeaf).to({x: x_next, y: y_next}, 300, Phaser.Easing.Linear.None, true);
                
            }
            if(this.stopTimerLeaf != null && this.stopTimerLeaf.input.isDragged == true){
                this.randomMovementStopTimerLeaf.stop();
               
            }
            if(this.stopTimerLeaf == null){
                //console.log('is null');
            }
            this.speedOfPowerUpSprites = this.speedOfPowerUpSprites - 2;
        }, this);



        this.stopTimerActivated = true;


        this.stopTimerLeaf.inputEnabled = true;
        this.stopTimerLeaf.input.enableDrag();
        this.stopTimerLeaf.events.onInputDown.add(function(){
            this.stopTimerLeaf.scale.x = 0.23;
            this.stopTimerLeaf.scale.y = 0.23;
        }, this);
        this.stopTimerLeaf.events.onInputUp.add(function(){
            this.stopTimerLeaf.scale.x = 0.2;
            this.stopTimerLeaf.scale.y = 0.2;
        }, this);

    },

    renderStopTimerPowerActivated: function(){
        if(this.powerDoubleBonusAnimation != null){
            this.powerDoubleBonusAnimation.destroy();
        }
        this.powerStopTimerAnimation = this.add.sprite(150, this.world.height-350, 'stop_timer_sprite');
        this.powerStopTimerAnimation.alpha = 0.7;
        this.powerStopTimerAnimation.anchor.setTo(0.18, 0.18);
        this.powerStopTimerAnimation.scale.x = 0.2;
        this.powerStopTimerAnimation.scale.y = 0.2;

        //this.powerStopTimerAnimation.setShadow(0, 0, 'rbga(0, 0, 0, 0.5)', 7);
        //this.add.tween(this.powerStopTimerAnimation).to({k: 250}, 300, Phaser.Easing.Circular.None, true);
        this.add.tween(this.powerStopTimerAnimation).to({x: 200, y: this.world.height-475 }, 100, Phaser.Easing.Linear.None, true).onComplete.add(function(){
            this.add.tween(this.powerStopTimerAnimation).to({x: 235, y: this.world.height-475 }, 100, Phaser.Easing.Linear.None, true).onComplete.add(function(){
                this.add.tween(this.powerStopTimerAnimation).to({x: 270, y: this.world.height-300 }, 100, Phaser.Easing.Linear.None, true).onComplete.add(function(){
                    this.add.tween(this.powerStopTimerAnimation).to( { y: this.world.height-325}, 500, Phaser.Easing.Bounce.Out, true);
                }, this);
            }, this);}, this);
        
        
        this.add.tween(this.powerStopTimerAnimation.scale).to({ x: 0.4, y: 0.4 }, 300, Phaser.Easing.Linear.None, true);



    },



//-----------------------------------------------------END----------------------------------------------------------------//     
   







//-----------------------------------------------------update------------------------------------------------------------- 
    
    update: function()
    {
        
        this.physics.arcade.overlap(this.empty_bin1_collision, this.cannabisLeaves, this.cannabis_overlapHandler_good, null, this);
        this.physics.arcade.overlap(this.empty_bin1_collision, this.doubleScoreLeaf, this.activateDoubleBonus, null, this);
        this.physics.arcade.overlap(this.empty_bin1_collision, this.minusFourLeaves, this.activateMinusFourSeconds, null, this);
        this.physics.arcade.overlap(this.empty_bin1_collision, this.stopTimerLeaf, this.activateStopTimer, null, this);
        this.physics.arcade.overlap(this.empty_bin2_collision, this.doubleScoreLeaf, this.deactivateDoubleBonus, null, this);
        this.physics.arcade.overlap(this.empty_bin2_collision, this.minusFourLeaves, this.deactivateMinusFourSeconds, null, this);
        this.physics.arcade.overlap(this.empty_bin2_collision, this.stopTimerLeaf, this.deactivateStopTimer, null, this);
        this.physics.arcade.overlap(this.empty_bin1_collision, this.garbageLeaves, this.garbage_overlapHandler_good, null, this);
        this.physics.arcade.overlap(this.empty_bin2_collision, this.cannabisLeaves, this.cannabis_overlapHandler_bad, null, this);
        this.physics.arcade.overlap(this.empty_bin2_collision, this.garbageLeaves, this.garbage_overlapHandler_bad, null, this);
        this.check();
        
        
        
    },
//-------------------------------------------------good pot overlap handlers------------------------------------------------------------------ 

    cannabis_overlapHandler_good: function(obj1, obj2){
        //console.log("Overlapping");
        obj2.destroy();
        weed.totalCannabis++;
        //this.good++;
        if(this.doubleScoreSeconds <= 5 && this.doubleScoreSeconds >= 0){
            weed.totalCannabis++;
            this.renderPlusTwo();
            
        }
        else{
            
            this.renderPlusOne(); 
            
        }
        this.secondsElapsed ++;

        this.renderHappyFaceLeft();
      
        
        
    },
    
    garbage_overlapHandler_good: function(obj1, obj2){
        //console.log("Overlapping");
        obj2.destroy();
        weed.totalGarbage++;
        //this.bad++;
        this.renderSadFaceLeft();
        
    
    },
  //----------------------------------------------------------not so good pot overlap handlers------------------------------------------  
    cannabis_overlapHandler_bad: function(obj1, obj2){
        //console.log("Overlapping");
        obj2.destroy();
        weed.good_in_garbage ++;
        //weed.totalCannabis--;
        this.secondsElapsed -= 2;
        this.renderSadFaceRight();
        this.renderMinusTwo();
        
        
                
        
    },
    
    garbage_overlapHandler_bad: function(obj1, obj2){
        //console.log("Overlapping");
        obj2.destroy();
        //this.totalGarbage--;
        weed.bad_in_garbage ++;
        this.renderHappyFaceRight();
    },
//-------------------------------------------------------------END----------------------------------------------------------------//




   

//-----------------------------------------------------------PAUSE SCREEN-------------------------------------------------------------//

    renderPauseButton: function(){
        this.pauseButton = this.add.sprite(75, 75, 'pause_button');
        this.pauseButton.scale.x = 0.3;
        this.pauseButton.scale.y = 0.3;
        this.pauseButton.alpha = 0.5;
        this.pauseButton.anchor.setTo(0.5, 0.5);
        this.pauseButton.inputEnabled = true;
        this.pauseButton.events.onInputUp.add(function(){
            this.pauseButton.alpha = 0.9;
            this.pauseButtonActivated();
            }, this);
    },

    pauseButtonActivated: function(){
        
        //this.game.onPause.add(this.renderPauseMenu, this);
        this.add.tween(this.pauseButton.scale).to({x: 0.4, y: 0.4}, 100, Phaser.Easing.Linear.None, true).onComplete.add(function(){
            this.add.tween(this.pauseButton.scale).to({x: 0.3, y:  0.3}, 100, Phaser.Easing.Linear.None, true).onComplete.add(this.renderPauseMenu, this);
        }, this);
        //this.game.paused = true;
        //this.renderPauseMenu();
        //this.game.input.onDown.add(this.unpauseGame, this);
        this.temp_pause_input_variable = 0;
        
    },

    renderPauseMenu: function(){
        
        this.pauseMenuBackdrop = this.add.sprite(this.world.centerX, this.world.centerY+60, 'pause_backdrop');
        this.pauseMenuBackdrop.anchor.setTo(0.5, 0.5);
        this.pauseMenuBackdrop.scale.x = 0;
        this.pauseMenuBackdrop.scale.y = 0;
        
        /*this.pauseMenuBackdrop = this.add.sprite(this.world.centerX, this.world.centerY, 'ready_screen');
        this.pauseMenuBackdrop.anchor.setTo(0.5, 0.5);
        this.pauseMenuBackdrop.scale.x = 0;
        this.pauseMenuBackdrop.scale.y = 0;*/
        this.pauseMenuBackdrop.alpha = 0.95;
        this.world.bringToTop(this.pauseMenuBackdrop);

        this.add.tween(this.pauseMenuBackdrop.scale).to({x: 1.9, y: 2.0}, 100, Phaser.Easing.Linear.None, true).onComplete.add(function(){ //1.75 1.9
            

            this.pauseMenuTextTokeBreak = this.add.sprite(this.world.centerX, this.world.centerY - 200, 'toke_break_text');
            this.pauseMenuTextTokeBreak.anchor.setTo(0.5, 0.5);
            this.pauseMenuTextTokeBreak.scale.setTo(0.8, 0.9);
            
            this.pauseMenuTextResume = this.add.sprite(this.world.centerX, this.world.centerY-3, 'text_resume');
            this.pauseMenuTextResume.anchor.setTo(0.5, 0.5);
            this.pauseMenuTextResume.scale.x = 0.6;
            this.pauseMenuTextResume.scale.y = 0.6;

            this.pauseMenuTextRestart = this.add.sprite(this.world.centerX, this.world.centerY+143, 'text_restart');
            this.pauseMenuTextRestart.anchor.setTo(0.5, 0.5);
            this.pauseMenuTextRestart.scale.x = 0.6;
            this.pauseMenuTextRestart.scale.y = 0.6;

            this.pauseMenuTextMainMenu = this.add.sprite(this.world.centerX, this.world.centerY+289, 'text_main_menu');
            this.pauseMenuTextMainMenu.anchor.setTo(0.5, 0.5);
            this.pauseMenuTextMainMenu.scale.x = 0.6;
            this.pauseMenuTextMainMenu.scale.y = 0.6;

            this.game.paused = true;
            this.game.input.onDown.add(this.unpauseGame, this);
            
        }, this);

    },

    unpauseGame: function(event){
        
        if(this.temp_pause_input_variable == 0){
            var x = event.x;
            var y = event.y;
            
        }
        if(this.temp_pause_input_variable != 0){
            x = 0;
            y = 0;
        }
        /*console.log(x);
        console.log(y);*/
        if((x <= 457 && x >= 223 && y <= 640 && y >= 560) || (x <= 115 && x >= 30 && y <= 113 && y >= 37)){
            this.pauseMenuTextResume.destroy();
            this.pauseMenuTextRestart.destroy();
            this.pauseMenuTextMainMenu.destroy();
            this.pauseMenuBackdrop.destroy();
            this.pauseMenuTextTokeBreak.destroy();
            this.game.paused = false;
            this.temp_pause_input_variable ++;
        }

        else if(x <= 457 && x >= 223 && y <= 777 && y >= 712){
            this.pauseMenuTextResume.destroy();
            this.pauseMenuTextRestart.destroy();
            this.pauseMenuTextMainMenu.destroy();
            this.pauseMenuBackdrop.destroy();
            this.pauseMenuTextTokeBreak.destroy();
            this.game.paused = false;


            this.playGameAudio.stop();
            this.playGameAudio = null;

            this.BG = null;
            this.preBG = null;
            this.empty_bin1 = null;
            this.empty_bin2 = null;
            this.plusOneText = null;
            this.minusTwoText = null;
            this.readyScreen = null;
            this.readyText = null;
            this.readyNumber = null;
            this.unitsPlace = null;
            this.tensPlace = null;
            this.hundredsPlace = null;
            
            this.smilingFaceLeft = null;
            this.smilingFaceRight = null;
            this.sadFaceLeft = null;
            this.sadFaceRight = null;
            this.happyFace = null;

            
            this.overmessage;       // game over text
            this.secondsElapsed = 15;   // counter for incrementing seconds
            this.timer;             // phaser timer to keep track of seconds elapsed
            this.t = null;
            this.t_counter = 0;
            this.counter_1_for_updateTimerDependentCalls = 0;
            this.renderPowerUpsTimer = 100;
            


            this.doubleScoreSeconds = -1;
            this.stopTimerSignal = false;
            this.stopTimerCounter = -1;
            this.powerSelector = 0;
            this.doubleScoreLeaf = null;
            this.stopTimerLeaf = null;
            this.doubleScoreActivated = false;
            this.minusFourActivated = false;
            this.stopTimerActivated = false;
            this.doubleBonusSignal = false;
            this.speedOfPowerUpSprites = 350;
            this.callRenderGameOverScreenOnce = 0;
            this.temp_pause_input_variable = 0;
            
            weed.totalCannabis = 0;
            weed.totalGarbage = 0;
            weed.good_in_garbage = 0;
            weed.bad_in_garbage = 0;

            this.state.start('PlayGame');
        }

        else if(x <= 508 && x >= 175 && y <= 928 && y >= 858){
            

            this.pauseMenuTextResume.destroy();
            this.pauseMenuTextRestart.destroy();
            this.pauseMenuTextMainMenu.destroy();
            this.pauseMenuBackdrop.destroy();
            this.pauseMenuTextTokeBreak.destroy();
            this.game.paused = false;
            this.playGameShutDown();
            weed.totalCannabis = 0;
            weed.totalGarbage = 0;
            weed.good_in_garbage = 0;
            weed.bad_in_garbage = 0;
            this.state.start('MainMenu');

           
        
            /*this.playGameShutDown();
            weed.totalCannabis = 0;
            weed.totalGarbage = 0;
            weed.good_in_garbage = 0;
            weed.bad_in_garbage = 0;


            this.state.start('MainMenu');*/
        }
        
    },




//---------------------------------------------------------------END------------------------------------------------------------------//



//------------------------------------------------------------GAME OVER SCREEN---------------------------------------------------//
    renderGameOverScreen: function(){
        this.gameOverBackdrop = this.add.sprite(this.world.centerX, this.world.centerY+60, 'pause_backdrop');
        this.gameOverBackdrop.anchor.setTo(0.5, 0.5);
        this.gameOverBackdrop.scale.x = 0;
        this.gameOverBackdrop.scale.y = 0;
        this.gameOverBackdrop.alpha = 0.95;
        this.input.disabled = true;
        this.world.bringToTop(this.gameOverBackdrop);
        this.add.tween(this.gameOverBackdrop.scale).to({x: 1.9, y: 2.0}, 500, Phaser.Easing.Linear.None, true).onComplete.add(function(){
            this.gameOverText = this.add.sprite(this.world.centerX, this.world.centerY+60, 'game_over_text');
            this.gameOverText.scale.x = 0.8;
            this.gameOverText.scale.y = 0.8;
            this.gameOverText.anchor.setTo(0.5, 0.5);
            this.gameOverText.alpha = 0;
            this.add.tween(this.gameOverText).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true).onComplete.add(function(){
                var volume = 0;
                var i = 0.2;
                this.time.events.repeat(20, 40, function(){
                
                    if(i != 0 && this.playGameAudio != null){
                        this.playGameAudio.volume = i;
                        i = i-0.01;

                    }
                    if(i <= 0 && this.playGameAudio != null){
                        //console.log('reached here');
                        this.playGameAudio.volume = 0;
                        this.playGameShutDown();
                        this.input.disabled = false;
                        this.state.start('PostGame');

                }
            }, this);}, this);
            //this.state.start('PostGame');
        }, this);

    },



//---------------------------------------------------------END--------------------------------------------------------------//


//---------------------------------------score and time check-----------------------------------------------------------------------
    check: function()
    {
        
        
        
        
        
        if(this.secondsElapsed < 0 && this.callRenderGameOverScreenOnce == 0){
            

            
            this.renderGameOverScreen();
            this.callRenderGameOverScreenOnce++;
            //this.state.start('PostGame');
            
        }
        
        
        if(weed.totalCannabis > 10000000)
            this.state.start('MainMenu');
        
    },
//-----------------------------------------END-----------------------------------------------------------------------//


//------------------------------------------------SHUT DOWN FUNCTION------------------------------------------------------------//
    playGameShutDown: function(){
        
        if(this.smilingFaceLeft != null){
            this.smilingFaceLeft.destroy();
        }
        if(this.smilingFaceRight != null){
            this.smilingFaceRight.destroy();
        }
        if(this.sadFaceLeft != null){
            this.sadFaceLeft.destroy();
        }
        if(this.sadFaceRight != null){
            this.sadFaceRight.destroy();
        }
        if(this.happyFaceLeft != null){
            this.happyFaceLeft.destroy();
        }
        if(this.happyFaceRight != null){
            this.happyFaceRight.destroy();
        }

        this.smilingFaceLeft = null;
        this.smilingFaceRight = null;
        this.sadFaceLeft = null;
        this.sadFaceRight = null;
        this.happyFaceLeft = null;
        this.happyFaceRight = null;

        
        if(this.stopTimerAudio != null){
            this.stopTimerAudio.stop();
            this.stopTimerAudio = null;
        }





        this.readyScreen.destroy();
        this.readyText.destroy();
        this.readyNumber.destroy();
        if(this.unitsPlace != null){
            this.unitsPlace.destroy();
        }
        if(this.unitsPlaceTween != null){
            this.unitsPlaceTween.onComplete.removeAll();
            this.unitsPlaceTween.stop();
        }
        this.unitsPlaceTween = null;
        if(this.tensPlaceTween != null){
            this.tensPlaceTween.onComplete.removeAll();
            this.tensPlaceTween.stop();
        }
        this.tensPlaceTween = null;
        if(this.tensPlace != null){
            this.tensPlace.destroy();
        }
        if(this.plusOneText != null){
            this.plusOneText.destroy();
        }
        this.plusOneText = null;
        
        this.readyScreen = null;
        this.readyText = null;
        this.readyNumber = null;
        this.unitsPlace = null;
        this.tensPlace = null;
        this.hundredsPlace = null;
        
        
        
        this.overmessage;       // game over text
        this.secondsElapsed = 15;   // counter for incrementing seconds
        this.timer;             // phaser timer to keep track of seconds elapsed
        this.t = null;
        this.t_counter = 0;
        this.counter_1_for_updateTimerDependentCalls = 0;
        this.renderPowerUpsTimer = 100;
        this.temp_pause_input_variable = 0;
        

        if(this.doubleScoreLeaf != null){
            this.doubleScoreLeaf.destroy();
        }
        if(this.powerDoubleBonusAnimation != null){
            this.powerDoubleBonusAnimation.destroy();
        }
        if(this.randomMovementDoubleScoreLeaf != null){
            this.randomMovementDoubleScoreLeaf.onComplete.removeAll();
            this.randomMovementDoubleScoreLeaf.stop();
        }
        if(this.minusFourLeaves != null){
            this.minusFourLeaves.destroy();
        }
        if(this.stopTimerLeaf != null){
            this.stopTimerLeaf.destroy();
        }
        if(this.randomMovementStopTimerLeaf != null){
            this.randomMovementStopTimerLeaf.onComplete.removeAll();
            this.randomMovementStopTimerLeaf.stop();
        }
        if(this.powerStopTimerAnimation != null){
            this.powerStopTimerAnimation.destroy();
        }
        if(this.pauseButton != null){
            this.pauseButton.destroy();
        }

        this.pauseButton = null;
        this.doubleScoreSeconds = -1;
        this.stopTimerSignal = false;
        this.stopTimerCounter = -1;
        this.powerSelector = 0;
        this.doubleScoreLeaf = null;
        this.powerDoubleBonusAnimation = null;
        this.randomMovementDoubleScoreLeaf = null;
        this.minusFourLeaves = null;
        this.stopTimerLeaf = null;
        this.randomMovementStopTimerLeaf = null;
        this.powerStopTimerAnimation = null;
        this.doubleScoreActivated = false;
        this.minusFourActivated = false;
        this.stopTimerActivated = false;
        this.doubleBonusSignal = false;
        this.speedOfPowerUpSprites = 350;
        this.callRenderGameOverScreenOnce = 0; 


        if(this.cannabisLeaves != null){
            this.cannabisLeaves.destroy();
        }
        if(this.garbageLeaves != null){
            this.garbageLeaves.destroy();
        }
        if(this.minusFourLeaves != null){
            this.minusFourLeaves.destroy();
        }
        
        this.cannabisLeaves = null;
        this.garbageLeaves = null;
        this.minusFourLeaves = null;

        if(this.playGameAudio != null){
            this.playGameAudio.stop();
            this.playGameAudio = null;
        }

        if(this.gameOverBackdrop != null){
            this.gameOverBackdrop.destroy();
        }
        if(this.gameOverText != null){
            this.gameOverText.destroy();
        }
        this.gameOverBackdrop = null;
        this.gameOverText = null;

        if(this.empty_bin1 != null){
            this.empty_bin1.destroy();
        }
        if(this.empty_bin2 != null){
            this.empty_bin2.destroy();
        }
        if(this.empty_bin1_half != null){
            this.empty_bin1_half.destroy();
        }
        if(this.empty_bin1_full != null){
            this.empty_bin1_full.destroy();
        }
        if(this.empty_bin2_half != null){
            this.empty_bin2_half.destroy();
        }
        if(this.empty_bin2_full != null){
            this.empty_bin2_full.destroy();
        }
        if(this.empty_bin1_collision != null){
            this.empty_bin1_collision.destroy();
        }
        if(this.empty_bin2_collision != null){
            this.empty_bin2_collision.destroy();
        }
        this.empty_bin1 = null;
        this.empty_bin2 = null;
        this.empty_bin1_collision = null;
        this.empty_bin1_full = null;
        this.empty_bin1_half = null;
        this.empty_bin2_collision = null;
        this.empty_bin2_full = null;
        this.empty_bin2_half = null;

        if(this.BG != null){
            this.BG.destroy();
        }
        this.BG = null;
        if(this.preBG != null){
            this.preBG.destroy();
        }    
        this.preBG = null;


        
    }

//--------------------------------------------------------END------------------------------------------------//
   
};

//-------------------------------------------------------------------------END OF CODE-------------------------------------------------//