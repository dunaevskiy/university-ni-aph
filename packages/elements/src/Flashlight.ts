import * as ECS from '@libs/pixi-ecs';
import { VIEWPORT } from '@packages/constants';
import { FlashlightBehaviour } from '@packages/components';

/**
 * A fullscreen mask as a flashlight
 */
export class Flashlight extends ECS.Graphics {
	constructor() {
		super();

		this.addComponent(new FlashlightBehaviour());
		this.turnOff();

		// Blend mode and blur
		this.filters = [new PIXI.filters.BlurFilter(150, 10)];
		this.filters[0].blendMode = PIXI.BLEND_MODES.MULTIPLY;
		this.filterArea = new PIXI.Rectangle(0, 0, VIEWPORT.width, VIEWPORT.height);
	}

	turnOn() {
		this.turnOff();

		// Light circle
		this.beginFill(0xcccccc);
		this.drawCircle(VIEWPORT.width / 2, VIEWPORT.height / 2, 300);
		this.endFill();
	}

	turnOff() {
		this.clear();

		// Dark screen
		this.beginFill(0x111111);
		this.drawRect(0, 0, VIEWPORT.width, VIEWPORT.height);
		this.endFill();
	}
}
