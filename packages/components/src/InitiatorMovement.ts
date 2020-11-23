import * as ECS from '@libs/pixi-ecs';
import { ACTION, CONTAINER, BLOCK_SIZE, MAZE, SPEED_PLAYER } from '@packages/constants';

export class InitiatorMovement extends ECS.Component {
	state = {
		x: CONTAINER.small.width / 2,
		y: CONTAINER.small.height / 2,
	};

	onInit() {
		this.subscribe(ACTION.TELEPORT_PERSON);
	}

	onUpdate(delta: number, absolute: number) {
		let cmp = this.scene.findGlobalComponentByName<ECS.KeyInputComponent>(
			ECS.KeyInputComponent.name,
		);

		const distance = delta * SPEED_PLAYER;
		let shiftX = 0;
		let shiftY = 0;

		if (cmp.isKeyPressed(ECS.Keys.KEY_D)) {
			if (this._canStepAt(distance, 0)) shiftX += distance;
		}

		if (cmp.isKeyPressed(ECS.Keys.KEY_A)) {
			if (this._canStepAt(-distance, 0)) shiftX -= distance;
		}

		if (cmp.isKeyPressed(ECS.Keys.KEY_W)) {
			if (this._canStepAt(0, -distance)) shiftY -= distance;
		}

		if (cmp.isKeyPressed(ECS.Keys.KEY_S)) {
			if (this._canStepAt(0, distance)) shiftY += distance;
		}

		// If was movement - send message
		if (shiftX != 0 || shiftY != 0) {
			this._notifyAboutMovement(shiftX, shiftY);
		}
	}

	onMessage(msg: ECS.Message): any {
		if (msg.action === ACTION.TELEPORT_PERSON) {
			const { destination } = msg.data;

			const shiftX = destination[0] - this.state.x;
			const shiftY = destination[1] - this.state.y;

			this._notifyAboutMovement(shiftX, shiftY);
		}
	}

	_notifyAboutMovement(shiftX, shiftY) {
		this.sendMessage(ACTION.MOVEMENT, [shiftX, shiftY]);
		this.state.x += shiftX;
		this.state.y += shiftY;
		this.sendMessage(ACTION.MOVEMENT_MC_NOTIFICATION, {
			x: this.state.x,
			y: this.state.y,
		});
	}

	_canStepAt = (x, y) => {
		const nextX = this.state.x + x;
		const nextY = this.state.y + y;

		const nextYT = nextY;
		const nextXR = nextX + 0.25 * BLOCK_SIZE;
		const nextYB = nextY + 0.5 * BLOCK_SIZE;
		const nextXL = nextX - 0.25 * BLOCK_SIZE;

		/**
		 * Q1 | _ | Q2
		 * __ | _ | __
		 * Q3 | _ | Q4
		 */
		const Q1 = [Math.floor(nextXL / BLOCK_SIZE), Math.floor(nextYT / BLOCK_SIZE)];
		const Q2 = [Math.floor(nextXR / BLOCK_SIZE), Math.floor(nextYT / BLOCK_SIZE)];
		const Q3 = [Math.floor(nextXL / BLOCK_SIZE), Math.floor(nextYB / BLOCK_SIZE)];
		const Q4 = [Math.floor(nextXR / BLOCK_SIZE), Math.floor(nextYB / BLOCK_SIZE)];

		return (
			MAZE.matrix[Q1[1]][Q1[0]] === 0 &&
			MAZE.matrix[Q2[1]][Q2[0]] === 0 &&
			MAZE.matrix[Q3[1]][Q3[0]] === 0 &&
			MAZE.matrix[Q4[1]][Q4[0]] === 0
		);
	};
}
