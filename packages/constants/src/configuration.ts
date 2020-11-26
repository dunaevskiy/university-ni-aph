import { maps } from './maps';

export const VIEWPORT = {
	width: window.innerWidth,
	height: window.innerHeight,
};

export const SPEED_PLAYER = 0.3;
export const SPEED_MONSTER = 0.3;

export const P1 = 16;
export const P2 = 32;

export const BLOCK_SIZE: number = 48;

export const MAP = maps.delta;
const [indexes, ...map] = maps.delta.map;
MAP.map = map;
const matrix = map;
export const MAZE = {
	matrix,
	xBlocksNumber: matrix[0].length,
	yBlocksNumber: matrix.length,
	width: matrix[0].length * BLOCK_SIZE,
	height: matrix.length * BLOCK_SIZE,
};

export const CONTAINER = {
	big: {
		width: VIEWPORT.width + MAZE.width, // maze and 1/2 of VIEWPORT from both sides
		height: VIEWPORT.height + MAZE.height, // maze and 1/2 of VIEWPORT from both sides
	},
	small: {
		width: MAZE.width,
		height: MAZE.height,
	},
};

const [grass, floor, wall, tree] = indexes;
export const MAP_ELEMENTS = {
	grass,
	floor,
	wall,
	tree,
};
