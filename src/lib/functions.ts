/* eslint-disable prefer-const */
import type { Role } from '../types/role.type';
import type { Ratio } from '../types/ratio.type';
import { sortedRoles } from './constants';

const drawRoles = (team: 't' | 'o' | 'm' | 'd', num: number) => {
  const bag: Role[] = [...sortedRoles[team]];
  let selected: Role[] = [];

  for (let i = 0; i < num; i++) {
    selected = [...selected, ...bag.splice(Math.floor(Math.random() * bag.length), 1)];
  }

  return selected;
};

// Given a Ratio,
// Returns a { roles: Role[], bluffs: Role[], drunkRole: Role | null}
const generateRoles = (ratio: Ratio | undefined) => {
  if (typeof ratio === 'undefined') {
    return;
  }
  let dRoles, mRoles, oRoles, tRoles, bluffs: Role[];
  let allRoles: Role[] = [];
  let tRoleTotal: number = ratio.t;
  let drunkRole: Role | null = null;
  dRoles = drawRoles('d', ratio.d);
  mRoles = drawRoles('m', ratio.m);

  const isBaron: boolean = mRoles.some((r: Role) => r.name === 'baron');
  oRoles = drawRoles('o', isBaron ? ratio.o + 2 : ratio.o);

  const isDrunk: boolean = oRoles.some((r: Role) => r.name === 'drunk');
  if (isBaron) {
    tRoleTotal -= 2;
  }
  if (isDrunk) {
    oRoles.splice(oRoles.findIndex((r: Role) => r.name === 'drunk'), 1);
    tRoleTotal += 1;
  }
  tRoles = drawRoles('t', tRoleTotal + 3); // + 3 demon role bluffs
  if (isDrunk) {
    drunkRole = tRoles.splice(0, 1)[0];
    allRoles = [...allRoles, drunkRole];
  }
  bluffs = tRoles.splice(0, 3);

  allRoles = [
    ...dRoles,
    ...mRoles,
    ...allRoles, // order drunk role after demons and minions
    ...oRoles,
    ...tRoles,
  ];
  
  return {
    roles: allRoles,
    bluffs,
    drunkRole,
  };
}

export { generateRoles };
