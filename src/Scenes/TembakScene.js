import Phaser from 'phaser'
import Obstacles from '../ui/Obstacles';
import Laser from '../ui/Laser';
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
        this.asteroid1 = undefined;
        this.enemySpeed = 50;
        this.laser = undefined;
        this.lastFired = 10;
        this.score = 0;
        this.scoreLabel = undefined
        this.life = 3,
        this.lifeLabel = undefined
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
        this.load.image('laser','images/shoot2.png')
        this.load.image('small', 'images/asteroid-small.png')
        this.load.image('big', 'images/asteroid.png')
        this.load.audio('lasersfx' , 'sfx/laserSound.mp3')
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
        this.asteroid1 = this.physics.add.group({
            classType: Obstacles,
            maxSize: 15,
            runChildUpdate: true
        })
        this.asteroid2 = this.physics.add.group({
            classType: Obstacles,
            maxSize: 15,
            runChildUpdate: true
        })
        this.time.addEvent({
            delay: Phaser.Math.Between(680, 1000),
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        })
        this.time.addEvent({
            delay: Phaser.Math.Between(4100, 4400),
            callback: this.spawnSmalAsteroid,
            callbackScope: this,
            loop: true
        })
        this.time.addEvent({
            delay: Phaser.Math.Between(7000, 8000),
            callback: this.spawnAsteroid,
            callbackScope: this,
            loop: true
        })
        this.laser = this.physics.add.group({
            classType: Laser,
            maxSize: 14,
            runChildUpdate: true
        })
        this.physics.add.overlap(
            this.enemies,
            this.laser,
            this.hitEnemy,
            null,
            this
        )
        this.physics.add.overlap(
            this.laser,
            this.asteroid2,
            this.laserDelete,
            null,
            this
        )
        this.physics.add.overlap(
            this.laser,
            this.asteroid1,
            this.laserDelete,
            null,
            this
        )
        this.scoreLabel = this.add.text(10,10,'Score', {
            fontSize: '16px',
            fill: 'black',
            backgroundColor: 'white'
        }).setDepth(1)
        this.physics.add.overlap(
            this.player,
            this.enemies,
            this.decreaseLife,
            null,
            this
        )
    }
    update(time){
        this.movePlayer(this.player, time)
        this.scoreLabel.setText('Score : ' + this.score);
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
    movePlayer(player, time) {
        //keyboard
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
            this.player.anims.play('up')
        }
        else if(this.cursor.right.isDown){
            this.player.setVelocity(200, 0)
            this.player.anims.play('down')
        }
        else{
            this.player.setVelocity(0,0)
            this.player.anims.play('turn')
        }

        if ((this.cursor.space.isDown) && time > this.lastFired) {
            const laser = this.laser.get(0, 0, 'laser')
            if (laser) {
                laser.fire(this.player.x, this.player.y)
                this.lastFired = time + 380
                this.sound.play('lasersfx')
            }
        }
    }
    spawnEnemy() {
        const config = {
            speed: 30,
        }
        
        this.anims.create({
            key: 'anim',
            frames: this.anims.generateFrameNumbers('enemy', {
                start: 1,end: 4
            })
        })
        // @ts-ignore
        const enemy = this.enemies.get(0,0,'enemy',config)
        const positionY = Phaser.Math.Between(50, 350)
        if (enemy) {
            enemy.spawn(positionY)
        }
    }
    spawnSmalAsteroid() {
        const config = {
            speed: 30,
            rotation: 0.1
        }
        // @ts-ignore
        const asteroid1 = this.asteroid1.get(0,0,'small',config)
        const positionY = Phaser.Math.Between(10, 390)
        if (asteroid1) {
            asteroid1.spawn(positionY)
        }
    }
    spawnAsteroid() {
        const config = {
            speed: 30,
            rotation: 0.1
        }
        // @ts-ignore
        const asteroid2 = this.asteroid2.get(0,0,'big',config)
        const positionY = Phaser.Math.Between(10, 390)
        if (asteroid2) {
            asteroid2.spawn(positionY)
        }
    }
    hitEnemy(laser, enemy) {
        laser.die()
        enemy.die()
        this.score += 10
    }
    laserDelete(laser){
        laser.die()
    }
    decreaseLife(player, enemy){
        enemy.die()
        this.life--
        if (this.life == 2){
            player.setTint(0xff0000)
        }else if (this.life == 1){
            player.setTint(0xff0000).setAlpha(0.5)
        }else if (this.life == 0) {
            this.scene.start('over-scene',{score:this.score})
        }
    }
}
