import * as PIXI from 'pixi.js';

import * as ECS from '@libs/pixi-ecs';
import { CONTAINER, VIEWPORT } from '@packages/constants';
import { MovingReverseComponent } from '@packages/components';
import { loader, randomBetween } from '@packages/utils';

import { Maze } from './Maze';

export class Map extends ECS.Container {
	maze: Maze = new Maze();

	constructor() {
		super();
		this.pivot.set(CONTAINER.big.width / 2, CONTAINER.big.height / 2);
		this.position.set(VIEWPORT.width / 2, VIEWPORT.height / 2);

		this.addComponent(new MovingReverseComponent());

		const garden = new PIXI.TilingSprite(
			loader.resources.grass01.texture,
			CONTAINER.big.width,
			CONTAINER.big.height,
		);
		garden.zIndex = 1;
		this.addChild(garden);

		for (let r = 0; r < CONTAINER.big.height; r += 80) {
			for (let c = 0; c < CONTAINER.big.width; c += 80) {
				if (
					r > VIEWPORT.height / 2 - 200 &&
					r < CONTAINER.small.height + VIEWPORT.height / 2 - 50 &&
					c > VIEWPORT.width / 2 - 200 &&
					c < CONTAINER.small.width + VIEWPORT.width / 2 - 50
				)
					continue;
				const rnd = Math.random();
				if (rnd > 0.6) {
					let bush =
						rnd < 0.8
							? loader.resources.bush01
							: rnd > 0.9
							? loader.resources.tree01
							: loader.resources.flower01;
					const rectangle = new PIXI.Sprite(bush.texture);
					rectangle.position.set(c + randomBetween(-50, 50), r + randomBetween(-50, 50));
					rectangle.zIndex = 2;
					this.addChild(rectangle);
				}
			}
		}
	}

	init() {
		this.addChild(this.maze);
		this.maze.init();
	}
}
