import { ACTION } from '@packages/constants';

import { Collision } from './Collision';

export class CollisionTeleport extends Collision {
	destination: number[];

	constructor(destination) {
		super();

		this.destination = destination;
	}

	_collisionAction() {
		this.sendMessage(ACTION.TELEPORT_PERSON, { destination: this.destination });
	}
}
