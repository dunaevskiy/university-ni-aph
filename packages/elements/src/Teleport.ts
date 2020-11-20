import * as ECS from '@libs/pixi-ecs';
import { CollisionTeleport } from '@packages/components';
import { loader } from '@packages/utils';

export class Teleport extends ECS.Sprite {
	constructor(destination: number[] = [0, 0]) {
		super('teleport', loader.resources.teleport01.texture);

		this.addComponent(new CollisionTeleport(destination));
	}
}
