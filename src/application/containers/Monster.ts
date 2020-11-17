import * as ECS from '@libs/pixi-ecs';
import { containerSmallHeightShift, containerSmallWidthShift, mazeBlockSize } from '../constants';
import { loader } from '../loader';

export class Monster extends ECS.Sprite {
	constructor() {
		super('monster', loader.resources.monster01.texture);
		this.width = mazeBlockSize;
		this.height = mazeBlockSize;
		this.pivot.set(mazeBlockSize / 2, mazeBlockSize / 2);
		this.position.set(containerSmallWidthShift, containerSmallHeightShift - 100);
	}
}
