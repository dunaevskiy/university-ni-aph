import * as ECS from '@libs/pixi-ecs';
import { ACTION } from '@packages/constants';

export class FlashlightBehaviour extends ECS.Component {
	onInit() {
		this.subscribe(ACTION.START_GAME);
		this.subscribe(ACTION.END_GAME);
	}

	onMessage(msg): any {
		if (msg.action === ACTION.START_GAME) {
			// @ts-ignore
			this.owner.turnOn();
		}
		if (msg.action === ACTION.END_GAME) {
			// @ts-ignore
			this.owner.turnOff();
		}
	}
}
