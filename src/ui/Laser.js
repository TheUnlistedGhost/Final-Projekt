import Phaser from 'phaser'
export default class Laser extends
Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture){
        super (scene,x,y, texture)
    }
    fire(x, y){
        this.setPosition(x+20,y)
        this.setActive(true)
        this.setVisible(true)
    }
    die(){
        this.destroy()
    }
    update(time){
        this.setVelocityX(200)
        if (this.x >830){
            this.die()
        }
    }
}