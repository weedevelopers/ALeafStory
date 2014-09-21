
var weed = {
    totalCannabis: 0,
    totalGarbage: 0,
    good_in_garbage: 0,
    bad_in_garbage: 0
};        // creates an object/class of type Bunny Defender

weed.Boot = function(game) {

};

weed.Boot.prototype = {                 // to make methods preload(),create() etc available to all objects of bunnyDefender
	
	preload: function() 
    {                                          
        this.stage.backgroundColor = '#FFFFFF';
        
        this.load.image('leaf', 'images/Mobile/assets/menu_sprite/alternate/Cannabis_Leafs_clip_art_medium.png');
        this.load.image('prebackground', 'images/Mobile/assets/menu_sprite/preload.png');
        this.load.image('background', 'images/Mobile/assets/menu_sprite/background_edited_for_desktop.png');

        this.load.image('bubble_blue','images/Mobile/assets/menu_sprite/alternate/help.png');
        this.load.image('bubble_green','images/Mobile/assets/menu_sprite/alternate/play.png');
        this.load.image('bubble_yellow','images/Mobile/assets/menu_sprite/alternate/high_score.png');
        
        this.load.image('leaves', 'images/Mobile/assets/menu_sprite/falling_leaf.png');
        
        
        this.load.image('sound_on', 'images/Mobile/assets/game_sprites/final/sound_on.png');
        this.load.image('sound_off', 'images/Mobile/assets/game_sprites/final/sound_off.png');
        this.load.image('text_leaf', 'images/Mobile/assets/game_sprites/final/leaf.png');
        this.load.image('text_a', 'images/Mobile/assets/game_sprites/final/a.png');
        this.load.image('text_story', 'images/Mobile/assets/game_sprites/final/story.png');
        this.load.image('about', 'images/Mobile/assets/game_sprites/final/about.png');

        this.load.image('seed1', 'images/Mobile/assets/game_sprites/final/seed_1.png');
        this.load.image('seed2', 'images/Mobile/assets/game_sprites/final/seed_2.png');
        this.load.image('seed3', 'images/Mobile/assets/game_sprites/final/seed_3.png');
        this.load.image('game_leaf1', 'images/Mobile/assets/game_sprites/final/leaf_1.png');
        this.load.image('game_leaf2', 'images/Mobile/assets/game_sprites/final/leaf_2.png');
        this.load.image('game_leaf3', 'images/Mobile/assets/game_sprites/final/leaf_3.png');
        this.load.image('game_leaf4', 'images/Mobile/assets/game_sprites/final/leaf_4.png');
        this.load.image('game_leaf5', 'images/Mobile/assets/game_sprites/final/leaf_5.png');
        this.load.image('game_leaf6', 'images/Mobile/assets/game_sprites/final/leaf_6.png');
        this.load.image('game_leaf7', 'images/Mobile/assets/game_sprites/final/leaf_7.png');
        this.load.image('game_leaf8', 'images/Mobile/assets/game_sprites/final/leaf_8.png');
        this.load.image('game_leaf_cannabis1', 'images/Mobile/assets/game_sprites/final/cannabis_1.png');
        this.load.image('game_leaf_cannabis2', 'images/Mobile/assets/game_sprites/final/cannabis_2.png');
        this.load.image('empty_bin', 'images/Mobile/assets/game_sprites/final/pot_empty.png');
        this.load.image('empty_bin_collision', 'images/Mobile/assets/game_sprites/final/pot_empty_collision.png');
        this.load.image('goodstuff', 'images/Mobile/assets/game_sprites/final/goodstuff.png');
        this.load.image('notsogoodstuff', 'images/Mobile/assets/game_sprites/final/notsogood.png');
        this.load.image('cannabis_full_bin', 'images/Mobile/assets/game_sprites/final/pot_cannabis_full.png');
        this.load.image('cannabis_half_bin', 'images/Mobile/assets/game_sprites/final/pot_cannabis_half.png');
        this.load.image('garbage_half_bin', 'images/Mobile/assets/game_sprites/final/pot_garbage_half.png');
        this.load.image('garbage_full_bin', 'images/Mobile/assets/game_sprites/final/pot_garbage_full.png');
        this.load.image('ready_screen', 'images/Mobile/assets/game_sprites/final/ready.png');
        
        this.load.image('ready_text_new', '/images/Mobile/assets/game_sprites/final/ready_text_new.png');
        this.load.image('go_text_new', '/images/Mobile/assets/game_sprites/final/go_text_new.png');
        this.load.image('zero', 'images/Mobile/assets/game_sprites/final/zero.png');
        this.load.image('one', 'images/Mobile/assets/game_sprites/final/one.png');
        this.load.image('two', 'images/Mobile/assets/game_sprites/final/two.png');
        this.load.image('three', 'images/Mobile/assets/game_sprites/final/three.png');
        this.load.image('four', 'images/Mobile/assets/game_sprites/final/four.png');
        this.load.image('five', 'images/Mobile/assets/game_sprites/final/five.png');
        this.load.image('six', 'images/Mobile/assets/game_sprites/final/six.png');
        this.load.image('seven', 'images/Mobile/assets/game_sprites/final/seven.png');
        this.load.image('eight', 'images/Mobile/assets/game_sprites/final/eight.png');
        this.load.image('nine', 'images/Mobile/assets/game_sprites/final/nine.png');
        this.load.image('zero_yellow', 'images/Mobile/assets/game_sprites/final/zero_yellow.png');
        this.load.image('one_yellow', 'images/Mobile/assets/game_sprites/final/one_yellow.png');
        this.load.image('two_yellow', 'images/Mobile/assets/game_sprites/final/two_yellow.png');
        this.load.image('three_yellow', 'images/Mobile/assets/game_sprites/final/three_yellow.png');
        this.load.image('four_yellow', 'images/Mobile/assets/game_sprites/final/four_yellow.png');
        this.load.image('five_yellow', 'images/Mobile/assets/game_sprites/final/five_yellow.png');
        this.load.image('happy', 'images/Mobile/assets/game_sprites/final/expressions/happy.png');
        this.load.image('smile', 'images/Mobile/assets/game_sprites/final/expressions/smile.png');
        this.load.image('sad', 'images/Mobile/assets/game_sprites/final/expressions/sad.png');
        
        this.load.image('double_score_leaf', 'images/Mobile/assets/game_sprites/final/double_score_leaf.png');
        this.load.image('minus_four_leaf', 'images/Mobile/assets/game_sprites/final/minus_four_power.png');
        this.load.image('stop_timer_leaf', 'images/Mobile//assets/game_sprites/final/timer_stop_leaf.png');
        this.load.image('two_x_sprite', 'images/Mobile/assets/game_sprites/final/two_x_sprite.png');
        this.load.image('stop_timer_sprite', 'images/Mobile/assets/game_sprites/final/stop_timer_sprite.png');
        this.load.image('pause_button', 'images/Mobile/assets/game_sprites/final/pause_button.png');
       // this.load.image('temp_backdrop', 'images/Mobile/assets/game_sprites/backdrop_glass_placement.png');
        this.load.image('text_restart', 'images/Mobile/assets/game_sprites/final/restart.png');
        this.load.image('text_resume', 'images/Mobile/assets/game_sprites/final/resume.png');
        this.load.image('text_main_menu', 'images/Mobile/assets/game_sprites/final/main_menu.png');
        this.load.image('pause_pointer_box', 'images/Mobile/assets/game_sprites/final/pointer_box.png');
        this.load.image('pause_backdrop', 'images/Mobile/assets/game_sprites/final/backdrop_glass.png');

        this.load.image('score_sprite','images/Mobile/assets/game_sprites/final/score.png');
        this.load.image('bucket_left','images/Mobile/assets/game_sprites/final/bucket_left.png');
        this.load.image('bucket_right','images/Mobile/assets/game_sprites/final/bucket_right.png');
        
        this.load.image('zero_green', 'images/Mobile/assets/game_sprites/final/zero_green.png');
        this.load.image('one_green', 'images/Mobile/assets/game_sprites/final/one_green.png');
        this.load.image('two_green', 'images/Mobile/assets/game_sprites/final/two_green.png');
        this.load.image('three_green', 'images/Mobile/assets/game_sprites/final/three_green.png');
        this.load.image('four_green', 'images/Mobile/assets/game_sprites/final/four_green.png');
        this.load.image('five_green', 'images/Mobile/assets/game_sprites/final/five_green.png');
        this.load.image('six_green', 'images/Mobile/assets/game_sprites/final/six_green.png');
        this.load.image('seven_green', 'images/Mobile/assets/game_sprites/final/seven_green.png');
        this.load.image('eight_green', 'images/Mobile/assets/game_sprites/final/eight_green.png');
        this.load.image('nine_green', 'images/Mobile/assets/game_sprites/final/nine_green.png');
        
        this.load.image('zero_red', 'images/Mobile/assets/game_sprites/final/zero_red.png');
        this.load.image('one_red', 'images/Mobile/assets/game_sprites/final/one_red.png');
        this.load.image('two_red', 'images/Mobile/assets/game_sprites/final/two_red.png');
        this.load.image('three_red', 'images/Mobile/assets/game_sprites/final/three_red.png');
        this.load.image('four_red', 'images/Mobile/assets/game_sprites/final/four_red.png');
        this.load.image('five_red', 'images/Mobile/assets/game_sprites/final/five_red.png');
        this.load.image('six_red', 'images/Mobile/assets/game_sprites/final/six_red.png');
        this.load.image('seven_red', 'images/Mobile/assets/game_sprites/final/seven_red.png');
        this.load.image('eight_red', 'images/Mobile/assets/game_sprites/final/eight_red.png');
        this.load.image('nine_red', 'images/Mobile/assets/game_sprites/final/nine_red.png');
        
        this.load.image('joint', 'images/Mobile/assets/game_sprites/final/joint.png');
        this.load.image('stoned_smiley', 'images/Mobile/assets/game_sprites/final/stoned_smiley.png');
        this.load.image('goodstuff' , 'images/Mobile/assets/game_sprites/final/goodstuff.png');
        this.load.image('notso_goodstuff' , 'images/Mobile/assets/game_sprites/final/notsogood.png');
        this.load.image('bonus' , 'images/Mobile/assets/game_sprites/final/bonus.png');
        this.load.image('totalscore_screen', 'images/Mobile/assets/game_sprites/final/backdrop_glass.png');
        this.load.image('exclaimation', 'images/Mobile/assets/game_sprites/final/exclaimation.png');
        this.load.image('joint', 'images/Mobile/assets/game_sprites/final/joint.png');
        this.load.image('smiley_joint', 'images/Mobile/assets/game_sprites/final/stoned_smiley.png');
        this.load.image('button_right', 'images/Mobile/assets/game_sprites/final/button_right.png');
        this.load.image('button_left', 'images/Mobile/assets/game_sprites/final/button_left.png');
        this.load.image('highscore_text_right', 'images/Mobile/assets/game_sprites/final/highscore_text_left.png');
        this.load.image('highscore_text_left', 'images/Mobile/assets/game_sprites/final/highscore_text_right.png');
        this.load.image('plus', 'images/Mobile/assets/game_sprites/final/plus.png');
        this.load.image('game_over_text', 'images/Mobile/assets/game_sprites/final/game_over_text.png')
        
    },

	create: function() 
    {
        
		this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = false; // pause game on tab change
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.minWidth = 270;
		this.scale.minHeight = 480;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.stage.forcePortrait = true;  // force portrait mode
		this.scale.setScreenSize(true);  // true will force screen resize no matter what
        this.input.addPointer();
		
	    
        this.state.start('MainMenu');     // launches preloader from Boot.js         
    }
	
};
