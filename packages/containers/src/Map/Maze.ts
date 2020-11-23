import * as PIXI from 'pixi.js';

import * as ECS from '@libs/pixi-ecs';
import { CONTAINER, BLOCK_SIZE, MAZE, MAP } from '@packages/constants';
import { Monster, Sample, Teleport } from '@packages/elements';
import { loader, randomBetween } from '@packages/utils';
import { SampleGenerator } from '@packages/components';

export class Maze extends ECS.Container {
	monster: Monster = new Monster();

	constructor() {
		super();
		this.pivot.set(CONTAINER.small.width / 2, CONTAINER.small.height / 2);
		this.position.set(CONTAINER.big.width / 2, CONTAINER.big.height / 2);

		this.addComponent(new SampleGenerator());

		this._renderBuilding();
	}

	init() {
		this._renderTeleports();
		this._renderSamples();
		this.addChild(this.monster);
		this.monster.position.set(CONTAINER.small.width / 2, CONTAINER.small.height / 2 - 100);
	}

	spawnSample() {
		this._addSampleAt();
	}

	_renderBuilding() {
		for (let r = 0; r < MAZE.yBlocksNumber; r++) {
			for (let c = 0; c < MAZE.xBlocksNumber; c++) {
				switch (MAZE.matrix[r][c]) {
					case 0x0:
						this._renderFloor(r, c);
						break;
					case 0x1:
						this._renderWall(r, c);
						break;
					default:
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
			const [nextX, nextY] = to;

			const elem = new Teleport([nextX * BLOCK_SIZE, nextY * BLOCK_SIZE]);
			elem.position.set(from[0] * BLOCK_SIZE, from[1] * BLOCK_SIZE);
			this.addChild(elem);
		}
	}

	_renderSamples() {
		// Generate initials
		for (let sample of MAP.samples.initial) {
			const [x, y] = sample;
			this._addSampleAt(x, y);
		}

		// Generate up to max
		for (let i = MAP.samples.initial.length; i < MAP.samples.max; i++) {
			this._addSampleAt();
		}
	}

	/**
	 * Generate a sample at X:Y (or random) and add it to maze
	 * @param x - Integer coordinate
	 * @param y - Integer coordinate
	 */
	_addSampleAt(
		x: number = randomBetween(0, MAZE.xBlocksNumber - 1),
		y: number = randomBetween(0, MAZE.yBlocksNumber - 1),
	) {
		let xCandidate = x;
		let yCandidate = y;

		while (true) {
			if (MAP.map[yCandidate][xCandidate] !== 0) {
				xCandidate = randomBetween(0, MAZE.xBlocksNumber - 1);
				yCandidate = randomBetween(0, MAZE.yBlocksNumber - 1);
				continue;
			}

			const elem = new Sample();
			elem.position.set(xCandidate * BLOCK_SIZE + 18, yCandidate * BLOCK_SIZE + 18);
			this.addChild(elem);
			break;
		}
	}
}
