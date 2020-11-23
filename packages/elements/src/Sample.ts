import { loader, randomBetween } from '@packages/utils';
import { CollisionCollectable } from '@packages/components';

import { OneBlockElement } from './OneBlockElement';

export class Sample extends OneBlockElement {
	constructor() {
		const number = randomBetween(1, 3);

		super('sample', loader.resources[`sample0${number}`].texture, 32);

		this.addComponent(new CollisionCollectable());
	}
}
