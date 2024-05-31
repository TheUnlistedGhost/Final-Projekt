import Phaser from 'phaser'

import TembakScene from './Scenes/TembakScene'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 820,
	height: 400,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		},
	},
	scene: [TembakScene],
}

export default new Phaser.Game(config)
