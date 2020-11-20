import { Collision } from './Collision';

export class CollisionTeleport extends Collision {
	collisionAction() {
		this.owner.destroy();
	}
}
