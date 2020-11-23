import { MovementInitiator } from '@packages/components';
import { loader } from '@packages/utils';

import { OneBlockElement } from './OneBlockElement';

export class Person extends OneBlockElement {
	constructor() {
		super('doctor', loader.resources.doctor01.texture);
	}

	init() {
		this.addComponent(new MovementInitiator());
	}
}
