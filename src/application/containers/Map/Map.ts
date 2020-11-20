import * as PIXI from 'pixi.js';
import * as ECS from '@libs/pixi-ecs';

import { CONTAINER, VIEWPORT } from '../../constants';
import { MovingReverseComponent } from '../../components';
import { loader } from '../../loader';
import { Maze } from './Maze/Maze';

export class Map extends ECS.Container {
	maze = new Maze();

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

		for (let r = 0; r < CONTAINER.big.width; r += 80) {
			for (let c = 0; c < CONTAINER.big.height; c += 80) {
				const rnd = Math.random();
				if (rnd > 0) {
					let bush = loader.resources.bush01;
					const rectangle = new PIXI.Sprite(bush.texture);
					rectangle.position.set(c + rnd * 100, r + rnd * 100);
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
