import * as PIXI from 'pixi.js';

export const loader = new PIXI.Loader();

export const loadResources = list =>
	new Promise(res => {
		loader.add(list).load(res);
	});
