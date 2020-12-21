import * as PIXI from 'pixi.js';

import * as ECS from '@libs/pixi-ecs';
import { P1, VIEWPORT } from '@packages/constants';
import { loader } from '@packages/utils';
import { MainMenuBehaviour, StatsBehaviour } from '@packages/components';

import packageJson from '../../../../package.json';

const style = {
	fontFamily: 'Arial',
	fontSize: 24,
	fill: '#ffffff',
	dropShadow: true,
	dropShadowColor: '#000000',
	dropShadowBlur: 4,
	dropShadowAngle: Math.PI / 6,
	dropShadowDistance: 6,
	wordWrap: true,
	wordWrapWidth: 440,
	lineJoin: 'round',
};

export class ControlInterface extends ECS.Container {
	state = 0;
	score = null;

	logo = null;
	version = null;
	sampleIcon = null;

	menuStartGame = null;

	init() {
		this._initLogo();
		this._initVersion();
		this._initStats();
		this._initMenu();
	}

	_initLogo() {
		this.logo = new PIXI.Sprite(loader.resources.logo.texture);
		this.addChild(this.logo);
		this.logo.position.set(P1, P1);
		this.logo.width = 197;
		this.logo.height = 59;
	}

	_initVersion() {
		this.version = new PIXI.Text(`v${packageJson.version}`, {
			fontFamily: 'Arial',
			fontSize: 10,
			fill: '#ffffff',
			fontStyle: 'italic',
		});
		this.addChild(this.version);
		this.version.position.set(VIEWPORT.width - P1, VIEWPORT.height - P1);
		this.version.pivot.set(this.version.width, this.version.height);
	}

	_initStats() {
		this.sampleIcon = new PIXI.Sprite(loader.resources.sample01.texture);
		this.addChild(this.sampleIcon);
		this.sampleIcon.position.set(P1, VIEWPORT.height - this.sampleIcon.height - P1);
		this.sampleIcon.width = 32;
		this.sampleIcon.height = 32;

		this.score = new PIXI.Text(`${this.state}`, style);
		this.addChild(this.score);
		this.score.position.set(P1 + 50, VIEWPORT.height - P1 - 45);

		this.addComponent(new StatsBehaviour());
	}

	_initMenu() {
		this.menuStartGame = new PIXI.Text('start game', {
			fontFamily: 'Major Mono Display',
			fontSize: 30,
			fill: 'white',
			align: 'center',
		});
		this.addChild(this.menuStartGame);
		this.menuStartGame.position.set(VIEWPORT.width / 2 - this.menuStartGame.width / 2, 300);
		this.menuStartGame.interactive = true;

		this.addComponent(new MainMenuBehaviour());
	}

	increaseScore(number) {
		this.state += number;
		this.score.text = this.state;
	}

	resetScore(number) {
		this.state = 0;
		this.score.text = this.state;
	}
}
