import 'pixi-filters';

import * as ECS from '@libs/pixi-ecs';
import { VIEWPORT } from '@packages/constants';
import { Doctor, Map, Stats } from '@packages/containers';
import { loadResources } from '@packages/utils';

import { RESOURCES } from '../assets';

class App {
	engine: ECS.Engine;

	constructor() {
		this.engine = new ECS.Engine();
		let canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;

		this.engine.init(canvas, {
			width: VIEWPORT.width,
			height: VIEWPORT.height,
			antialias: false,
			resolution: 1,
		});

		this.engine.scene.addGlobalComponent(new ECS.KeyInputComponent());

		const containerGarden = new Map();
		this.engine.scene.stage.addChild(containerGarden);
		containerGarden.init();

		const doctor = new Doctor();
		this.engine.scene.stage.addChild(doctor);

		let hole = new PIXI.Graphics();
		hole.beginFill(0x111111);
		hole.drawRect(0, 0, VIEWPORT.width, VIEWPORT.height);
		hole.endFill();
		hole.beginFill(0xcccccc);
		hole.drawCircle(VIEWPORT.width / 2, VIEWPORT.height / 2, 300);
		hole.endFill();
		hole.filters = [new PIXI.filters.BlurFilter(150, 10)];
		hole.filters[0].blendMode = PIXI.BLEND_MODES.MULTIPLY;
		hole.filterArea = new PIXI.Rectangle(0, 0, VIEWPORT.width, VIEWPORT.height);

		this.engine.scene.stage.addChild(hole);

		const containerStats = new Stats();
		this.engine.scene.stage.addChild(containerStats);
		containerStats.init();
	}
}

(async () => {
	await loadResources(RESOURCES);
	new App();
})();
