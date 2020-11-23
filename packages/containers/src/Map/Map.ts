import * as ECS from '@libs/pixi-ecs';
import { CONTAINER, VIEWPORT } from '@packages/constants';
import { Movement } from '@packages/components';
import { Grass, RandomGardenElement } from '@packages/elements';

import { Maze } from './Maze';

export class Map extends ECS.Container {
	maze: Maze = new Maze();

	constructor() {
		super();
		this.pivot.set(CONTAINER.big.width / 2, CONTAINER.big.height / 2);
		this.position.set(VIEWPORT.width / 2, VIEWPORT.height / 2);

		this.addComponent(new Movement());

		// Generate grass background
		const grass = new Grass();
		this.addChild(grass);

		// Generate random garden elements (trees, flowers)
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

				const decision = Math.random() > 0.0;
				if (decision) {
					const gardenElement = new RandomGardenElement(c, r);
					this.addChild(gardenElement);
				}
			}
		}
	}

	init() {
		this.addChild(this.maze);
		this.maze.init();
	}
}
