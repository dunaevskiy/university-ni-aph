import { CollisionTeleport } from '@packages/components';
import { loader } from '@packages/utils';

import { OneBlockElement } from './OneBlockElement';

export class Teleport extends OneBlockElement {
	constructor(destination: number[] = [0, 0]) {
		super('teleport', loader.resources.teleport01.texture);

		this.addComponent(new CollisionTeleport(destination));
	}
}
