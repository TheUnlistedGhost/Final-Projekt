import Phaser from 'phaser'

import TembakScene from './Scenes/TembakScene'
import GameOverScene from './Scenes/GameOverScene'
import StartScene from './Scenes/StartScene'
import WinScene from './Scenes/WinScene'

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
	scene: [StartScene, TembakScene, GameOverScene, WinScene],
}

export default new Phaser.Game(config)
