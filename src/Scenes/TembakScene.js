import Phaser from 'phaser'
import Obstacles from '../ui/Obstacles';
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
        this.enemies = undefined;
        this.enemySpeed = 50
    }
    preload(){
        this.load.image('background', 'images/bg-preview.png')
        this.load.spritesheet('player', 'images/player.png', {
            frameWidth: 26,
            frameHeight: 21
        })
        this.load.spritesheet('enemy', 'images/enemy.png', {
            frameWidth: 29,
            frameHeight: 29
        })
    }
    create(){
        const gameWidht = this.scale.width*0.5;
        const gameHeight = this.scale.height*0.5;
        this.add.image(gameWidht,gameHeight,'background').setScale(3)
        this.player = this.createPlayer()
        this.cursor = this.input.keyboard.createCursorKeys()
        this.enemies = this.physics.add.group({
            classType: Obstacles,
            maxSize: 10,
            runChildUpdate: true
         })
         this.time.addEvent({
            delay: Phaser.Math.Between(1000, 5000),
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        })
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
    spawnEnemy() {
        const config = {
            speed: 30,
        }
        this.anims.create({
            key;            
        })
        // @ts-ignore
        const enemy = this.enemies.get(820,0,'enemy',config)
        const positionY = Phaser.Math.Between(50, 350)
        if (enemy) {
            enemy.spawn(positionY)
        }
    }
}
