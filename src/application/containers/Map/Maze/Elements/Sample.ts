import * as ECS from '@libs/pixi-ecs';
import { loader } from '../../../../loader';

export class Sample extends ECS.Sprite {
	constructor() {
		const number = '0' + (Math.floor(Math.random() * Math.floor(2)) + 1);
		console.log(`sample${number}`);
		super('sample', loader.resources[`sample${number}`].texture);

		this.width = 32;
		this.height = 32;
	}
}
