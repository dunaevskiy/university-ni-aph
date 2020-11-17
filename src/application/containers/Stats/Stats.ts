import * as ECS from '@libs/pixi-ecs';

import { Logo } from './Logo';
import { CollectedItems } from './CollectedItems';
import { Version } from './Version';
import { P1, VIEWPORT } from '../../constants';

export class Stats extends ECS.Container {
	logo = new Logo();
	collectableItems = new CollectedItems();
	version = new Version();

	constructor() {
		super();
		this.position.set(0, 0);
	}

	init() {
		this.addChild(this.logo);
		this.logo.init();
		this.logo.position.set(P1, P1);

		this.addChild(this.collectableItems);
		this.collectableItems.init();
		this.collectableItems.position.set(P1, VIEWPORT.size.height - P1);
		this.collectableItems.pivot.set(0, this.collectableItems.height);

		this.addChild(this.version);
		this.version.init();
		this.version.position.set(VIEWPORT.size.width - P1, VIEWPORT.size.height - P1);
		this.version.pivot.set(this.version.width, this.version.height);
	}
}
