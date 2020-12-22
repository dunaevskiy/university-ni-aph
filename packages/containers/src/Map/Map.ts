import * as PIXI from 'pixi.js';

import * as ECS from '@libs/pixi-ecs';
import { CONTAINER, VIEWPORT } from '@packages/constants';
import { MovementListener } from '@packages/components';
import { RandomPlant } from '@packages/elements';
import { loader } from '@packages/utils';

import { Maze } from './Maze';

export class Map extends ECS.Container {
	maze: Maze = new Maze();

	constructor() {
		super();
		this.pivot.set(CONTAINER.big.width / 2, CONTAINER.big.height / 2);
		this.position.set(VIEWPORT.width / 2, VIEWPORT.height / 2);

		// Init graphics
		this._initGrass();
		this._initForest();

		// Add reverse player movement
		this.addComponent(new MovementListener());
	}

	init() {
		this.addChild(this.maze);
		this.maze.init();
	}

	/**
	 * Generate grass everywhere
	 */
	_initGrass() {
		const grass = new PIXI.TilingSprite(
			loader.resources.grass01.texture,
			CONTAINER.big.width,
			CONTAINER.big.height,
		);
		this.addChild(grass);
	}

	/**
	 * Generate random garden elements (trees, flowers)
	 */
	_initForest() {
		for (let r = 0; r < CONTAINER.big.height; r += 50) {
			for (let c = 0; c < CONTAINER.big.width; c += 50) {
				// Skip if it is the Maze territory
				if (
					r > VIEWPORT.height / 2 - 150 &&
					r < VIEWPORT.height / 2 + CONTAINER.small.height + 80 &&
					c > VIEWPORT.width / 2 - 150 &&
					c < VIEWPORT.width / 2 + CONTAINER.small.width + 80
				)
					continue;

				const decision = Math.random() > 0.3;
				if (decision) {
					const gardenElement = new RandomPlant(c, r);
					this.addChild(gardenElement);
				}
			}
		}
	}
}
