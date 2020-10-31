import * as ECS from '@libs/pixi-ecs';
import * as _ from 'lodash';

import mazes from '../maze.json5';

export class InitiatorMovement extends ECS.Component {
	onUpdate(delta: number, absolute: number) {
		let cmp = this.scene.findGlobalComponentByName<ECS.KeyInputComponent>(
			ECS.KeyInputComponent.name,
		);

		const distance = delta * 0.2;
		let coodrsShift = [0, 0];
		// const distance = Math.ceil(delta * 0.2);

		if (cmp.isKeyPressed(ECS.Keys.KEY_D) && this._hasCollisionMaze(this.owner, distance, 0)) {
			const [x, y] = coodrsShift;
			coodrsShift = [x + distance, y];
		}

		if (cmp.isKeyPressed(ECS.Keys.KEY_A) && this._hasCollisionMaze(this.owner, -distance, 0)) {
			const [x, y] = coodrsShift;
			coodrsShift = [x - distance, y];
		}

		if (cmp.isKeyPressed(ECS.Keys.KEY_W) && this._hasCollisionMaze(this.owner, 0, -distance)) {
			const [x, y] = coodrsShift;
			coodrsShift = [x, y - distance];
		}

		if (cmp.isKeyPressed(ECS.Keys.KEY_S) && this._hasCollisionMaze(this.owner, 0, distance)) {
			const [x, y] = coodrsShift;
			coodrsShift = [x, y + distance];
		}

		if (!_.isEqual(coodrsShift, [0, 0])) {
			this.sendMessage('MOVE_IT', coodrsShift);
		}
	}

	_hasCollisionMaze = (obj, x, y) => {
		const nextYT = obj.position.y + 6 + 4 + y;
		const nextXL = obj.position.x + 6 + x;
		const nextXR = obj.position.x - 6 + x;
		const nextYB = obj.position.y + 6 + y;
		const quadrant1 = [Math.floor(nextXL / 24), Math.floor(nextYT / 24)];
		const quadrant2 = [Math.floor(nextXL / 24), Math.floor(nextYB / 24)];
		const quadrant3 = [Math.floor(nextXR / 24), Math.floor(nextYT / 24)];
		const quadrant4 = [Math.floor(nextXR / 24), Math.floor(nextYB / 24)];
		return (
			mazes.mapsHexa.alpha[quadrant1[1]][quadrant1[0]] !== 1 &&
			mazes.mapsHexa.alpha[quadrant2[1]][quadrant2[0]] !== 1 &&
			mazes.mapsHexa.alpha[quadrant3[1]][quadrant3[0]] !== 1 &&
			mazes.mapsHexa.alpha[quadrant4[1]][quadrant4[0]] !== 1
		);
	};
}
