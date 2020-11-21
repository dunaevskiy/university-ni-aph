import { Collision } from './Collision';
import { ACTION } from '@packages/constants/src';

export class CollisionCollectable extends Collision {
	actions = [];

	constructor(actionsToCall: string[]) {
		super();

		this.actions = actionsToCall;
	}

	_collisionAction() {
		this.owner.detach();
		this.sendMessage(ACTION.ADD_SCORE);
	}
}
