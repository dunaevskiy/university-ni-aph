import * as ECS from '@libs/pixi-ecs';
import { ACTION } from '@packages/constants';

export class StatsBehaviour extends ECS.Component {
	onInit() {
		this.subscribe(ACTION.ADD_SCORE);
		this.subscribe(ACTION.START_GAME);
	}

	onMessage(msg: ECS.Message): any {
		if (msg.action === ACTION.ADD_SCORE) {
			// @ts-ignore
			this.owner.increaseScore(1);
		}
		if (msg.action === ACTION.START_GAME) {
			// @ts-ignore
			this.owner.resetScore();
		}
	}
}
