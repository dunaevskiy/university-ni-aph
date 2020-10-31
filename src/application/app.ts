import * as PIXI from 'pixi.js';
import * as ECS from '@libs/pixi-ecs';

import { MovementBroker } from './brokers';

import { VIEWPORT } from './constants';
import { Doctor, GardenContainer, MazeContainer } from './containers';
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
} from '../assets';

PIXI.settings.ROUND_PIXELS = true;

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
			// resolution: 2,
		});

		const containerGarden = new GardenContainer();
		const containerMaze = new MazeContainer();
		const doctor = new Doctor();

		this.engine.scene.stage.addChild(containerGarden);
		containerGarden.addChild(containerMaze);
		containerMaze.addChild(doctor);

		this.engine.scene.addGlobalComponent(new ECS.KeyInputComponent());
		this.engine.scene.addGlobalComponent(new MovementBroker());
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
	]);

	new App();
})();
