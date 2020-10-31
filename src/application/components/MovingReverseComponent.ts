import * as ECS from '@libs/pixi-ecs';
import { ACTION } from '../constants';

export class MovingReverseComponent extends ECS.Component {
	state = [0, 0];

	private _setState(coords = [0, 0]) {
		this.state = coords;
	}

	onInit() {
		this.subscribe(ACTION.MOVEMENT_REVERSE);
	}

	onMessage(msg: ECS.Message): any {
		if (msg.action === ACTION.MOVEMENT_REVERSE) {
			const [x, y] = this.state;
			const [xS, yS] = msg.data;
			this._setState([x + xS, y + yS]);
		}
	}

	onUpdate(delta: number, absolute: number) {
		const { x, y } = this.owner.position;
		const [xS, yS] = this.state;
		this.owner.position.set(x + xS, y + yS);
		this._setState();
	}
}
