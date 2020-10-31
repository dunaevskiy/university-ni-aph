import * as PIXI from 'pixi.js';
import * as ECS from '@libs/pixi-ecs';

import {
	containerBigHeight,
	containerBigWidth,
	containerSmallHeightShift,
	containerSmallWidthShift,
	mazeHeightBlocks,
	mazeMatrix,
	mazeWidthBlocks,
} from '../constants';
import { loader } from '../loader';

export class MazeContainer extends ECS.Container {
	constructor() {
		super();
		this.pivot.set(containerSmallWidthShift, containerSmallHeightShift);
		this.position.set(containerBigWidth / 2, containerBigHeight / 2);

		for (let r = 0; r < mazeHeightBlocks; r++) {
			for (let c = 0; c < mazeWidthBlocks; c++) {
				if (mazeMatrix[r][c] == 1) {
					// let wall =
					// 	r == mazes.maps.alpha[0].length - 1 || mazes.maps.alpha[r + 1][c] == 0
					// 		? loader.resources.wall02
					// 		: loader.resources.wall01;

					let wall = loader.resources.wall01;

					const rectangle = new PIXI.Sprite(wall.texture);
					rectangle.position.set(c * 24, r * 24);
					this.addChild(rectangle);
				} else {
					// let floor =
					// 	r > 1 && mazes.maps.alpha[r - 1][c] == 1
					// 		? loader.resources.floor02
					// 		: loader.resources.floor01;

					let floor = loader.resources.floor01;
					if (floor == loader.resources.floor01 && Math.random() > 0.7)
						floor = loader.resources.floor03;

					const rectangle = new PIXI.Sprite(floor.texture);
					rectangle.position.set(c * 24, r * 24);
					this.addChild(rectangle);
				}
			}
		}
	}
}
