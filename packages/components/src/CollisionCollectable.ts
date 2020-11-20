import { Collision } from './Collision';

export class CollisionCollectable extends Collision {
	actions = [];

	constructor(actionsToCall: string[]) {
		super();

		this.actions = actionsToCall;
	}

	_collisionAction() {
		// this.sendMessage()
	}
}
