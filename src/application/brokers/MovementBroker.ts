import * as ECS from '@libs/pixi-ecs';
import { ACTION } from '../constants';

export class MovementBroker extends ECS.Component {
	onInit() {
		this.subscribe(ACTION.MOVEMENT);
	}

	onMessage(msg: ECS.Message): any {
		if (msg.action === ACTION.MOVEMENT) {
		}
	}
}
