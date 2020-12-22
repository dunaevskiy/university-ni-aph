import { MonsterBehaviour } from '@packages/components';
import { loader } from '@packages/utils';

import { Element } from './Element';

export class MonsterElement extends Element {
	constructor() {
		super('monster', loader.resources.monster01.texture);

		this.addComponent(new MonsterBehaviour());
	}
}
