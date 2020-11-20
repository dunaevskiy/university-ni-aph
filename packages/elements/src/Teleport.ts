import * as ECS from '@libs/pixi-ecs';
import { CollisionTeleport } from '@packages/components';
import { loader } from '@packages/utils';

export class Teleport extends ECS.Sprite {
	constructor(from: number[] = [0, 0], to: number[] = [0, 0]) {
		super('teleport', loader.resources.teleport01.texture);

		this.addComponent(new CollisionTeleport());
	}
}
