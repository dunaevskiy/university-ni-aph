import 'pixi-filters';

import * as ECS from '@libs/pixi-ecs';
import { VIEWPORT } from '@packages/constants';
import { Map, ControlPanel } from '@packages/containers';
import { loadResources } from '@packages/utils';
import { Flashlight, PersonElement } from '@packages/elements';

import { RESOURCES } from '../assets';

PIXI.settings.ROUND_PIXELS = true;

window['WebFontConfig'] = {
	google: {
		families: ['Major Mono Display'],
	},

	active() {
		(async () => {
			await loadResources(RESOURCES);
			new App();
		})();
	},
};
/* eslint-disable */
// include the web-font loader script
(function () {
	const wf = document.createElement('script');
	wf.src = `${
		document.location.protocol === 'https:' ? 'https' : 'http'
	}://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
	wf.type = 'text/javascript';
	wf.async = true;
	const s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
})();
/* eslint-enabled */

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
			// resolution: 0.25,
		});

		this.engine.scene.addGlobalComponent(new ECS.KeyInputComponent());

		this._renderScene();
	}

	_renderScene() {
		const map = new Map();
		this.engine.scene.stage.addChild(map);
		map.init();

		const person = new PersonElement();
		this.engine.scene.stage.addChild(person);
		person.position.set(VIEWPORT.width / 2, VIEWPORT.height / 2);
		person.init();

		const flashlight = new Flashlight();
		this.engine.scene.stage.addChild(flashlight);

		const controlInterface = new ControlPanel();
		this.engine.scene.stage.addChild(controlInterface);
		controlInterface.init();
	}
}
