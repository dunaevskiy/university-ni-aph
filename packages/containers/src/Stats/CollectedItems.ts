import * as PIXI from 'pixi.js';

import * as ECS from '@libs/pixi-ecs';
import { P1 } from '@packages/constants';
import { loader } from '@packages/utils';
import { ACTION } from '@packages/constants/src';

// FIXME: rewrite score counting

class ScoreCounter extends ECS.Component {
	onInit() {
		this.subscribe(ACTION.ADD_SCORE);
	}

	onMessage(msg: ECS.Message): any {
		if (msg.action === ACTION.ADD_SCORE) {
			// @ts-ignore
			this.owner.increaseScore(1);
		}
	}
}

const style = new PIXI.TextStyle({
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
});

export class CollectedItems extends ECS.Container {
	state = 0;
	score = null;

	init() {
		const icon = new PIXI.Sprite(loader.resources.sample01.texture);
		icon.position.set(0, 0);
		icon.width = 32;
		icon.height = 32;

		this.score = new PIXI.Text(`${this.state}`, style);
		this.score.position.set(32 + P1, 2);

		this.addChild(icon);
		this.addChild(this.score);
		this.addComponent(new ScoreCounter());
	}

	rerender() {
		this.removeChild(this.score);
		this.score = new PIXI.Text(`${this.state}`, style);
		this.score.position.set(32 + P1, 2);
		this.addChild(this.score);
	}

	increaseScore(number) {
		this.state += number;
		console.log(this.state);
		this.rerender();
	}
}
