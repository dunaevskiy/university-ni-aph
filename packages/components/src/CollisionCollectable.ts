import { ACTION } from '@packages/constants';

import { Collision } from './Collision';

export class CollisionCollectable extends Collision {
	_collisionAction() {
		this.owner.detach();
		this.sendMessage(ACTION.ADD_SCORE);
	}
}
