import * as PIXI from 'pixi.js';

import * as ECS from '@libs/pixi-ecs';
import { CONTAINER, BLOCK_SIZE, MAZE, MAP } from '@packages/constants';
import { Monster, Sample, Teleport } from '@packages/elements';
import { loader } from '@packages/utils';

export class Maze extends ECS.Container {
	monster = new Monster();

	constructor() {
		super();
		this.pivot.set(CONTAINER.small.width / 2, CONTAINER.small.height / 2);
		this.position.set(CONTAINER.big.width / 2, CONTAINER.big.height / 2);

		this._renderBuilding();
	}

	init() {
		this._renderTeleports();
		this._renderSamples();
		this.addChild(this.monster);
		this.monster.position.set(CONTAINER.small.width / 2, CONTAINER.small.height / 2 - 100);
	}

	_renderBuilding() {
		for (let r = 0; r < MAZE.yBlocksNumber; r++) {
			for (let c = 0; c < MAZE.xBlocksNumber; c++) {
				if (MAZE.matrix[r][c] == 0x1) {
					this._renderWall(r, c);
					continue;
				}

				if (MAZE.matrix[r][c] == 0x0) {
					this._renderFloor(r, c);
				}
			}
		}
	}

	_renderWall(row, column) {
		let wall =
			row == MAZE.matrix.length - 1 ||
			MAZE.matrix[row + 1][column] == 0 ||
			MAZE.matrix[row + 1][column] == 9
				? loader.resources.wall02
				: loader.resources.wall01;

		const rectangle = new PIXI.Sprite(wall.texture);
		rectangle.position.set(column * BLOCK_SIZE, row * BLOCK_SIZE);
		this.addChild(rectangle);
	}

	_renderFloor(row, column) {
		let floor =
			row > 1 && MAZE.matrix[row - 1][column] == 1
				? loader.resources.floor02
				: loader.resources.floor01;

		if (floor == loader.resources.floor01 && Math.random() > 0.8) floor = loader.resources.floor03;

		const rectangle = new PIXI.Sprite(floor.texture);
		rectangle.position.set(column * BLOCK_SIZE, row * BLOCK_SIZE);
		this.addChild(rectangle);
	}

	_renderTeleports() {
		for (let teleport of MAP.teleports) {
			const { from, to } = teleport;

			const elem = new Teleport(from, to);
			elem.position.set(from[0] * BLOCK_SIZE, from[1] * BLOCK_SIZE);
			this.addChild(elem);
		}
	}
	_renderSamples() {
		for (let sample of MAP.samples.initial) {
			const [x, y] = sample;

			const elem = new Sample();
			elem.position.set(x * BLOCK_SIZE, y * BLOCK_SIZE);
			this.addChild(elem);
		}
	}
}
