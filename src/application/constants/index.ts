import mazes from '../maze.json5';

export const VIEWPORT = {
	size: {
		width: window.innerWidth,
		height: window.innerHeight,
	},
};

export const ACTION = {
	MOVEMENT: 'MOVEMENT',
	MOVEMENT_DIRECT: 'MOVEMENT_DIRECT',
	MOVEMENT_REVERSE: 'MOVEMENT_REVERSE',
};

export const SPEED_PLAYER = 0.3;
export const SPEED_MONSTER = 0.4;

export const P1 = 16;
export const P2 = 32;

export const mazeMatrix: number[][] = mazes.mapsHexa.alpha;
export const mazeWidthBlocks: number = mazeMatrix[0].length;
export const mazeHeightBlocks: number = mazeMatrix.length;
export const mazeBlockSize: number = 48;

export const containerBigWidth = VIEWPORT.size.width * 2 + mazeWidthBlocks * mazeBlockSize;
export const containerBigWidthShift = containerBigWidth / 2;
export const containerBigHeight = VIEWPORT.size.height * 2 + mazeHeightBlocks * mazeBlockSize;
export const containerBigHeightShift = -containerBigHeight / 2;

export const containerSmallWidth = mazeWidthBlocks * mazeBlockSize;
export const containerSmallWidthShift = containerSmallWidth / 2;
export const containerSmallHeight = mazeHeightBlocks * mazeBlockSize;
export const containerSmallHeightShift = containerSmallHeight / 2;
