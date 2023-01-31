<script lang='ts'>
  import { ratios, roles } from '../lib/constants';
  import type { Role } from '../types/role.type';
  import type { Ratio } from '../types/ratio.type';

  const sortedRoles: {[key: string]: Role[]} = roles
  .reduce((acc: {[key: string]: Role[]}, curr: Role) => {
    if (acc[curr.team]) {
      acc[curr.team] = [...acc[curr.team], curr];
    } else {
      acc[curr.team] = [curr];
    }
    return acc;
  }, {});

  let newPlayer: string = '';
  let players: string[] = [];
  let playerCount: number = 0;
  let roleRatios: Ratio | string = 'Incorrect Player Count';
  let gameRoles: Role[] = [];
  let drunkRole: Role | null;
  interface Assignment {
    name: string;
    role: string;
  }
  let assignedRoles: Assignment[] = [];

  const addPlayer = () => {
    players = [...players, newPlayer];
    playerCount = players.length;
    roleRatios = ratios.find(r => r.count === playerCount) ?? 'Incorrect Player Count';
    newPlayer = '';
  };

  const drawRoles = (team: 't'|'o'|'m'|'d', num: number) => {
    const bag: Role[] = [...sortedRoles[team]];
    let selected: Role[] = [];

    for (let i = 0; i < num; i++) {
      selected = [...selected, ...bag.splice(Math.floor(Math.random() * bag.length), 1)];
    }

    return selected;
  };

  const generateRoles = () => {
    if (typeof roleRatios === 'string') {
      console.error('Error finding role ratios');
      return;
    }

    const dRoles: Role[] = drawRoles('d', roleRatios.d);
    const mRoles: Role[] = drawRoles('m', roleRatios.m);
    const isBaron: boolean = mRoles.some((r: Role) => r.name === 'baron');
    let oRoles: Role[] = [];
    if (isBaron) {
      oRoles = drawRoles('o', roleRatios.o + 2);
    } else {
      oRoles = drawRoles('o', roleRatios.o)
    }
    const isDrunk: boolean = oRoles.some((r: Role) => r.name === 'drunk');
    let tRoleTotal: number;
    if (isBaron) { // if baron, remove 2 towns
      tRoleTotal = isDrunk ? roleRatios.t - 1 : roleRatios.t - 2;
    } else { // also, if drunk, add 1 town to splice later
      tRoleTotal = isDrunk ? roleRatios.t + 1 : roleRatios.t;
    }
    let tRoles = drawRoles('t', tRoleTotal);
    drunkRole = isDrunk ? tRoles.splice(0, 1)[0] : null;

    if (drunkRole) {
      oRoles.splice(oRoles.findIndex((r: Role) => r.name === 'drunk'), 1);
    }
    let allRoles: Role[] = [
    ...dRoles,
    ...mRoles,
    ...oRoles,
    ...tRoles,
    ];
    if (drunkRole) {
      allRoles = [...allRoles, drunkRole];
    }
  
    gameRoles = [...allRoles];
    return allRoles;
  };

  const assignRoles = () => {
    let rolesToAssign = [...gameRoles];
    const assignments = players.map((p: string) => {
      const pickedRole = rolesToAssign.splice(Math.floor(Math.random() * rolesToAssign.length), 1)[0]
      return {
        name: p,
        role: `${pickedRole.name}${pickedRole === drunkRole ? ' (drunk)' : ''}`,
      }
    })

    assignedRoles = assignments;
    console.log(assignedRoles);
  };

  const resetAll = () => {
    players = [];
    playerCount = 0;
    roleRatios = "Incorrect Player Count";
    gameRoles = [];
    drunkRole = null;
    assignedRoles = [];
  }
</script>

<h1>Tower Clock</h1>
<p>A BotC Trouble Brewing Role Generator</p>

<form on:submit|preventDefault={() => addPlayer()}>
  <input bind:value={newPlayer}/>
  <button
    disabled={newPlayer.length === 0}
  >Add Player</button>
</form>


<p>Total players: {playerCount}</p>
<button
  on:click={() => generateRoles()}
  disabled={playerCount < 5}
>Generate Roles!</button>

<ol>
  {#each players as p}
    <li>{p}</li>
  {/each}
</ol>
<ul>
  {#each gameRoles as role}
    <li>
      {role.name}
      {#if role === drunkRole}
      <span>(is drunk)</span>
      {/if}
    </li>
  {/each}
</ul>

<button
  on:click={() => assignRoles()}
  disabled={gameRoles.length === 0}
>Assign Roles!</button>

<ul>
  {#each assignedRoles as assignment}
    <li>
      {assignment.name} - {assignment.role}
    </li>
  {/each}
</ul>

<button
  on:click={() => resetAll()}
>Reset</button>