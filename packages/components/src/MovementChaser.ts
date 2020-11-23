import * as ECS from '@libs/pixi-ecs';
import { ACTION, BLOCK_SIZE, MAZE, SPEED_MONSTER } from '@packages/constants';
import { aStar } from '@packages/utils';

const WILD_HUNT = 1;

export class MovementChaser extends ECS.Component {
	personPosition = { x: 1, y: 1 };
	personPositionLast = { x: 1, y: 1 };
	// Chaser target
	target = { x: 1, y: 1 };

	onInit() {
		// Listen to person movements
		this.subscribe(ACTION.MOVEMENT_OF_PERSON);
	}

	onMessage(msg): any {
		if (msg.action === ACTION.MOVEMENT_OF_PERSON) {
			this.personPosition = msg.data;
			// Start wild hunt with the first movement
			this.owner.setFlag(WILD_HUNT);
		}
	}

	onUpdate(delta: number) {
		// Wild hunt starts
		if (!this.owner.hasFlag(WILD_HUNT)) return;

		const myX = ~~(this.owner.position.x / BLOCK_SIZE);
		const myY = ~~(this.owner.position.y / BLOCK_SIZE);
		const finalX = ~~(this.personPosition.x / BLOCK_SIZE);
		const finalY = ~~(this.personPosition.y / BLOCK_SIZE);

		// The whole condition reduces number of recounting
		if (
			// prettier-ignore
			// if i am not on the same cell AND
			(myX != finalX || myY != finalY) &&
			(
				// i am on the last predicted cell OR
				(myX == this.target.x && myY == this.target.y) ||
				// his location had changed
				(this.personPositionLast.x != this.personPosition.x || this.personPositionLast.y != this.personPosition.y)
			)
		) {
			// Update that i count new position after persons movement
			this.personPositionLast.x = this.personPosition.x;
			this.personPositionLast.y = this.personPosition.y;

			aStar.findPath(myX, myY, finalX, finalY, path => {
				if (path === null) return;
				if (path.length > 0) this.target = path[1];
			});

			aStar.calculate();
		}

		const directionX = myX == this.target.x ? 0 : myX - this.target.x < 0 ? 1 : -1;
		const directionY = myY == this.target.y ? 0 : myY - this.target.y < 0 ? 1 : -1;

		const candidateXShift = SPEED_MONSTER * delta * directionX;
		const candidateX = this.owner.position.x + candidateXShift;
		const candidateYShift = SPEED_MONSTER * delta * directionY;
		const candidateY = this.owner.position.y + candidateYShift;

		this.owner.position.x += candidateX > 0 && candidateX < MAZE.width ? candidateXShift : 0;
		this.owner.position.y += candidateY > 0 && candidateY < MAZE.height ? candidateYShift : 0;
	}
}
