import Phaser from 'phaser'
export default class StartScene extends Phaser.Scene {
    constructor() {
        super('start-scene')
    }
    init(data) {
        this.startButton = undefined
    }
    preload() {
        this.load.image('background', 'images/bg-preview.png')
        this.load.image('start-button', 'images/Start-button.png')
    }
    create() {
        this.add.image(410, 200, 'background').setScale(3)
        this.startButton = this.add.image(410, 260, 'start-button')
            .setInteractive().setScale(0.05)
        this.startButton.once('pointerup', () => {
            this.scene.start('tembak-scene')
        }, this)
    }
}