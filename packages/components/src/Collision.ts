import * as ECS from '@libs/pixi-ecs';
import { ACTION, CONTAINER } from '@packages/constants';

export class Collision extends ECS.Component {
	onInit() {
		this.subscribe(ACTION.MOVEMENT_MC_NOTIFICATION);
	}

	onMessage(msg): any {
		if (msg.action === ACTION.MOVEMENT_MC_NOTIFICATION) {
			if (msg.data.x <= CONTAINER.small.width / 2 - 100) {
				this.collisionAction();
			}
		}
	}

	collisionAction() {}
}
