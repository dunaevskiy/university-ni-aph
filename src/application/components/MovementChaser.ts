import * as ECS from '@libs/pixi-ecs';

import { SPEED_MONSTER } from '../constants';

export class MovementChaser extends ECS.Component {
	state = {
		direction: -1,
		count: 10,
	};

	onUpdate(delta: number) {
		this.owner.position.x += delta * SPEED_MONSTER * this.state.direction;
		if (this.state.count == 20) {
			this.state.count = 0;
			this.state.direction *= -1;
		} else {
			this.state.count += 1;
		}
	}
}
