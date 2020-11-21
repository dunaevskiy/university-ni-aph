import * as ECS from '@libs/pixi-ecs';
import { CollisionTeleport } from '@packages/components';
import { loader } from '@packages/utils';
import { BLOCK_SIZE } from '@packages/constants/src';

export class Teleport extends ECS.Sprite {
	constructor(destination: number[] = [0, 0]) {
		super('teleport', loader.resources.teleport01.texture);

		this.pivot.set(BLOCK_SIZE / 2, BLOCK_SIZE / 2);

		this.addComponent(new CollisionTeleport(destination));
	}
}
