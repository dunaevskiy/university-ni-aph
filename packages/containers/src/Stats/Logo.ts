import * as PIXI from 'pixi.js';

import * as ECS from '@libs/pixi-ecs';

const style = new PIXI.TextStyle({
	fontFamily: 'Arial',
	fontSize: 42,
	fill: '#ffffff',
});

export class Logo extends ECS.Container {
	init() {
		const logo = new PIXI.Text('THE LAB', style);

		this.addChild(logo);
	}
}
