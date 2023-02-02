<script lang='ts'>
  // Imports
  import { ratios } from '../../lib/constants';
  import { generateRoles } from '../../lib/functions';
  import type { GameRoles } from '../../types/gameRoles.type';
  import type { Role } from '../../types/role.type';
  import type { Ratio } from '../../types/ratio.type';
  import type { Assignment } from '../../types/assignment.type';

  // State Variables
  let newPlayer: string = '';
  let isValidPlayer: boolean;
  let players: string[] = [];
  let playerCount: number;
  let roleRatio: Ratio | undefined;
  let gameRoles: GameRoles | undefined;
  let assignments: Assignment[] = [];
  $: playerCount = players.length;
  $: roleRatio = ratios.find(r => r.count === playerCount);
  $: isValidPlayer = !players.some((p: string) => p === newPlayer) && newPlayer.length !== 0;

  // Functions
  const addPlayer = () => {
    players = [...players, newPlayer];
    newPlayer = '';
  }
  const handleGenerateRoles = () => {
    gameRoles = generateRoles(roleRatio);
    assignments = [];
  }
  const assignRoles = () => {
    if (!gameRoles) {
      return;
    }
    let roles: Role[] = [...gameRoles.roles];
    assignments = players.map((p: string) => {
      const pickedRole = roles.splice(Math.floor(Math.random() * roles.length), 1)[0];
      return {
        name: p,
        role: `${pickedRole.name}${pickedRole === gameRoles?.drunkRole ? ' (is drunk)' : ''}`
      };
    });
  }
  const resetForm = () => {
    players = [];
    gameRoles = undefined;
    assignments = [];
  }

</script>

<h1>Blood on the Clocktower</h1>
<p>Trouble Brewing Online Companion</p>

<form on:submit|preventDefault={() => addPlayer()}>
  <input bind:value={newPlayer}/>
  <button disabled={!isValidPlayer}>Add Player</button>
</form>

<button on:click={() => handleGenerateRoles()} disabled={!roleRatio}>
  Generate Roles!
</button>

<button on:click={() => assignRoles()} disabled={!gameRoles}>
  Assign Roles!
</button>

<button on:click={() => resetForm()} disabled={players.length === 0}>
  Reset
</button>

<p>Total player count: {playerCount}</p>
{#if assignments.length === 0}
  {#if roleRatio}
    <p>Townsfolk: {roleRatio.t}</p>
    <p>Outsider: {roleRatio.o}</p>
    <p>Minion: {roleRatio.d}</p>
    <p>Demon: {roleRatio.d}</p>
  {/if}
  <ol>
    {#each players as p}
      <li>{p}</li>
    {/each}
  </ol>
  {#if gameRoles}
    <ul>
      {#each gameRoles.roles as r}
        <li>{`${r.name}${gameRoles.drunkRole === r ? ' (is drunk)' : ''}`}</li>
      {/each}
    </ul>
  {/if}
  {:else}
  <ul>
    {#each assignments as a}
      <li>
        {a.name} - {a.role}
      </li>
    {/each}
  </ul>
{/if}
