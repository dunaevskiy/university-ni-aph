import * as PIXI from 'pixi.js';

import { loader, randomBetween } from '@packages/utils';

export class RandomPlant extends PIXI.Sprite {
	constructor(x, y) {
		const rnd = randomBetween(0, 30);

		let texture =
			rnd > 20
				? loader.resources.bush01
				: rnd > 10
				? loader.resources.tree01
				: loader.resources.flower01;

		super(texture.texture);

		const relativeError = 50;
		this.position.set(
			x + randomBetween(-relativeError, relativeError),
			y + randomBetween(-relativeError, relativeError),
		);
	}
}
