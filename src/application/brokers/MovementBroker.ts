import * as ECS from '@libs/pixi-ecs';
import { ACTION } from '../constants';

export class MovementBroker extends ECS.Component {
	onInit() {
		this.subscribe(ACTION.MOVEMENT);
	}

	onMessage(msg: ECS.Message): any {
		if (msg.action === ACTION.MOVEMENT) {
			const [shiftX, shiftY] = msg.data;
			this.sendMessage(ACTION.MOVEMENT_DIRECT, [shiftX, shiftY]);
			this.sendMessage(ACTION.MOVEMENT_REVERSE, [-shiftX, -shiftY]);
		}
	}
}
