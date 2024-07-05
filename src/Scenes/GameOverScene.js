import Phaser from 'phaser'
export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super('over-scene')
    }
    init(data) {
        this.replayButton = undefined
        this.score = data.score
    }
    preload() {
        this.load.image('background', 'images/bg-preview.png')
        this.load.image('gameover', 'images/gameover.png')
        this.load.image('replay-button', 'images/replay.png')
    }
    create() {
        this.add.image(410,200,'background').setScale(3)
        this.add.image(410, 180, 'gameover')
        this.add.text(50, 50, 'Score: ' + this.score, {
            fontSize: '32px', fill: 'white' })
        this.replayButton = this.add.image(410, 300, 'replay-button')
            .setInteractive().setScale(0.4)
        this.replayButton.once('pointerup', () => {
            this.scene.start('tembak-scene')
        }, this)
    }
}