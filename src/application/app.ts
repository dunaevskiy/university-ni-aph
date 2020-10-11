import * as PIXI from 'pixi.js';
import img from '../assets/node.png';

const loader = new PIXI.Loader();

const loadResource = list =>
	new Promise(res => {
		loader.add(list).load(res);
	});

(async () => {
	await loadResource([
		{
			name: 'background',
			url: img,
		},
	]);

	new PixiBoot();
})();

class PixiBoot extends PIXI.Application {
	private readonly exampleObject: PIXI.Sprite;
	private keys: object;

	constructor() {
		super({
			view: <HTMLCanvasElement>document.getElementById('gameCanvas'),
			backgroundColor: 0x000000,
			width: 800,
			height: 600,
		});

		this.keys = {};

		// load a sprite
		this.exampleObject = new PIXI.Sprite(loader.resources.background.texture);
		// set anchor to the center
		this.exampleObject.anchor.set(0.5);
		// set position to the center of the screen
		this.exampleObject.x = this.screen.width / 2;
		this.exampleObject.y = this.screen.height / 2;

		// stage is a root element of the scene graph
		this.stage.addChild(this.exampleObject);

		// initialize game loop
		this.ticker.add(deltaTime => this.update(deltaTime));

		window.addEventListener('keydown', this.keysDown);
		window.addEventListener('keyup', this.keysUp);
	}

	keysUp = (e: any) => {
		this.keys[e.keyCode] = false;
	};

	keysDown = (e: any) => {
		this.keys[e.keyCode] = true;
	};

	// game loop, invoked 60times per second
	update = (deltaTime: number) => {
		// console.log(this.keys);
		if (this.keys['87']) {
			this.exampleObject.rotation -= 0.01 * deltaTime;
		} else {
			this.exampleObject.rotation += 0.01 * deltaTime;
		}
	};
}
