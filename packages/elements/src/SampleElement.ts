import { loader, randomBetween } from '@packages/utils';
import { CollisionCollectable } from '@packages/components';

import { Element } from './Element';

export class SampleElement extends Element {
	constructor() {
		const number = randomBetween(1, 3);

		super('sample', loader.resources[`sample0${number}`].texture, 32);

		this.addComponent(new CollisionCollectable());
	}
}
