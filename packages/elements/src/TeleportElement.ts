import { CollisionTeleport } from '@packages/components';
import { loader } from '@packages/utils';

import { Element } from './Element';

export class TeleportElement extends Element {
	constructor(destination: number[] = [0, 0]) {
		super('teleport', loader.resources.teleport01.texture);

		this.addComponent(new CollisionTeleport(destination));
	}
}
