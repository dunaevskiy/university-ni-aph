import * as PIXI from 'pixi.js';
import * as ECS from '@libs/pixi-ecs';
import packageJson from '../../../package.json';

import { loader } from '../loader';
import { VIEWPORT } from '../constants';

export class StatsContainer extends ECS.Container {
	constructor() {
		super();
		this.position.set(0, 0);

		const style = new PIXI.TextStyle({
			fontFamily: 'Arial',
			fontSize: 24,
			fill: '#ffffff',
			dropShadow: true,
			dropShadowColor: '#000000',
			dropShadowBlur: 4,
			dropShadowAngle: Math.PI / 6,
			dropShadowDistance: 6,
			wordWrap: true,
			wordWrapWidth: 440,
			lineJoin: 'round',
		});

		const styleSmall = new PIXI.TextStyle({
			fontFamily: 'Arial',
			fontSize: 12,
			fill: '#ffffff',
		});

		const styleLogo = new PIXI.TextStyle({
			fontFamily: 'Arial',
			fontSize: 42,
			fill: '#ffffff',
		});

		const padding = 16;

		const logo = new PIXI.Text('THE LAB', styleLogo);
		logo.position.set(padding, padding);
		this.addChild(logo);

		const collectedSamplesIcon = new PIXI.Sprite(loader.resources.sample01.texture);
		collectedSamplesIcon.position.set(padding, VIEWPORT.size.height - padding - 32);
		collectedSamplesIcon.width = 32;
		collectedSamplesIcon.height = 32;
		this.addChild(collectedSamplesIcon);

		const collectedSamplesCount = new PIXI.Text('126', style);
		collectedSamplesCount.position.set(padding + 32 + padding, VIEWPORT.size.height - padding - 32);
		this.addChild(collectedSamplesCount);

		const version = new PIXI.Text(`v${packageJson.version}`, styleSmall);
		version.pivot.set(padding, VIEWPORT.size.height - 100);
		version.position.set(VIEWPORT.size.width, VIEWPORT.size.height - padding - 32);
		this.addChild(version);
	}
}
