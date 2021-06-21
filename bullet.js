var bullet = [];
let bullet_img, fire_img;
let bullet_sound;
let bullet_fired = false;//check mouse_pressed and bullet is fired

function bullet_preload()
{
    bullet_img   = loadImage( 'assets/images/bullet.gif' );
    fire_img     = loadImage( 'assets/images/fire.png');
    bullet_sound = loadSound( 'assets/sounds/1911_Short_Crack_01.mp3' );
    reload_sound = loadSound( 'assets/sounds/1911_Slide_Racked.mp3' );
    empty_mag_sound = loadSound( 'assets/sounds/1911_Dry_Fire.mp3' );
}

class Bullet
{
    constructor( x, y, angle )
    {
        this.x = x;
        this.y = y;
        this.angle = angle
        this.speed = 1200 * ( deltaTime / 1000 ); //can change value to set bullet speed.
        this.dx = mouseX - this.x;
        this.dy = mouseY - this.y;
    }

    //This function is to draw bullet
    draw_bullet()
    {
        push();
        imageMode( CENTER );
        translate(this.x, this.y);
        rotate( Math.atan2( this.dy, this.dx ));
        image( bullet_img, 0, 0 );
        pop();
       
        this.x += this.speed * cos( this.angle );
        this.y += this.speed * sin( this.angle );
    }

}

//To draw bullets for the loop and erase if bullets are outside of canvas.
function bullet_setoff()
{
    for ( var i = 0; i < bullet.length; i++ )
    {
        bullet[ i ].draw_bullet();

        if ( bullet[ i ].x <= 0 || bullet[ i ].y <= 0 || bullet[ i ].x >= width+20 || bullet[ i ].y >= height )
        {
            bullet.splice( i, 1 );
        } //if ball goes out of frame, delete the ball from the array.
    }
}