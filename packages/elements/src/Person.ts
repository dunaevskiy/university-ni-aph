import * as ECS from '@libs/pixi-ecs';
import { BLOCK_SIZE, VIEWPORT } from '@packages/constants';
import { InitiatorMovement } from '@packages/components';
import { loader } from '@packages/utils';

export class Person extends ECS.Sprite {
	constructor() {
		super('doctor', loader.resources.doctor01.texture);

		this.width = BLOCK_SIZE;
		this.height = BLOCK_SIZE;
		this.pivot.set(BLOCK_SIZE / 2, BLOCK_SIZE / 2);

		this.addComponent(new InitiatorMovement());
	}
}
