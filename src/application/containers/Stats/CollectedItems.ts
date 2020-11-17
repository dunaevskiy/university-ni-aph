import * as PIXI from 'pixi.js';
import * as ECS from '@libs/pixi-ecs';
import { loader } from '../../loader';
import { P1 } from '../../constants';

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
	init() {
		const icon = new PIXI.Sprite(loader.resources.sample01.texture);
		icon.position.set(0, 0);
		icon.width = 32;
		icon.height = 32;

		const text = new PIXI.Text('0', style);
		text.position.set(32 + P1, 2);

		this.addChild(icon);
		this.addChild(text);
	}
}
