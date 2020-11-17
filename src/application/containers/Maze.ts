import * as PIXI from 'pixi.js';
import * as ECS from '@libs/pixi-ecs';

import {
	containerBigHeight,
	containerBigWidth,
	containerSmallHeightShift,
	containerSmallWidthShift,
	mazeBlockSize,
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
				// Generate wall
				if (mazeMatrix[r][c] == 0x1) {
					let wall =
						r == mazeMatrix.length - 1 || mazeMatrix[r + 1][c] == 0
							? loader.resources.wall02
							: loader.resources.wall01;
					// let wall = loader.resources.wall01;

					const rectangle = new PIXI.Sprite(wall.texture);
					rectangle.position.set(c * mazeBlockSize, r * mazeBlockSize);
					this.addChild(rectangle);
					continue;
				}

				// Generate floor
				let floor =
					r > 1 && mazeMatrix[r - 1][c] == 1 ? loader.resources.floor02 : loader.resources.floor01;

				// let floor = loader.resources.floor01;
				if (floor == loader.resources.floor01 && Math.random() > 0.7)
					floor = loader.resources.floor03;

				const rectangle = new PIXI.Sprite(floor.texture);
				rectangle.position.set(c * mazeBlockSize, r * mazeBlockSize);
				this.addChild(rectangle);

				/**
				 * Object on the floor
				 */

				if (mazeMatrix[r][c] == 0x7) {
					let teleport = loader.resources.teleport01.texture;
					const rectangle = new PIXI.Sprite(teleport);
					rectangle.position.set(c * mazeBlockSize, r * mazeBlockSize);
					this.addChild(rectangle);
				}
			}
		}
	}

	init() {
		// const doctor = new Doctor();
		// this.addChild(doctor);
	}
}
