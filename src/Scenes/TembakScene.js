import Phaser from 'phaser'
export default class TembakScene extends
Phaser.Scene
{
    constructor(){
        super('tembak-scene')
    }
    init(){
        this.player = undefined;
        this.speed = 100;
        this.cursor = undefined;
    }
    preload(){
        this.load.image('background', 'images/bg-preview.png')
        this.load.spritesheet('player', 'images/player.png', {
            frameWidth: 26,
            frameHeight: 21
        })
    }
    create(){
        const gameWidht = this.scale.width*0.5;
        const gameHeight = this.scale.height*0.5;
        this.add.image(gameWidht,gameHeight,'background').setScale(3)
        this.player = this.createPlayer()
        this.cursor = this.input.keyboard.createCursorKeys()
    }
    update(time){
        if (this.cursor.up.isDown){
                this.player.setVelocity(0, -200)
                this.player.anims.play('up',true)
            }
            else if(this.cursor.down.isDown){
                this.player.setVelocity(0, 200)
                this.player.anims.play('down',true)
            }
            else if(this.cursor.left.isDown){
                this.player.setVelocity(-200, 0)
                this.player.anims.play('turn')
            }
            else if(this.cursor.right.isDown){
                this.player.setVelocity(200, 0)
                this.player.anims.play('turn')
            }
            else{
                this.player.setVelocity(0,0)
                this.player.anims.play('turn')
            }
    }
    createPlayer() {
        const player = this.physics.add.sprite(200, 200,'player')
        player.setCollideWorldBounds(true)
        this.anims.create({
            key: 'turn',
            frames: [{
                key: 'player',frame: 0
            }],
        })
        this.anims.create({
            key: 'down',
            frames: [{
                key: 'player',frame: 1
            }]
        })
        this.anims.create({
            key: 'up',
            frames: [{
                key: 'player',frame: 2
            }]
        })
        return player
    }
}
