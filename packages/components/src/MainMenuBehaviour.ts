import * as ECS from '@libs/pixi-ecs';
import { ACTION } from '@packages/constants';
import { Message } from '@libs/pixi-ecs';

export class MainMenuBehaviour extends ECS.Component {
	onInit() {
		this.subscribe(ACTION.START_GAME);
		this.subscribe(ACTION.END_GAME);

		// @ts-ignore
		this.owner.menuStartGame.on('pointerdown', () => {
			this.scene.sendMessage(new Message(ACTION.START_GAME));
		});
	}

	onMessage(msg: ECS.Message): any {
		if (msg.action === ACTION.START_GAME) {
			// @ts-ignore
			this.owner.removeChild(this.owner.menuStartGame);
			// @ts-ignore
			this.owner.removeChild(this.owner.controlInfo1);
			// @ts-ignore
			this.owner.removeChild(this.owner.controlInfo2);
			// @ts-ignore
			this.owner.removeChild(this.owner.controlInfo3);
		}
		if (msg.action === ACTION.END_GAME) {
			// @ts-ignore
			this.owner.addChild(this.owner.menuStartGame);
			// @ts-ignore
			this.owner.addChild(this.owner.controlInfo1);
			// @ts-ignore
			this.owner.addChild(this.owner.controlInfo2);
			// @ts-ignore
			this.owner.addChild(this.owner.controlInfo3);
		}
	}
}
