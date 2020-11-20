import { Collision } from './Collision';

export class CollisionTeleport extends Collision {
	destination: number[];

	constructor(destination) {
		super();

		this.destination = destination;
	}

	_collisionAction() {
		this.owner.destroy();
	}
}
