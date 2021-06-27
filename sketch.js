// Name       : Minjae Yoo, Minki Cho
// Assignment : Final Project - Make a Game
// Course     : CS099
// Spring 2021

//wall
let line_size = 100;
let game_wall;

//ai
let ai_1, ai_2, ai_3, ai_4;

//game_mode
let game_mode;
const MAIN_MENU = 0;
const GAME_START = 1;
const CREDIT = 2;
const INTERMISSION = 3;
const GAME_OVER = 4;
const HOW_TO_PLAY = 5;
const STORY = 6;

//bullet_zombie_distance
let x_dis;
let y_dis;
let distance;

//score
let score = 0;

//damage
const gun_damage = 1; //originally 1

//preload hit sound
let hit_sound;

//left bullet
let left_bullet_img;

//ai_bullet
let ai_bullets = [];
let ai_bullet_1 = new Array;
let ai_bullet_2 = new Array;
let ai_bullet_3 = new Array;
let ai_bullet_4 = new Array;

//check for it is okay for next day.
let ready_for_day1 = false;
let ready_for_day2 = false;
let ready_for_day3 = false;
let ready_for_day4 = false;
let ready_for_day5 = false;
let ready_for_day_final = false;

//frameCount works when game_mode is GAME_START from 0
let count_start = false;

//player gun magazine
let player_gun_bullet = 7;
//day1,2,3,4 img
let day1_img, day2_img, day3_img, day4_img, day5_img;

//check AI is picked or not once
let ai_picked = false;

//This is for ai_bullet 
let ai_1_isShoot = true;
let ai_2_isShoot = true;
let ai_3_isShoot = true;
let ai_4_isShoot = true;

let scoreBox_img;

let ai_picked_img;
let will_img;

function preload()
{
    bullet_preload();
    zombie_image_preload();
    font_preload();
    preload_wall();
    preload_characters();
    ai_image_preload();
    day_fadeout_img_preload();
    game_over_preload();
    howToPlay_preload();
    fadeout_preload();
    arrow_preload();
    hit_sound = loadSound( 'assets/sounds/hit_2.wav' );
    left_bullet_img = loadImage( 'assets/images/left_bullet.png' );
    textBox4_img = loadImage( 'assets/images/game_background/textbox4.png' );
    ai_picked_img = loadImage( 'assets/images/player_and_ai/ai_focus.png');
    will_img = loadImage('assets/images/game_background/will.png');
    scoreBox_img = loadImage('assets/images/game_background/scorebox.png');
}

function setup()
{
    createCanvas( 1000, 500 );
    frameRate( 60 );
    //game's default is main_menu
    game_mode = MAIN_MENU;

    //Make wall
    game_wall = new Wall();

    //ai
    //ai = new draw_ai();
    ai_1 = new draw_ai_1();
    ai_2 = new draw_ai_2();
    ai_3 = new draw_ai_3();
    ai_4 = new draw_ai_4();

    zombie_day1_setup();
    zombie_day2_setup();
    zombie_day3_setup();
    zombie_day4_setup();
    zombie_day5_setup();
    zombie_final_setup();

    player_gun_bullet = 7;

    ready_for_day1 = false;
    ready_for_day2 = false;
    ready_for_day3 = false;
    ready_for_day4 = false;
    ready_for_day5 = false;
    ready_for_day_final = false;

    ai_1_survived = true;
    ai_2_survived = true;
    ai_3_survived = true;
    ai_4_survived = true;
    ai_1_isShoot = true;
    ai_2_isShoot = true;
    ai_3_isShoot = true;
    ai_4_isShoot = true;

    //ai_damage setup
    ai_1_damage = round( random( 0.5, 1 ), 1 );
    ai_2_damage = round( random( 0.5, 1 ), 1 );
    ai_3_damage = round( random( 0.5, 1 ), 1 );
    ai_4_damage = round( random( 0.5, 1 ), 1 );

    //ai_rate_of_fire
    ai_1_speed = int( random( 10, 30 ) );
    ai_2_speed = int( random( 10, 30 ) );
    ai_3_speed = int( random( 10, 30 ) );
    ai_4_speed = int( random( 10, 30 ) );

    //fadeout reset
    screen_transparency = 0;
    final_day_screen_transparency = 0;
    text_transparency = 250;
    day1_transparency = 255;
    day2_transparency = 255;
    day3_transparency = 255;
    day4_transparency = 255;
    day5_transparency = 255;
    text_y_pos2 = 500
}

function draw()
{
    background( 110 );
    console.log(ai_1_speed)
    //console.log(( frameCount * ai_1_speed ) % 60 )

    let zombie_day1_length = zombies_day1_wave1.length + zombies_day1_wave2.length + zombies_day1_wave3.length +
        zombies_day1_wave4.length + zombies_day1_wave5.length + zombies_day1_wave6.length + zombies_day1_wave7.length +
        zombies_day1_wave8.length + zombies_day1_wave9.length + zombies_day1_wave10;
    let zombie_day2_length = zombies_day2_wave1.length + zombies_day2_wave2.length + zombies_day2_wave3.length +
        zombies_day2_wave4.length + zombies_day2_wave5.length + zombies_day2_wave6.length + zombies_day2_wave7.length +
        zombies_day2_wave8.length + zombies_day2_wave9.length + zombies_day2_wave10.length;
    let zombie_day3_length = zombies_day3_wave1.length + zombies_day3_wave2.length + zombies_day3_wave3.length +
        zombies_day3_wave4 + zombies_day3_wave5.length + zombies_day3_wave6.length + zombies_day3_wave7.length +
        zombies_day3_wave8.length + zombies_day3_wave9.length + zombies_day3_wave10.length;
    let zombie_day4_length = zombies_day4_wave1.length + zombies_day4_wave2.length + zombies_day4_wave3.length +
        zombies_day4_wave4 + zombies_day4_wave5.length + zombies_day4_wave6.length + zombies_day4_wave7.length +
        zombies_day4_wave8.length + zombies_day4_wave9.length + zombies_day4_wave10.length;
    let zombie_day5_length = zombies_day5_wave1.length + zombies_day5_wave2.length + zombies_day5_wave3.length +
        zombies_day5_wave4 + zombies_day5_wave5.length + zombies_day5_wave6.length + zombies_day5_wave7.length +
        zombies_day5_wave8.length + zombies_day5_wave9.length + zombies_day5_wave10.length;
    let zombie_day_final_length = zombies_final_wave1 + zombies_final_wave2 + zombies_final_wave3 +
        zombies_final_wave4 +
        zombies_final_wave5 + zombies_final_wave6 + zombies_final_wave7 + zombies_final_wave8 + zombies_final_wave9 +
        zombies_final_wave10;

    if ( game_mode == MAIN_MENU )
    {
        main_menu();
    }

    if ( game_mode == HOW_TO_PLAY )
    {
        howToPlay();
    }

    if ( game_mode == CREDIT )
    {
        credit();
    }

    if ( game_mode == STORY )
    {
        story();
    }

    if ( game_mode == GAME_START )
    {
        count_start = true; //start frameCount
        ready_for_day1 = true;

        imageMode( CORNER );

        //change background per day
        if ( zombie_day1_length != 0 )
        {
            background( bg );
        }
        else if ( zombie_day2_length != 0 )
        {
            background( bg1 );
        }
        else if ( zombie_day3_length != 0 )
        {
            background( bg2 );
        }
        else if ( zombie_day4_length != 0 )
        {
            background( bg2 );
        }
        else if ( zombie_day5_length != 0 )
        {
            background( bg3 );
        }
        else if ( zombie_day_final_length != 0 )
        {
            background( bg4 );
        }

        //draw alines and wall of game_background class
        drawing_lines_characters();
        //drawing_wall();
        game_wall.draw();
        //ball_fire
        bullet_setoff();
        //bullet_fire_delay
        if ( delay < delay_time )
        {
            delay++;
        }
        //remove mouse_cursor
        noCursor();
        //ai.draw();
        ai_1.draw();
        ai_2.draw();
        ai_3.draw();
        ai_4.draw();

        zombie_day1_draw();
        ai_bullet_setoff();
        bullet_check();
        //print the score in canvas.
        push();
        fill('black');
        textSize( 12 );
        image(scoreBox_img,width-150, 10);
        text( " Your score is " + score + " !", width - 200, 20 );
        pop();
        if ( zombies_day1_wave1 != 0 )
        {
            day1_fadeout_img();
        }

        //crosshair above zombies
        crosshair();
    }
    else
    {
        count_start = false;
    }

    //frameCount works only at the GAME_START screen
    if ( count_start === false )
    {
        frameCount = 0;
    }

    //reload_check
    if ( reload_check == true )
    {
        reload_time--;
    }
    if ( reload_time == 0 )
    {
        reload_time = fixed_reload_time;
        reload_check = false;
        player_gun_bullet = 7;
    }

    if ( game_mode == GAME_OVER )
    {
        if ( !ready_for_day_final )
        {
            game_over();
        }
        else
        {
            game_ending();
        }
    }
    else
    {
        tint_value = 0;
    }


    //if there are no zombie on day1 then day2 start!
    if ( zombie_day1_length <= 0 && game_mode != GAME_OVER )
    {
        game_mode = INTERMISSION;
        if ( !ready_for_day2 && game_mode == INTERMISSION )
        {
            //clear();
            //game_mode = INTERMISSION;
            cursor();
            imageMode( CORNER );
            background( bg );
            screen_transparency = 0;
            if ( ai_picked == false )
            {
                push();
                image(textBox4_img, width / 3-5, height / 2 - 70);
                textSize( 20 );
                fill( "black" )
                text( " Choose one survivor to sacrifice to survive your next day.", width / 3, height / 2);
                pop();
                pick_ai();
                pick_and_ban();
            }
            else
            {
                clear();
                push();
                background( 110 );
                textSize( 13 );
                textAlign( CENTER );
                text( "Move on to the next day.", 900, 480 );
                pop();
                ai_last_word();
                intermission_arrow();
            }
        }
        if ( ready_for_day2 )
        {
            //game_mode = GAME_START;
            fadeout();
            if ( screen_transparency == 255 )
            {
                game_mode = GAME_START;
                day2_fadeout_img();
                zombie_day2_draw();
            }
        }
    }

    if ( zombie_day2_length <= 0 && game_mode != GAME_OVER )
    {
        game_mode = INTERMISSION;
        if ( !ready_for_day3 && game_mode == INTERMISSION )
        {
            //clear();
            //game_mode = INTERMISSION;
            cursor();
            imageMode( CORNER );
            background( bg1 );
            screen_transparency = 0;
            if ( ai_picked == false )
            {
                push();
                image(textBox4_img, width / 3-5, height / 2 - 70);
                textSize( 20 );
                fill( "black" );
                text( " Choose one survivor to sacrifice to survive your next day.", width / 3, height / 2 );
                pop();
                pick_ai();
                pick_and_ban();
            }
            else
            {
                clear();
                push();
                background( 110 );
                textSize( 13 );
                textAlign( CENTER );
                text( "Move on to the next day.", 900, 480 );
                pop();
                ai_last_word();
                intermission_arrow()
            }
        }
        if ( ready_for_day3 )
        {
            fadeout();
            if ( screen_transparency == 255 )
            {
                game_mode = GAME_START;
                day3_fadeout_img();
                zombie_day3_draw();
            }
        }
    }

    if ( zombie_day3_length <= 0 && game_mode != GAME_OVER )
    {
        game_mode = INTERMISSION;
        if ( !ready_for_day4 )
        {
            //clear();
            //game_mode = INTERMISSION;
            cursor();
            imageMode( CORNER );
            background( bg2 );
            screen_transparency = 0;
            if ( ai_picked == false && game_mode == INTERMISSION )
            {
                push();
                image(textBox4_img, width / 3-5, height / 2 - 70);
                textSize( 20 );
                fill( "black" )
                text( " Choose one survivor to sacrifice to survive your next day.", width / 3, height / 2 );
                pop();
                pick_ai();
                pick_and_ban();
            }
            else
            {
                clear();
                push();
                background( 110 );
                textSize( 13 );
                textAlign( CENTER );
                text( "Move on to the next day.", 900, 480 );
                pop();
                ai_last_word();
                intermission_arrow()
            }
        }
        if ( ready_for_day4 )
        {
            fadeout();
            if ( screen_transparency == 255 )
            {
                game_mode = GAME_START;
                day4_fadeout_img();
                zombie_day4_draw();
            }
        }
    }

    if ( zombie_day4_length <= 0 && game_mode != GAME_OVER )
    {
        game_mode = INTERMISSION;
        if ( !ready_for_day5 )
        {
            //clear();
            //game_mode = INTERMISSION;
            cursor();
            imageMode( CORNER );
            background( bg2 );
            screen_transparency = 0;
            if ( ai_picked == false && game_mode == INTERMISSION )
            {
                push();
                image(textBox4_img, width / 3-5, height / 2 - 70);
                textSize( 20 );
                fill( "black" )
                text( " Choose one survivor to sacrifice to survive your next day.", width / 3, height / 2 );
                pop();
                pick_ai();
                pick_and_ban();
            }
            else
            {
                clear();
                push();
                background( 110 );
                textSize( 13 );
                textAlign( CENTER );
                text( "Move on to the next day.", 900, 480 );
                pop();
                ai_last_word();
                intermission_arrow()
            }
        }
        if ( ready_for_day5 )
        {
            fadeout();
            if ( screen_transparency == 255 )
            {
                game_mode = GAME_START;
                day5_fadeout_img();
                zombie_day5_draw();
            }
        }
    }
    if ( zombie_day5_length <= 0 && game_mode != GAME_OVER )
    {
        game_mode = INTERMISSION;
        if ( !ready_for_day_final )
        {
            //clear();
            //game_mode = INTERMISSION;
            cursor();
            imageMode( CORNER );
            background( bg3 );
            if ( ai_picked == false && game_mode == INTERMISSION )
            {
                ai_picked = true;
                push();
                image(textBox4_img, width / 3-5, height / 2 - 70);
                textSize( 20 );
                fill( "black" )
                text( "Choose one survivor to sacrifice to survive your next day.", width / 3, height / 2 );
                pop();
                pick_ai();
                pick_and_ban();
            }
            else
            {
                clear();
                push();
                background( 110 );
                textSize( 13 );
                textAlign( CENTER );
                text( "Move on to the next day.", 900, 480 );
                pop();
                ai_last_word();
                intermission_arrow()
            }
        }
        if ( ready_for_day_final )
        {
            final_day_fadeout();
            if ( final_day_screen_transparency == 255 )
            {
                game_mode = GAME_START;
                zombie_final_draw();
            }
        }
    }
}

function bullet_check()
{
    for ( let i = 0; i < player_gun_bullet; i++ )
    {
        image( left_bullet_img, 30, height / 2 + i * 3 );
        //circle(40,height/2+i*3,5);
    }
    if ( player_gun_bullet == 0 )
    {
        push();
        textSize( 10 );
        textAlign( CENTER );
        text( "press r to reload!", 40, height / 2 + 30 );
        pop();
    }
}

function ai_last_word()
{
    push();
    textSize( 20 );
    image(will_img,width/2-10,5);
    if ( ai_1_survived == false )
    {
        image( ai_img, 100,430 );
        fill("red");
        text("dead",100, 430);
        fill("black");
        text( "Lyon: Please tell my family my death.", width / 2, 90 );
    }
    if ( ai_2_survived == false )
    {
        image( ai2_img, 200, 430 )
        fill("red");
        text("dead",200, 430);
        fill("black");;
        text( "Elon: Do not make my death wasted...", width / 2, 120 );
    }
    if ( ai_3_survived == false )
    {
        image( ai3_img, 300, 430 );
        fill("red");
        text("dead",300, 430);
        fill("black");
        text( "Alexander: I respect your decision.", width / 2, 150 );
    }
    if ( ai_4_survived == false )
    {
        image( ai4_img, 400, 430 );
        fill("red");
        text("dead",400, 430);
        fill("black");
        text( "Hudson: NO!! Why me? Go to hell you all", width / 2, 180 );
    }
    pop();
}

//draw ai to pick when the game_mode is INTERMISSION
function pick_ai()
{
    push();
    imageMode( CENTER );
    if ( ai_1_survived ) ai_1.draw();
    else image( tombstone_img, ai_1.x, ai_1.y );
    if ( ai_2_survived ) ai_2.draw();
    else image( tombstone_img, ai_2.x, ai_2.y );
    if ( ai_3_survived ) ai_3.draw();
    else image( tombstone_img, ai_3.x, ai_3.y );
    if ( ai_4_survived ) ai_4.draw();
    else image( tombstone_img, ai_4.x, ai_4.y );
    pop();
}

function pick_and_ban()
{
    textSize( 10 );
    if ( ai_1_survived )
    {
        if ( ai_1.x - 30 < mouseX && mouseX < ai_1.x + 30 && ai_1.y - 30 < mouseY && mouseY < ai_1.y + 30 )
        {
            fill("white");
            push();
            strokeWeight(3);
            rect(ai_1.x + 50, ai_1.y-10,250,50);
            pop();
            fill( 'black' );
            //image( textBox_img, ai_1.x, ai_1.y - 35 );
            text( " Lyon : My family is waiting for me. Please save me! \n", ai_1.x + 50, ai_1.y );
            push();
            imageMode(CENTER);
            image(ai_picked_img, ai_1.x, ai_1.y+10);
            fill( 'black' );
            text( "\n\n    bullet damage: " + ai_1_damage, ai_1.x + 50, ai_1.y );
            text( "\n\n\n    firing rate: " + round( 60 / ai_1_speed, 1 ) + " per second", ai_1.x + 50, ai_1.y );
            //text( "\n\n\nbullet speed: 12", ai_1.x + 50, ai_1.y );
            pop();
            if ( mouseIsPressed )
            {
                ai_1_isShoot = false;
                ai_1_survived = false;
                ai_picked = true;
            }
        }
    }

    if ( ai_2_survived )
    {
        if ( ai_2.x - 30 < mouseX && mouseX < ai_2.x + 30 && ai_2.y - 30 < mouseY && mouseY < ai_2.y + 30 )
        {
            fill("white");
            push();
            strokeWeight(3);
            rect(ai_2.x + 50, ai_2.y-10,280,50);
            pop();
            fill( 'black' );
            //image( textBox3_img, ai_2.x, ai_2.y - 35 );
            text( " Elon : I am ready to sacrifice myself. I want to save others", ai_2.x + 50, ai_2.y );
            push();
            imageMode(CENTER);
            image(ai_picked_img, ai_2.x, ai_2.y+10);
            fill( 'black' );
            text( "\n\n    bullet damage: " + ai_2_damage, ai_2.x + 50, ai_2.y );
            text( "\n\n\n    rate of fire: " + round( 60 / ai_2_speed, 1 ) + " per second", ai_2.x + 50, ai_2.y );
            //text( "\n\n\nbullet speed: 13", ai_2.x + 50, ai_2.y );
            pop();
            if ( mouseIsPressed )
            {
                ai_2_isShoot = false;
                ai_2_survived = false;
                ai_picked = true;
            }
        }
    }

    if ( ai_3_survived )
    {
        if ( ai_3.x - 30 < mouseX && mouseX < ai_3.x + 30 && ai_3.y - 30 < mouseY && mouseY < ai_3.y + 30 )
        {

            fill("white");
            push();
            strokeWeight(3);
            rect(ai_3.x + 50, ai_3.y-10,380,50);
            pop();
            fill( 'black' );
            //image( textBox2_img, ai_3.x, ai_3.y - 35 );
            text( " Alexander : You know I can kill zombies better than others. I must be left here!", ai_3.x + 50, ai_3
                .y );
            push();
            imageMode(CENTER);
            image(ai_picked_img, ai_3.x, ai_3.y+10);
            fill( 'black' );
            text( "\n\n    bullet damage: " + ai_3_damage, ai_3.x + 50, ai_3.y );
            text( "\n\n\n    rate of fire: " + round( 60 / ai_3_speed, 1 ) + " per second", ai_3.x + 50, ai_3.y );
            //text( "\n\n\nbullet speed: 40", ai_3.x + 50, ai_3.y );
            pop();
            if ( mouseIsPressed )
            {
                ai_3_isShoot = false;
                ai_3_survived = false;
                ai_picked = true;
            }
        }
    }

    if ( ai_4_survived )
    {
        if ( ai_4.x - 30 < mouseX && mouseX < ai_4.x + 30 && ai_4.y - 30 < mouseY && mouseY < ai_4.y + 30 )
        {
            fill("white");
            push();
            strokeWeight(3);
            rect(ai_4.x + 50, ai_4.y-10,280,50);
            pop();
            fill( 'black' );
            //image( textBox3_img, ai_4.x, ai_4.y - 35 );
            text( " Hudson : PLEASE DON'T KILL ME!! I just don't wanna die!", ai_4.x + 50, ai_4.y );
            push();
            imageMode(CENTER);
            image(ai_picked_img, ai_4.x, ai_4.y+10);
            text( "\n\n    bullet damage: " + ai_4_damage, ai_4.x + 50, ai_4.y );
            text( "\n\n\n    rate of fire: " + round( 60 / ai_4_speed, 1 ) + " per second", ai_4.x + 50, ai_4.y );
            //text( "\n\n\nbullet speed: 30", ai_4.x + 50, ai_4.y );
            pop();
            if ( mouseIsPressed )
            {
                ai_4_isShoot = false;
                ai_4_survived = false;
                ai_picked = true;
            }
        }
    }
}