import { CollisionTeleport } from '@packages/components';
import { loader } from '@packages/utils';

import { OneBlockElement } from './OneBlockElement';
import { BLOCK_SIZE } from '@packages/constants';

export class Teleport extends OneBlockElement {
	constructor(destination: number[] = [0, 0]) {
		super('teleport', loader.resources.teleport01.texture);
		this.pivot.set(BLOCK_SIZE / 2, BLOCK_SIZE / 2);

		this.addComponent(new CollisionTeleport(destination));
	}
}
