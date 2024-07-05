import Phaser from 'phaser'

import TembakScene from './Scenes/TembakScene'
import GameOverScene from './Scenes/GameOverScene'
import StartScene from './Scenes/StartScene'

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
	scene: [StartScene, TembakScene, GameOverScene],
}

export default new Phaser.Game(config)
