import * as ECS from '@libs/pixi-ecs';
import { ACTION, CONTAINER } from '@packages/constants';
import { BLOCK_SIZE } from '@packages/constants/src';

export abstract class Collision extends ECS.Component {
	onInit() {
		this.subscribe(ACTION.MOVEMENT_MC_NOTIFICATION);
	}

	onMessage(msg): any {
		if (msg.action === ACTION.MOVEMENT_MC_NOTIFICATION) {
			const x = this.owner.position.x;
			const y = this.owner.position.y;
			const foreignX = msg.data.x;
			const foreignY = msg.data.y;

			const distanceX = Math.abs(x - foreignX);
			const distanceY = Math.abs(y - foreignY);

			if (distanceX < BLOCK_SIZE / 2 && distanceY < BLOCK_SIZE / 2) this._collisionAction();
		}
	}

	abstract _collisionAction(): void;
}
