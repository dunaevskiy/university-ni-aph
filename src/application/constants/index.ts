import * as PIXI from 'pixi.js';

import mazes from '../maze.json5';

PIXI.settings.ROUND_PIXELS = true;

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

export const mazeMatrix: number[][] = mazes.mapsHexa.alpha;
export const mazeWidthBlocks: number = mazeMatrix[0].length;
export const mazeHeightBlocks: number = mazeMatrix.length;
export const mazeBlockSize: number = 24;

export const containerBigWidth = VIEWPORT.size.width * 2 + mazeWidthBlocks * mazeBlockSize;
export const containerBigWidthShift = (containerBigWidth / 2) * -1;
export const containerBigHeight = VIEWPORT.size.height * 2 + mazeHeightBlocks * mazeBlockSize;
export const containerBigHeightShift = (-containerBigHeight / 2) * -1;

export const containerSmallWidth = mazeWidthBlocks * mazeBlockSize;
export const containerSmallWidthShift = containerSmallWidth / 2;
export const containerSmallHeight = mazeHeightBlocks * mazeBlockSize;
export const containerSmallHeightShift = containerSmallHeight / 2;
