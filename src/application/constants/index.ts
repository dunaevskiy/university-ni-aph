import mazes from '../maze.json5';

export const VIEWPORT = {
	width: window.innerWidth,
	height: window.innerHeight,
};

export const ACTION = {
	MOVEMENT: 'MOVEMENT',
	MOVEMENT_DIRECT: 'MOVEMENT_DIRECT',
	MOVEMENT_REVERSE: 'MOVEMENT_REVERSE',
};

export const SPEED_PLAYER = 0.3;
export const SPEED_MONSTER = 0.15;

export const P1 = 16;
export const P2 = 32;

const matrix = mazes.mapsHexa.alpha;

export const MAZE = {
	matrix,
	blocksCountX: matrix[0].length,
	blocksCountY: matrix.length,
};
export const BLOCK_SIZE: number = 48;

export const containerBigWidth = VIEWPORT.width * 2 + MAZE.blocksCountX * BLOCK_SIZE;
export const containerBigWidthShift = containerBigWidth / 2;
export const containerBigHeight = VIEWPORT.height * 2 + MAZE.blocksCountY * BLOCK_SIZE;
export const containerBigHeightShift = -containerBigHeight / 2;

export const containerSmallWidth = MAZE.blocksCountX * BLOCK_SIZE;
export const containerSmallWidthShift = containerSmallWidth / 2;
export const containerSmallHeight = MAZE.blocksCountY * BLOCK_SIZE;
export const containerSmallHeightShift = containerSmallHeight / 2;
