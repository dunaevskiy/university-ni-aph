import * as PIXI from 'pixi.js';
import mazes from './maze.json5';
import floor01 from '../assets/floor01.png';
import floor02 from '../assets/floor02.png';
import floor03 from '../assets/floor03.png';
import wall01 from '../assets/wall01.png';
import wall02 from '../assets/wall02.png';
import sample01 from '../assets/sample01.png';
import sample02 from '../assets/sample02.png';
import doctor01 from '../assets/doctor01.png';

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
	]);
	new PixiBoot();
})();

class PixiBoot extends PIXI.Application {
	private contMaze: PIXI.Container;
	private contItems: PIXI.Container;

	private readonly doctor: PIXI.Sprite;
	private readonly keys: object;

	constructor() {
		super({
			view: <HTMLCanvasElement>document.getElementById('gameCanvas'),
			backgroundColor: 0x000000,
			width: 720,
			height: 720,
		});

		this.keys = {};

		// stage is a root element of the scene graph
		// this.stage.addChild(this.exampleObject);

		this.contMaze = new PIXI.Container();
		this.contItems = new PIXI.Container();

		for (let r = 0; r < mazes.maps.alpha.length; r++) {
			for (let c = 0; c < mazes.maps.alpha[0].length; c++) {
				if (mazes.maps.alpha[r][c] == 1) {
					// const rectangle = PIXI.Sprite.from(PIXI.Texture.WHITE);
					let wall =
						r == mazes.maps.alpha[0].length - 1 || mazes.maps.alpha[r + 1][c] == 0
							? loader.resources.wall02
							: loader.resources.wall01;
					const rectangle = new PIXI.Sprite(wall.texture);
					rectangle.width = 24;
					rectangle.height = 24;
					rectangle.x = c * 24;
					rectangle.y = r * 24;
					rectangle.zIndex = 2;
					this.contMaze.addChild(rectangle);
				} else {
					let floor =
						r > 1 && mazes.maps.alpha[r - 1][c] == 1
							? loader.resources.floor02
							: loader.resources.floor01;

					if (floor == loader.resources.floor01 && Math.random() > 0.7)
						floor = loader.resources.floor03;

					const rectangle = new PIXI.Sprite(floor.texture);
					rectangle.width = 24;
					rectangle.height = 24;
					rectangle.x = c * 24;
					rectangle.y = r * 24;
					rectangle.zIndex = 2;
					this.contMaze.addChild(rectangle);
				}
			}
		}

		this.doctor = new PIXI.Sprite(loader.resources.doctor01.texture);
		this.doctor.width = 24;
		this.doctor.height = 24;
		this.doctor.x = 13 * 24;
		this.doctor.y = 15 * 24;
		this.doctor.zIndex = 3;
		this.contItems.addChild(this.doctor);

		const sampleSprite = new PIXI.Sprite(loader.resources.sample01.texture);
		sampleSprite.width = 18;
		sampleSprite.height = 18;
		sampleSprite.x = 15 * 24;
		sampleSprite.y = 15 * 24;
		sampleSprite.zIndex = 3;
		this.contItems.addChild(sampleSprite);

		const sampleSprite2 = new PIXI.Sprite(loader.resources.sample02.texture);
		sampleSprite2.width = 18;
		sampleSprite2.height = 18;
		sampleSprite2.x = 16 * 24;
		sampleSprite2.y = 15 * 24;
		sampleSprite2.zIndex = 3;
		this.contItems.addChild(sampleSprite2);

		this.stage.addChild(this.contMaze);
		this.stage.addChild(this.contItems);

		// initialize game loop
		this.ticker.add(deltaTime => this.update(deltaTime));

		// user events listen
		window.addEventListener('keydown', this.keysDown);
		window.addEventListener('keyup', this.keysUp);
	}

	keysUp = (e: any) => {
		this.keys[e.keyCode] = false;
	};

	keysDown = (e: any) => {
		this.keys[e.keyCode] = true;
	};

	hasCollisionWithMaze = (obj: PIXI.Sprite, x, y) => {
		const nextYT = obj.position.y + 16 + y;
		const nextXL = obj.position.x + 4 + x;
		const nextXR = obj.position.x - 4 + obj.width + x;
		const nextYB = obj.position.y + obj.height + y;
		const quadrant1 = [Math.floor(nextXL / 24), Math.floor(nextYT / 24)];
		const quadrant2 = [Math.floor(nextXL / 24), Math.floor(nextYB / 24)];
		const quadrant3 = [Math.floor(nextXR / 24), Math.floor(nextYT / 24)];
		const quadrant4 = [Math.floor(nextXR / 24), Math.floor(nextYB / 24)];
		return (
			mazes.maps.alpha[quadrant1[1]][quadrant1[0]] !== 1 &&
			mazes.maps.alpha[quadrant2[1]][quadrant2[0]] !== 1 &&
			mazes.maps.alpha[quadrant3[1]][quadrant3[0]] !== 1 &&
			mazes.maps.alpha[quadrant4[1]][quadrant4[0]] !== 1
		);
	};

	// game loop, invoked 60times per second
	update = (deltaTime: number) => {
		if (this.keys['65'] && this.hasCollisionWithMaze(this.doctor, -2, 0)) {
			this.contMaze.position.x -= -2;
			this.contItems.position.x -= -2;
			this.doctor.position.x -= 2;
		}

		if (this.keys['68'] && this.hasCollisionWithMaze(this.doctor, 2, 0)) {
			this.contMaze.position.x += -2;
			this.contItems.position.x += -2;
			this.doctor.position.x += 2;
		}

		if (this.keys['87'] && this.hasCollisionWithMaze(this.doctor, 0, -2)) {
			this.contMaze.position.y -= -2;
			this.contItems.position.y -= -2;
			this.doctor.position.y -= 2;
		}

		if (this.keys['83'] && this.hasCollisionWithMaze(this.doctor, 0, 2)) {
			this.contMaze.position.y += -2;
			this.contItems.position.y += -2;
			this.doctor.position.y += 2;
		}
	};
}
