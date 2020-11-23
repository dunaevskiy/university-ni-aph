import * as ECS from '@libs/pixi-ecs';
import { loader } from '@packages/utils';
import { ACTION } from '@packages/constants';
import { CollisionCollectable } from '@packages/components';

export class Sample extends ECS.Sprite {
	constructor() {
		const number = '0' + (Math.floor(Math.random() * Math.floor(3)) + 1);

		super('sample', loader.resources[`sample${number}`].texture);

		this.width = 32;
		this.height = 32;

		this.pivot.set(16, 16);

		this.addComponent(new CollisionCollectable([ACTION.ADD_SCORE]));
	}
}
