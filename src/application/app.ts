import * as PIXI from 'pixi.js';

class PixiBoot extends PIXI.Application {
	private readonly exampleObject: PIXI.Sprite;

	constructor() {
		super({
			view: <HTMLCanvasElement>document.getElementById('gameCanvas'),
			backgroundColor: 0x000000,
			width: 800,
			height: 600,
		});

		// load a sprite
		this.exampleObject = PIXI.Sprite.from('../assets/node.png');
		// set anchor to the center
		this.exampleObject.anchor.set(0.5);
		// set position to the center of the screen
		this.exampleObject.x = this.screen.width / 2;
		this.exampleObject.y = this.screen.height / 2;

		// stage is a root element of the scene graph
		this.stage.addChild(this.exampleObject);

		// initialize game loop
		this.ticker.add(deltaTime => this.update(deltaTime));
	}

	// game loop, invoked 60times per second
	update(deltaTime: number) {
		this.exampleObject.rotation -= 0.01 * deltaTime;
	}
}

new PixiBoot();
