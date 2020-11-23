import * as PIXI from 'pixi.js';

import { loader } from '@packages/utils';
import { CONTAINER } from '@packages/constants';

export class Grass extends PIXI.TilingSprite {
	constructor() {
		super(loader.resources.grass01.texture, CONTAINER.big.width, CONTAINER.big.height);
	}
}
