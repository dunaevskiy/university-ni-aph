import * as ECS from '@libs/pixi-ecs';
import { ACTION, BLOCK_SIZE } from '@packages/constants';

export abstract class Collision extends ECS.Component {
	onInit() {
		this.subscribe(ACTION.MOVEMENT_OF_PERSON);
	}

	onMessage(msg): any {
		if (msg.action === ACTION.MOVEMENT_OF_PERSON) {
			const ownerX = this.owner.position.x;
			const ownerY = this.owner.position.y;
			const personX = msg.data.x;
			const personY = msg.data.y;

			const distanceX = Math.abs(ownerX - personX);
			const distanceY = Math.abs(ownerY - personY);

			if (distanceX < BLOCK_SIZE / 2 && distanceY < BLOCK_SIZE / 2) this._collisionAction();
		}
	}

	/**
	 * Called when a game detects a collision with the person
	 */
	abstract _collisionAction(): void;
}
