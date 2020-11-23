import * as ECS from '@libs/pixi-ecs';
import { ACTION, CONTAINER, BLOCK_SIZE, MAZE, SPEED_PLAYER, MAP } from '@packages/constants';

export class MovementInitiator extends ECS.Component {
	userInput: ECS.KeyInputComponent = null;
	position = {
		x: CONTAINER.small.width / 2,
		y: CONTAINER.small.height / 2,
	};

	onInit() {
		// Listen user input
		this.userInput = this.scene.findGlobalComponentByName<ECS.KeyInputComponent>(
			ECS.KeyInputComponent.name,
		);

		// Listen collisions with teleports
		this.subscribe(ACTION.COLLISION_WITH_TELEPORT);
	}

	onUpdate(delta: number, absolute: number) {
		let x = 0;
		let y = 0;
		const distance = delta * SPEED_PLAYER;

		if (this.userInput.isKeyPressed(ECS.Keys.KEY_D)) {
			if (this._canStepAt(distance, 0)) x += distance;
		}

		if (this.userInput.isKeyPressed(ECS.Keys.KEY_A)) {
			if (this._canStepAt(-distance, 0)) x -= distance;
		}

		if (this.userInput.isKeyPressed(ECS.Keys.KEY_W)) {
			if (this._canStepAt(0, -distance)) y -= distance;
		}

		if (this.userInput.isKeyPressed(ECS.Keys.KEY_S)) {
			if (this._canStepAt(0, distance)) y += distance;
		}

		// If was movement - notify
		if (x != 0 || y != 0) {
			this._notifyAboutMovement(x, y);
		}
	}

	onMessage(msg: ECS.Message): any {
		if (msg.action === ACTION.COLLISION_WITH_TELEPORT) {
			const { destination } = msg.data;

			const shiftX = destination[0] - this.position.x;
			const shiftY = destination[1] - this.position.y;

			this._notifyAboutMovement(shiftX, shiftY);
		}
	}

	_notifyAboutMovement(shiftX, shiftY) {
		this.sendMessage(ACTION.MOVEMENT, [shiftX, shiftY]);
		this.position.x += shiftX;
		this.position.y += shiftY;
		this.sendMessage(ACTION.MOVEMENT_OF_PERSON, {
			x: this.position.x,
			y: this.position.y,
		});
	}

	_canStepAt = (x, y) => {
		const nextX = this.position.x + x;
		const nextY = this.position.y + y;

		const nextYT = nextY;
		const nextXR = nextX + 0.25 * BLOCK_SIZE;
		const nextYB = nextY + 0.5 * BLOCK_SIZE;
		const nextXL = nextX - 0.25 * BLOCK_SIZE;

		/**
		 * Q1 | _ | Q2
		 * __ | _ | __
		 * Q3 | _ | Q4
		 */
		const Q1 = [~~(nextXL / BLOCK_SIZE), ~~(nextYT / BLOCK_SIZE)];
		const Q2 = [~~(nextXR / BLOCK_SIZE), ~~(nextYT / BLOCK_SIZE)];
		const Q3 = [~~(nextXL / BLOCK_SIZE), ~~(nextYB / BLOCK_SIZE)];
		const Q4 = [~~(nextXR / BLOCK_SIZE), ~~(nextYB / BLOCK_SIZE)];

		return (
			MAZE.matrix[Q1[1]][Q1[0]] === 0 &&
			MAZE.matrix[Q2[1]][Q2[0]] === 0 &&
			MAZE.matrix[Q3[1]][Q3[0]] === 0 &&
			MAZE.matrix[Q4[1]][Q4[0]] === 0
		);
	};
}