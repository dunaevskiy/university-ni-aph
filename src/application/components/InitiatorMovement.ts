import * as ECS from '@libs/pixi-ecs';

import { ACTION, CONTAINER, BLOCK_SIZE, MAZE, SPEED_PLAYER } from '../constants';

export class InitiatorMovement extends ECS.Component {
	state = {
		x: CONTAINER.small.width / 2,
		y: CONTAINER.small.height / 2,
	};

	onUpdate(delta: number, absolute: number) {
		let cmp = this.scene.findGlobalComponentByName<ECS.KeyInputComponent>(
			ECS.KeyInputComponent.name,
		);

		const distance = delta * SPEED_PLAYER;
		let shiftX = 0;
		let shiftY = 0;
		// const distance = Math.ceil(delta * 0.2);

		if (cmp.isKeyPressed(ECS.Keys.KEY_D)) {
			if (this._hasCollisionMaze(this.owner, distance, 0) != 1) shiftX += distance;
		}

		if (cmp.isKeyPressed(ECS.Keys.KEY_A)) {
			if (this._hasCollisionMaze(this.owner, -distance, 0) != 1) shiftX -= distance;
		}

		if (cmp.isKeyPressed(ECS.Keys.KEY_W)) {
			if (this._hasCollisionMaze(this.owner, 0, -distance) != 1) shiftY -= distance;
		}

		if (cmp.isKeyPressed(ECS.Keys.KEY_S)) {
			if (this._hasCollisionMaze(this.owner, 0, distance) != 1) shiftY += distance;
		}

		// if (this._hasCollisionMaze(null, shiftX, shiftY) == 7) {
		// 	const tp = maps.teleporters['0x7'];
		// 	const newcoord = [tp[0] * BLOCK_SIZE - this.state.x, tp[1] * BLOCK_SIZE - this.state.y];
		// 	shiftX = newcoord[0];
		// 	shiftY = newcoord[1];
		// }

		// If was movement - send message
		if (shiftX != 0 || shiftY != 0) {
			this.sendMessage(ACTION.MOVEMENT, [shiftX, shiftY]);
			this.state.x += shiftX;
			this.state.y += shiftY;
			this.sendMessage(ACTION.MOVEMENT_MC_NOTIFICATION, { x: this.state.x, y: this.state.y });
		}
	}

	_hasCollisionMaze = (obj, x, y): number => {
		const doctorX = this.state.x + x;
		const doctorY = this.state.y + y;
		return MAZE.matrix[Math.floor(doctorY / BLOCK_SIZE)][Math.floor(doctorX / BLOCK_SIZE)];

		// const nextYT = obj.position.y + 6 + 4 + y;
		// const nextXL = obj.position.x + 6 + x;
		// const nextXR = obj.position.x - 6 + x;
		// const nextYB = obj.position.y + 6 + y;
		// const quadrant1 = [Math.floor(nextXL / 24), Math.floor(nextYT / 24)];
		// const quadrant2 = [Math.floor(nextXL / 24), Math.floor(nextYB / 24)];
		// const quadrant3 = [Math.floor(nextXR / 24), Math.floor(nextYT / 24)];
		// const quadrant4 = [Math.floor(nextXR / 24), Math.floor(nextYB / 24)];
		//
		// return (
		// 	MAZE.matrix[quadrant1[1]][quadrant1[0]] !== 1 &&
		// 	MAZE.matrix[quadrant2[1]][quadrant2[0]] !== 1 &&
		// 	MAZE.matrix[quadrant3[1]][quadrant3[0]] !== 1 &&
		// 	MAZE.matrix[quadrant4[1]][quadrant4[0]] !== 1
		// );
	};
}
