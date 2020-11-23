import EasyStar from 'easystarjs';

import { MAP } from '@packages/constants';

export const aStar = new EasyStar.js();
aStar.setGrid(MAP.map);
aStar.setAcceptableTiles([0]);
aStar.enableDiagonals();
