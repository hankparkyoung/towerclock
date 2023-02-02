import type { Role } from '../types/role.type';
import type { Ratio } from '../types/ratio.type';

const ratios: Ratio[] = [
  { count: 5, t: 3, o: 0, m: 1, d: 1 },
  { count: 6, t: 3, o: 1, m: 1, d: 1 },
  { count: 7, t: 5, o: 0, m: 1, d: 1 },
  { count: 8, t: 5, o: 1, m: 1, d: 1 },
  { count: 9, t: 5, o: 2, m: 1, d: 1 },
  { count: 10, t: 7, o: 0, m: 2, d: 1 },
  { count: 11, t: 7, o: 1, m: 2, d: 1 },
  { count: 12, t: 7, o: 2, m: 2, d: 1 },
  { count: 13, t: 9, o: 0, m: 3, d: 1 },
  { count: 14, t: 9, o: 1, m: 3, d: 1 },
  { count: 15, t: 9, o: 2, m: 3, d: 1 },
];

const roles: Role[] = [
  {
    name: 'washerwoman',
    team: 't',
  },
  {
    name: 'librarian',
    team: 't',
  },
  {
    name: 'investigator',
    team: 't',
  },
  {
    name: 'chef',
    team: 't',
  },
  {
    name: 'empath',
    team: 't',
  },
  {
    name: 'fortuneteller',
    team: 't',
  },
  {
    name: 'undertaker',
    team: 't',
  },
  {
    name: 'monk',
    team: 't',
  },
  {
    name: 'ravenkeeper',
    team: 't',
  },
  {
    name: 'virgin',
    team: 't',
  },
  {
    name: 'slayer',
    team: 't',
  },
  {
    name: 'soldier',
    team: 't',
  },
  {
    name: 'mayor',
    team: 't',
  },
  {
    name: 'butler',
    team: 'o',
  },
  {
    name: 'drunk',
    team: 'o',
  },
  {
    name: 'recluse',
    team: 'o',
  },
  {
    name: 'saint',
    team: 'o',
  },
  {
    name: 'poisoner',
    team: 'm',
  },
  {
    name: 'spy',
    team: 'm',
  },
  {
    name: 'scarletwoman',
    team: 'm',
  },
  {
    name: 'baron',
    team: 'm',
  },
  {
    name: 'imp',
    team: 'd',
  },
];

const sortedRoles: {[key: string]: Role[]} = roles
.reduce((acc: {[key: string]: Role[]}, curr: Role) => {
  if (acc[curr.team]) {
    acc[curr.team] = [...acc[curr.team], curr];
  } else {
    acc[curr.team] = [curr];
  }
  return acc;
}, {});

export { ratios, sortedRoles };
