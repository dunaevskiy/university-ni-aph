import floor01Img from '../assets/floor01.png';
import floor02Img from '../assets/floor02.png';
import floor03Img from '../assets/floor03.png';
import wall01Img from '../assets/wall01.png';
import wall02Img from '../assets/wall02.png';
import sample01Img from '../assets/sample01.png';
import sample02Img from '../assets/sample02.png';
import doctor01Img from '../assets/doctor01.png';
import grass01Img from '../assets/grass01.png';
import bush01Img from '../assets/bush01.png';
import teleport01Img from '../assets/teleport1.png';
import teleport02Img from '../assets/teleport2.png';
import monster01Img from '../assets/monster01.png';
import flower01Img from '../assets/flower01.png';
import tree01Img from '../assets/tree01.png';

export const ASSETS = {
	floor01: floor01Img,
	floor02: floor02Img,
	floor03: floor03Img,
	wall01: wall01Img,
	wall02: wall02Img,
	sample01: sample01Img,
	sample02: sample02Img,
	doctor01: doctor01Img,
	grass01: grass01Img,
	bush01: bush01Img,
	teleport01: teleport01Img,
	teleport02: teleport02Img,
	monster01: monster01Img,
	flower01: flower01Img,
	tree01: tree01Img,
};

export const RESOURCES = (() => {
	let resources = [];
	for (let name in ASSETS) resources.push({ name, url: ASSETS[name] });
	return resources;
})();
