import * as PIXI from 'pixi.js';
import * as ECS from '@libs/pixi-ecs';

import packageJson from '../../../../package.json';

const style = new PIXI.TextStyle({
	fontFamily: 'Arial',
	fontSize: 10,
	fill: '#ffffff',
	fontStyle: 'italic',
});

export class Version extends ECS.Container {
	init() {
		const version = new PIXI.Text(`v${packageJson.version}`, style);
		this.addChild(version);
	}
}
