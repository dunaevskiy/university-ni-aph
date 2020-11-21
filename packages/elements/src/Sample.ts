import * as ECS from '@libs/pixi-ecs';
import { loader } from '@packages/utils';
import { CollisionCollectable } from '@packages/components/src';
import { ACTION } from '@packages/constants/src';

export class Sample extends ECS.Sprite {
	constructor() {
		const number = '0' + (Math.floor(Math.random() * Math.floor(2)) + 1);

		super('sample', loader.resources[`sample${number}`].texture);

		this.width = 32;
		this.height = 32;

		this.pivot.set(16, 16);

		this.addComponent(new CollisionCollectable([ACTION.ADD_SCORE]));
	}
}
