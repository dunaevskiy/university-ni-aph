import * as ECS from '@libs/pixi-ecs';
import { ACTION } from '@packages/constants';

export class MazeBehaviour extends ECS.Component {
	onInit() {
		this.subscribe(ACTION.ADD_SCORE);
	}

	onMessage(msg: ECS.Message): any {
		if (msg.action === ACTION.ADD_SCORE) {
			// @ts-ignore
			this.owner.spawnSample();
		}
	}
}
