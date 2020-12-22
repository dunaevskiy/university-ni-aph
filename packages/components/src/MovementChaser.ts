import * as ECS from '@libs/pixi-ecs';
import { ACTION, BLOCK_SIZE, CONTAINER, MAZE, SPEED_MONSTER } from '@packages/constants';
import { aStar } from '@packages/utils';

const WILD_HUNT = 'wild hunt';

export class MovementChaser extends ECS.Component {
	personPosition = {
		x: CONTAINER.small.width / 2,
		y: CONTAINER.small.height / 2,
	};
	personPositionLast = { x: 1, y: 1 };
	// Chaser target
	target = {
		x: CONTAINER.small.width / 2,
		y: CONTAINER.small.height / 2,
	};
	acceleration = 0;

	onInit() {
		// Listen to person movements
		this.subscribe(ACTION.MOVEMENT_OF_PERSON);
		this.subscribe(ACTION.START_GAME);
	}

	onMessage(msg): any {
		if (msg.action === ACTION.MOVEMENT_OF_PERSON) {
			this.personPosition = msg.data;
		}

		if (msg.action === ACTION.START_GAME) {
			// Start wild hunt with the first movement
			this.owner.addTag(WILD_HUNT);
			this.owner.position.set(CONTAINER.small.width / 2, CONTAINER.small.height / 2 - 200);
			this.acceleration = -0.02;
		}
	}

	onUpdate(delta: number) {
		// Wild hunt starts
		if (!this.owner.hasTag(WILD_HUNT)) return;

		this.acceleration += 0.0001;
		const SPEED_MONSTER_ACCELERATED =
			SPEED_MONSTER + this.acceleration < 0.4 ? SPEED_MONSTER + this.acceleration : 0.4;

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

		if (myX == finalX && myY == finalY) {
			this.owner.removeTag(WILD_HUNT);
			this.sendMessage(ACTION.END_GAME);
		}

		const directionX = myX == this.target.x ? 0 : myX - this.target.x < 0 ? 1 : -1;
		const directionY = myY == this.target.y ? 0 : myY - this.target.y < 0 ? 1 : -1;

		const candidateXShift = SPEED_MONSTER_ACCELERATED * delta * directionX;
		const candidateX = this.owner.position.x + candidateXShift;
		const candidateYShift = SPEED_MONSTER_ACCELERATED * delta * directionY;
		const candidateY = this.owner.position.y + candidateYShift;

		this.owner.position.x += candidateX > 0 && candidateX < MAZE.width ? candidateXShift : 0;
		this.owner.position.y += candidateY > 0 && candidateY < MAZE.height ? candidateYShift : 0;
	}
}
