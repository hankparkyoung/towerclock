/*
GameRoles object looks like:
{
  roles: [{name: Slayer, team: 't'}, {}, {}],
  drunkRole: {name: Slayer, team: 't'}
}
*/

import type { Role } from './role.type';

export interface GameRoles {
  roles: Role[];
  drunkRole: Role | null;
}