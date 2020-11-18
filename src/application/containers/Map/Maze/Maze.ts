import * as PIXI from 'pixi.js';
import * as ECS from '@libs/pixi-ecs';

import {
	containerBigHeight,
	containerBigWidth,
	containerSmallHeightShift,
	containerSmallWidthShift,
	BLOCK_SIZE,
	MAZE,
} from '../../../constants';
import { loader } from '../../../loader';
import { Monster } from './Monster';

export class Maze extends ECS.Container {
	monster = new Monster();

	constructor() {
		super();
		this.pivot.set(containerSmallWidthShift, containerSmallHeightShift);
		this.position.set(containerBigWidth / 2, containerBigHeight / 2);

		for (let r = 0; r < MAZE.blocksCountY; r++) {
			for (let c = 0; c < MAZE.blocksCountX; c++) {
				// Generate wall
				if (MAZE.matrix[r][c] == 0x1) {
					let wall =
						r == MAZE.matrix.length - 1 || MAZE.matrix[r + 1][c] == 0 || MAZE.matrix[r + 1][c] == 9
							? loader.resources.wall02
							: loader.resources.wall01;
					// let wall = loader.resources.wall01;

					const rectangle = new PIXI.Sprite(wall.texture);
					rectangle.position.set(c * BLOCK_SIZE, r * BLOCK_SIZE);
					this.addChild(rectangle);
					continue;
				}

				if (MAZE.matrix[r][c] == 0x0) {
					// Generate floor
					let floor =
						r > 1 && MAZE.matrix[r - 1][c] == 1
							? loader.resources.floor02
							: loader.resources.floor01;

					// let floor = loader.resources.floor01;
					if (floor == loader.resources.floor01 && Math.random() > 0.8)
						floor = loader.resources.floor03;

					const rectangle = new PIXI.Sprite(floor.texture);
					rectangle.position.set(c * BLOCK_SIZE, r * BLOCK_SIZE);
					this.addChild(rectangle);
				}

				/**
				 * Object on the floor
				 */

				if (MAZE.matrix[r][c] == 0x7) {
					let teleport = loader.resources.teleport01.texture;
					const rectangle = new PIXI.Sprite(teleport);
					rectangle.position.set(c * BLOCK_SIZE, r * BLOCK_SIZE);
					this.addChild(rectangle);
				}
			}
		}
	}

	init() {
		this.addChild(this.monster);
		this.monster.position.set(containerSmallWidthShift, containerSmallHeightShift - 100);
	}
}
