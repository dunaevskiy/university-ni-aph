import * as ECS from '@libs/pixi-ecs';
import { BLOCK_SIZE } from '../../../constants';
import { loader } from '../../../loader';
import { MovementChaser } from '../../../components';

export class Monster extends ECS.Sprite {
	constructor() {
		super('monster', loader.resources.monster01.texture);

		this.addComponent(new MovementChaser());
		this.width = BLOCK_SIZE;
		this.height = BLOCK_SIZE;
		this.pivot.set(BLOCK_SIZE / 2, BLOCK_SIZE / 2);
	}
}
