import map from './map.json';

export const maps = {
	beta: {
		// prettier-ignore
		map: [
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		],
		teleports: [],
		samples: {
			max: 20,
			initial: [],
		},
	},
	delta: {
		map: map,
		teleports: [
			{ from: [43, 3], to: [25, 25] },
			{ from: [42, 43], to: [25, 25] },
			{ from: [14, 24], to: [25, 25] },
			{ from: [31.5, 30.5], to: [35, 35] },
		],
		samples: {
			max: 20,
			initial: [],
		},
	},
};
