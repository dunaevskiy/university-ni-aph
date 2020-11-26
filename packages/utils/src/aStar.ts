import EasyStar from 'easystarjs';

import { MAP, MAP_ELEMENTS } from '@packages/constants';

export const aStar = new EasyStar.js();
aStar.setGrid(MAP.map);
aStar.setAcceptableTiles([MAP_ELEMENTS.floor]);
aStar.enableDiagonals();
