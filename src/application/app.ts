import * as ECS from '@libs/pixi-ecs';
import 'pixi-filters';

import { MovementBroker } from './brokers';
import { VIEWPORT } from './constants';
import { Doctor, GardenContainer, Stats } from './containers';
import { loadResources } from './loader';
import {
	floor01,
	floor02,
	floor03,
	wall01,
	wall02,
	sample01,
	sample02,
	doctor01,
	grass01,
	bush01,
	teleport01,
	teleport02,
	monster01,
} from '../assets';

class App {
	engine: ECS.Engine;

	constructor() {
		this.engine = new ECS.Engine();
		let canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;

		this.engine.init(canvas, {
			width: VIEWPORT.size.width,
			height: VIEWPORT.size.height,
			antialias: false,
			resolution: 1,
		});

		this.engine.scene.addGlobalComponent(new ECS.KeyInputComponent());
		this.engine.scene.addGlobalComponent(new MovementBroker());

		const containerGarden = new GardenContainer();
		this.engine.scene.stage.addChild(containerGarden);
		containerGarden.init();

		const doctor = new Doctor();
		this.engine.scene.stage.addChild(doctor);

		let hole = new PIXI.Graphics();
		hole.beginFill(0x111111);
		hole.drawRect(0, 0, VIEWPORT.size.width, VIEWPORT.size.height);
		hole.endFill();
		hole.beginFill(0xcccccc);
		hole.drawCircle(VIEWPORT.size.width / 2, VIEWPORT.size.height / 2, 300);
		hole.endFill();
		hole.filters = [new PIXI.filters.BlurFilter(150, 10)];
		hole.filters[0].blendMode = PIXI.BLEND_MODES.MULTIPLY;
		hole.filterArea = new PIXI.Rectangle(0, 0, VIEWPORT.size.width, VIEWPORT.size.height);

		this.engine.scene.stage.addChild(hole);

		const containerStats = new Stats();
		this.engine.scene.stage.addChild(containerStats);
		containerStats.init();
	}
}

(async () => {
	await loadResources([
		{ name: 'floor01', url: floor01 },
		{ name: 'floor02', url: floor02 },
		{ name: 'floor03', url: floor03 },
		{ name: 'wall01', url: wall01 },
		{ name: 'wall02', url: wall02 },
		{ name: 'sample01', url: sample01 },
		{ name: 'sample02', url: sample02 },
		{ name: 'doctor01', url: doctor01 },
		{ name: 'grass01', url: grass01 },
		{ name: 'bush01', url: bush01 },
		{ name: 'teleport01', url: teleport01 },
		{ name: 'teleport02', url: teleport02 },
		{ name: 'monster01', url: monster01 },
	]);

	new App();
})();
