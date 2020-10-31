import * as ECS from '@libs/pixi-ecs';
import { containerSmallHeightShift, containerSmallWidthShift, mazeBlockSize } from '../constants';
import { InitiatorMovement, MovingComponent } from '../components';
import { loader } from '../loader';

export class Doctor extends ECS.Sprite {
	constructor() {
		super('doctor', loader.resources.doctor01.texture);

		this.pivot.set(mazeBlockSize / 2, mazeBlockSize / 2);
		this.position.set(containerSmallWidthShift, containerSmallHeightShift);

		this.addComponent(new InitiatorMovement());
		this.addComponent(new MovingComponent());
	}
}
