import 'pixi-filters';

import * as ECS from '@libs/pixi-ecs';
import { VIEWPORT } from '@packages/constants';
import { Map, Stats } from '@packages/containers';
import { loadResources } from '@packages/utils';
import { Flashlight, Person } from '@packages/elements';

import { RESOURCES } from '../assets';

PIXI.settings.ROUND_PIXELS = true;

class App {
	engine: ECS.Engine;

	constructor() {
		this.engine = new ECS.Engine();
		const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;

		this.engine.init(canvas, {
			width: VIEWPORT.width,
			height: VIEWPORT.height,
			antialias: false,
			resolution: 1,
			// resolution: 0.5,
		});

		this.engine.scene.addGlobalComponent(new ECS.KeyInputComponent());

		this._renderScene();
	}

	_renderScene() {
		const map = new Map();
		this.engine.scene.stage.addChild(map);
		map.init();

		const person = new Person();
		this.engine.scene.stage.addChild(person);
		person.position.set(VIEWPORT.width / 2, VIEWPORT.height / 2);

		const flashlight = new Flashlight();
		// this.engine.scene.stage.addChild(flashlight);

		const stats = new Stats();
		this.engine.scene.stage.addChild(stats);
		stats.init();
	}
}

(async () => {
	await loadResources(RESOURCES);
	new App();
})();
