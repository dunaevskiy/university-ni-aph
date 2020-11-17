import * as ECS from '@libs/pixi-ecs';
import { BLOCK_SIZE, VIEWPORT } from '../constants';
import { InitiatorMovement } from '../components';
import { loader } from '../loader';

export class Doctor extends ECS.Sprite {
	constructor() {
		super('doctor', loader.resources.doctor01.texture);
		this.width = BLOCK_SIZE;
		this.height = BLOCK_SIZE;

		this.pivot.set(BLOCK_SIZE / 2, BLOCK_SIZE / 2);
		this.position.set(VIEWPORT.width / 2, VIEWPORT.height / 2);

		this.addComponent(new InitiatorMovement());
	}
}
