import { MovementChaser } from '@packages/components';
import { loader } from '@packages/utils';

import { OneBlockElement } from './OneBlockElement';

/**
 * Monster
 */
export class Monster extends OneBlockElement {
	constructor() {
		super('monster', loader.resources.monster01.texture);

		this.addComponent(new MovementChaser());
	}
}
