import * as PIXI from 'pixi.js';
import * as ECS from '@libs/pixi-ecs';

import floor01 from '../assets/floor01.png';
import floor02 from '../assets/floor02.png';
import floor03 from '../assets/floor03.png';
import wall01 from '../assets/wall01.png';
import wall02 from '../assets/wall02.png';
import sample01 from '../assets/sample01.png';
import sample02 from '../assets/sample02.png';
import doctor01 from '../assets/doctor01.png';
import grass01 from '../assets/grass01.png';
import mazes from './maze.json5';

PIXI.settings.ROUND_PIXELS = true;

const FLAG_MOVING = 1;

class MovingComponent extends ECS.Component {
	onUpdate(delta: number, absolute: number) {
		let cmp = this.scene.findGlobalComponentByName<ECS.KeyInputComponent>(
			ECS.KeyInputComponent.name,
		);

		const distance = delta * 0.2;

		if (cmp.isKeyPressed(ECS.Keys.KEY_D) && this._hasCollisionMaze(this.owner, distance, 0)) {
			this.sendMessage('MOVE_IT', [distance, 0]);
			this.owner.position.x += distance;
		}

		if (cmp.isKeyPressed(ECS.Keys.KEY_A) && this._hasCollisionMaze(this.owner, -distance, 0)) {
			this.sendMessage('MOVE_IT', [-distance, 0]);
			this.owner.position.x += -distance;
		}

		if (cmp.isKeyPressed(ECS.Keys.KEY_W) && this._hasCollisionMaze(this.owner, 0, -distance)) {
			this.sendMessage('MOVE_IT', [0, -distance]);
			this.owner.position.y += -distance;
		}

		if (cmp.isKeyPressed(ECS.Keys.KEY_S) && this._hasCollisionMaze(this.owner, 0, distance)) {
			this.sendMessage('MOVE_IT', [0, distance]);
			this.owner.position.y += distance;
		}
	}

	_hasCollisionMaze = (obj, x, y) => {
		const nextYT = obj.position.y + 6 + 4 + y;
		const nextXL = obj.position.x + 6 + x;
		const nextXR = obj.position.x - 6 + x;
		const nextYB = obj.position.y + 6 + y;
		const quadrant1 = [Math.floor(nextXL / 24), Math.floor(nextYT / 24)];
		const quadrant2 = [Math.floor(nextXL / 24), Math.floor(nextYB / 24)];
		const quadrant3 = [Math.floor(nextXR / 24), Math.floor(nextYT / 24)];
		const quadrant4 = [Math.floor(nextXR / 24), Math.floor(nextYB / 24)];
		return (
			mazes.mapsHexa.alpha[quadrant1[1]][quadrant1[0]] !== 1 &&
			mazes.mapsHexa.alpha[quadrant2[1]][quadrant2[0]] !== 1 &&
			mazes.mapsHexa.alpha[quadrant3[1]][quadrant3[0]] !== 1 &&
			mazes.mapsHexa.alpha[quadrant4[1]][quadrant4[0]] !== 1
		);
	};
}

class MovingReverseComponent extends ECS.Component {
	state = [];

	onInit() {
		this.subscribe('MOVE_IT');
	}

	onMessage(msg: ECS.Message): any {
		if (msg.action === 'MOVE_IT') this.owner.setFlag(FLAG_MOVING);
	}

	onUpdate(delta: number, absolute: number) {
		if (this.owner.hasFlag(FLAG_MOVING)) {
			let cmp = this.scene.findGlobalComponentByName<ECS.KeyInputComponent>(
				ECS.KeyInputComponent.name,
			);

			if (cmp.isKeyPressed(ECS.Keys.KEY_D)) this.owner.position.x += delta * -0.2;
			if (cmp.isKeyPressed(ECS.Keys.KEY_A)) this.owner.position.x += delta * 0.2;
			if (cmp.isKeyPressed(ECS.Keys.KEY_W)) this.owner.position.y += delta * 0.2;
			if (cmp.isKeyPressed(ECS.Keys.KEY_S)) this.owner.position.y += delta * -0.2;

			this.owner.resetFlag(FLAG_MOVING);
		}
	}
}

class App {
	engine: ECS.Engine;

	constructor() {
		this.engine = new ECS.Engine();
		let canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;

		this.engine.init(canvas, {
			width: window.innerWidth,
			height: window.innerHeight,
			antialias: false,
			resolution: 1,
		});

		const mazeMatrix = mazes.mapsHexa.alpha;
		const mazeWidthBlocks = mazeMatrix[0].length;
		const mazeHeightBlocks = mazeMatrix.length;
		const mazeBlockSize = 24;

		const containerBigWidth = canvas.width * 2 + mazeWidthBlocks * mazeBlockSize;
		const containerBigWidthShift = (containerBigWidth / 2) * -1;
		const containerBigHeight = canvas.height * 2 + mazeHeightBlocks * mazeBlockSize;
		const containerBigHeightShift = (-containerBigHeight / 2) * -1;

		const containerGarden = new ECS.Container();
		containerGarden.pivot.set(containerBigWidth / 2, containerBigHeight / 2);
		containerGarden.width = containerBigWidth;
		containerGarden.height = containerBigHeight;
		containerGarden.position.set(canvas.width / 2, canvas.height / 2);

		const containerSmallWidth = mazeWidthBlocks * mazeBlockSize;
		const containerSmallWidthShift = containerSmallWidth / 2;
		const containerSmallHeight = mazeHeightBlocks * mazeBlockSize;
		const containerSmallHeightShift = containerSmallHeight / 2;

		/**
		 * Maze GUI generator
		 */
		const containerMaze = new ECS.Container();
		containerMaze.pivot.set(containerSmallWidthShift, containerSmallHeightShift);
		containerMaze.position.set(containerBigWidth / 2, containerBigHeight / 2);

		for (let r = 0; r < mazeHeightBlocks; r++) {
			for (let c = 0; c < mazeWidthBlocks; c++) {
				if (mazeMatrix[r][c] == 1) {
					// let wall =
					// 	r == mazes.maps.alpha[0].length - 1 || mazes.maps.alpha[r + 1][c] == 0
					// 		? loader.resources.wall02
					// 		: loader.resources.wall01;

					let wall = loader.resources.wall01;

					const rectangle = new PIXI.Sprite(wall.texture);
					rectangle.position.set(c * 24, r * 24);
					containerMaze.addChild(rectangle);
				} else {
					// let floor =
					// 	r > 1 && mazes.maps.alpha[r - 1][c] == 1
					// 		? loader.resources.floor02
					// 		: loader.resources.floor01;

					let floor = loader.resources.floor01;
					if (floor == loader.resources.floor01 && Math.random() > 0.7)
						floor = loader.resources.floor03;

					const rectangle = new PIXI.Sprite(floor.texture);
					rectangle.position.set(c * 24, r * 24);
					containerMaze.addChild(rectangle);
				}
			}
		}

		const garden = new PIXI.TilingSprite(
			loader.resources.grass01.texture,
			containerBigWidth,
			containerBigHeight,
		);

		const doctor = new ECS.Sprite('doctor', loader.resources.doctor01.texture);
		doctor.height = 24;
		doctor.width = 24;
		doctor.pivot.set(12, 12);
		doctor.position.set(containerSmallWidthShift, containerSmallHeightShift);

		containerGarden.addComponent(new MovingReverseComponent());
		doctor.addComponent(new MovingComponent());
		// containerMaze.addComponent(new MovingReverseComponent());

		// Graphics

		this.engine.scene.stage.addChild(containerGarden);
		containerGarden.addChild(garden);
		containerGarden.addChild(containerMaze);
		containerMaze.addChild(doctor);

		this.engine.scene.addGlobalComponent(new ECS.KeyInputComponent());
	}
}

const loader = new PIXI.Loader();

const loadResource = list =>
	new Promise(res => {
		loader.add(list).load(res);
	});

(async () => {
	await loadResource([
		{ name: 'floor01', url: floor01 },
		{ name: 'floor02', url: floor02 },
		{ name: 'floor03', url: floor03 },
		{ name: 'wall01', url: wall01 },
		{ name: 'wall02', url: wall02 },
		{ name: 'sample01', url: sample01 },
		{ name: 'sample02', url: sample02 },
		{ name: 'doctor01', url: doctor01 },
		{ name: 'grass01', url: grass01 },
	]);

	new App();
})();
