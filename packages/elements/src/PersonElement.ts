import { MovementInitiator } from '@packages/components';
import { loader } from '@packages/utils';

import { Element } from './Element';

export class PersonElement extends Element {
	constructor() {
		super('doctor', loader.resources.doctor01.texture);
	}

	init() {
		this.addComponent(new MovementInitiator());
	}
}
