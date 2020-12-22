import * as ECS from '@libs/pixi-ecs';
import { BLOCK_SIZE } from '@packages/constants';

/**
 * Represents a one block sprite
 */
export class Element extends ECS.Sprite {
	constructor(name, texture, size = BLOCK_SIZE) {
		super(name, texture);

		this.width = size;
		this.height = size;
		this.pivot.set(size / 2, size / 2);
	}
}
