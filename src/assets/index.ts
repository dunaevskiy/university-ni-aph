import floor01Img from './floor01.png';
import floor02Img from './floor02.png';
import floor03Img from './floor03.png';
import wall01Img from './wall01.png';
import wall02Img from './wall02.png';
import sample01Img from './sample01.png';
import sample02Img from './sample02.png';
import sample03Img from './sample03.png';
import doctor01Img from './doctor01.png';
import grass01Img from './grass01.png';
import bush01Img from './bush01.png';
import teleport01Img from './teleport1.png';
import teleport02Img from './teleport2.png';
import monster01Img from './monster01.png';
import flower01Img from './flower01.png';
import tree01Img from './tree01.png';
import logoImg from './logo.png';

export const ASSETS = {
	floor01: floor01Img,
	floor02: floor02Img,
	floor03: floor03Img,
	wall01: wall01Img,
	wall02: wall02Img,
	sample01: sample01Img,
	sample02: sample02Img,
	sample03: sample03Img,
	doctor01: doctor01Img,
	grass01: grass01Img,
	bush01: bush01Img,
	teleport01: teleport01Img,
	teleport02: teleport02Img,
	monster01: monster01Img,
	flower01: flower01Img,
	tree01: tree01Img,
	logo: logoImg,
};

export const RESOURCES = (() => {
	let resources = [];
	for (let name in ASSETS) resources.push({ name, url: ASSETS[name] });
	return resources;
})();
