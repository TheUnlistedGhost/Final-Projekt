import Phaser from 'phaser'
export default class WinScene extends Phaser.Scene {
    constructor() {
        super('win-scene')
    }
    init(data) {
        this.replayButton = undefined
    }
    preload() {
        this.load.image('background', 'images/bg-preview.png')
        this.load.image('gameover', 'images/YouWin.jpg')
        this.load.image('replay-button', 'images/replay.png')
    }
    create() {
        this.add.image(410,200,'background').setScale(3)
        this.add.image(410, 180, 'gameover').setScale(2)
        this.replayButton = this.add.image(410, 300, 'replay-button')
            .setInteractive().setScale(0.4)
        this.replayButton.once('pointerup', () => {
            this.scene.start('tembak-scene')
        }, this)
    }
}