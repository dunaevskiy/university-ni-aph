import * as ECS from '@libs/pixi-ecs';
import { loader } from '../../../../loader';
import { ACTION, CONTAINER } from '../../../../constants';

class Collision extends ECS.Component {
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

class CollisionTeleport extends Collision {
	collisionAction() {
		this.owner.destroy();
	}
}

export class Teleport extends ECS.Sprite {
	constructor(from: number[] = [0, 0], to: number[] = [0, 0]) {
		super('teleport', loader.resources.teleport01.texture);

		this.addComponent(new CollisionTeleport());
	}
}
