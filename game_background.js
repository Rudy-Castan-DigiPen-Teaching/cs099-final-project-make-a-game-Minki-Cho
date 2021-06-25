// Name       : Minjae Yu, Minki Cho
// Assignment : Final Project - Make a Game
// Course     : CS099
// Spring 2021

function preload_characters()
{
    character_img = loadImage('assets/images/player_and_ai/player(no arms).png')
    character_arm_img = loadImage('assets/images/player_and_ai/arm_and_gun.png')
    gun_recoil = loadImage('assets/images/player_and_ai/gun_recoil.gif')

    bg = loadImage( 'assets/images/game_background/background.png' );
    bg1 = loadImage( 'assets/images/game_background/background_1.png' );
    bg2 = loadImage( 'assets/images/game_background/background_2.png' );
    bg3 = loadImage( 'assets/images/game_background/background_3.png' );
    bg4 = loadImage( 'assets/images/game_background/background_4.png' );
}

function drawing_lines_characters()//drawing lines and characters
{
    for(let i = 0; i < 5; i++)
    {
 
        if(i === 2)//player position
        {
            fill('orange');
            imageMode(CENTER);
            push();
            translate(56, ((i * line_size) + line_size / 2) - 3)
            if( mouseX >= line_size && mouseX <= width && mouseY >= line_size && mouseY <= height - line_size )
            {
                rotate(atan2( mouseY - ((i * line_size) + line_size / 2) , mouseX - 60 ));
            }
            else if( mouseX >= line_size && mouseX <= width && mouseY >= 0 && mouseY < line_size )
            {
                rotate(atan2( -100 , mouseX - 60 ));
            }
            else if( mouseX >= line_size && mouseX <= width && mouseY > height - line_size && mouseY <= height )
            {
                rotate(atan2( 100 , mouseX - 60 ));
            }
            
            //if mouse_clicked and mouse is fired, play gun_recoil motion
            if(bullet_fired === true)
            {
                image(gun_recoil, 0, 0);
            }
            else
            {
                image(character_arm_img, 0, 0); 
            }
            pop();
            image(character_img, 50, ((i * line_size) + line_size / 2));
        }
    }
}