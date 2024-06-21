import Phaser from 'phaser'
export default class Asteroid extends
Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture, config){
        super (scene, x, y, texture)
        this.scene = scene
        this.speed = config.speed 
    }
    spawn(positionY){
        this.setPosition(820, positionY)
        this.setActive(true)
        this.setVisible(true) 
    }
    die(){
        this.destroy()
    }
    update(time){
        this.setVelocityX(-this.speed)

        const gameWidth = this.scene.scale.width
        if (this.x < 0){
            this.die()
        }
        
    }
}