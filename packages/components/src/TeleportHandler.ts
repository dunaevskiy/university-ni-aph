import * as ECS from '@libs/pixi-ecs';

export class TeleportHandler extends ECS.Component {
	teleportAction: string;

	constructor(teleportActionName) {
		super();

		this.teleportAction = teleportActionName;
	}

	onInit() {
		this.subscribe(this.teleportAction);
	}

	onMessage(msg: ECS.Message): any {
		if (msg.action === this.teleportAction) {
			const destination = msg.data;
			const x = this.owner.position.x;
			const y = this.owner.position.y;
			const [nextX, nextY] = [destination[0] - x, destination[1] - y];

			this.owner.position.x = nextX;
			this.owner.position.y = nextY;
		}
	}
}
