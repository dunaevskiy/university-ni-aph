import * as PIXI from 'pixi.js';
import * as ECS from '@libs/pixi-ecs';

import { containerBigHeight, containerBigWidth, VIEWPORT } from '../constants';
import { MovingReverseComponent } from '../components';
import { loader } from '../loader';

export class GardenContainer extends ECS.Container {
	constructor() {
		super();
		this.pivot.set(containerBigWidth / 2, containerBigHeight / 2);
		this.position.set(VIEWPORT.size.width / 2, VIEWPORT.size.height / 2);

		this.addComponent(new MovingReverseComponent());

		const garden = new PIXI.TilingSprite(
			loader.resources.grass01.texture,
			containerBigWidth,
			containerBigHeight,
		);
		garden.zIndex = 1;
		this.addChild(garden);

		for (let r = 0; r < containerBigWidth; r += 80) {
			for (let c = 0; c < containerBigHeight; c += 80) {
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
}
