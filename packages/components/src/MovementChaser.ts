import EasyStar from 'easystarjs';

import * as ECS from '@libs/pixi-ecs';
import { ACTION, BLOCK_SIZE, MAP, MAZE, SPEED_MONSTER } from '@packages/constants';

// FIXME: move somewhere else
const easystar = new EasyStar.js();
easystar.setGrid(MAP.map);
easystar.setAcceptableTiles([0]);
easystar.enableDiagonals();

export class MovementChaser extends ECS.Component {
	state = {
		direction: -1,
		count: 10,
	};

	nextCoordinate = { x: 1, y: 1 };

	statePerson = { x: 1, y: 1 };
	statePersonLast = { x: 1, y: 1 };

	onInit() {
		this.subscribe(ACTION.MOVEMENT_MC_NOTIFICATION);
	}

	onMessage(msg): any {
		if (msg.action === ACTION.MOVEMENT_MC_NOTIFICATION) {
			this.statePerson = msg.data;
		}
	}

	onUpdate(delta: number) {
		// REFACTOR: reduce variables

		const myCoordX = Math.floor(this.owner.position.x / BLOCK_SIZE);
		const myCoordY = Math.floor(this.owner.position.y / BLOCK_SIZE);
		const hisCoordX = Math.floor(this.statePerson.x / BLOCK_SIZE);
		const hisCoordY = Math.floor(this.statePerson.y / BLOCK_SIZE);

		if (
			// prettier-ignore
			// if i am not on the same cell AND
			(myCoordX != hisCoordX || myCoordY != hisCoordY) &&
			(
				// i am on the last predicted cell OR
				(myCoordX == this.nextCoordinate.x && myCoordY == this.nextCoordinate.y) ||
				// his location had changed
				(this.statePersonLast.x != this.statePerson.x || this.statePersonLast.y != this.statePerson.y)
			)
		) {
			this.statePersonLast.x = this.statePerson.x;
			this.statePersonLast.y = this.statePerson.y;

			easystar.findPath(myCoordX, myCoordY, hisCoordX, hisCoordY, path => {
				if (path === null) {
				} else {
					if (path.length > 0) {
						this.nextCoordinate = path[1];
					}
				}
			});

			easystar.calculate();
		}

		const directionX =
			myCoordX == this.nextCoordinate.x ? 0 : myCoordX - this.nextCoordinate.x < 0 ? 1 : -1;
		const directionY =
			myCoordY == this.nextCoordinate.y ? 0 : myCoordY - this.nextCoordinate.y < 0 ? 1 : -1;

		const candidateXShift = SPEED_MONSTER * delta * directionX;
		const candidateX = this.owner.position.x + candidateXShift;
		const candidateYShift = SPEED_MONSTER * delta * directionY;
		const candidateY = this.owner.position.y + candidateYShift;

		this.owner.position.x += candidateX > 0 && candidateX < MAZE.width ? candidateXShift : 0;
		this.owner.position.y += candidateY > 0 && candidateY < MAZE.height ? candidateYShift : 0;
	}
}
