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
  let bluffs: Role[] | undefined = [];
  $: playerCount = players.length;
  $: roleRatio = ratios.find(r => r.count === playerCount);
  $: isValidPlayer = !players.some((p: string) => p === newPlayer) && newPlayer.length !== 0;
  $: bluffs = gameRoles?.bluffs;

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

<div class='app'>

<div class='container'>
  <h1>Blood on the Clocktower</h1>
  <p>Trouble Brewing Online Companion</p>

  <form on:submit|preventDefault={() => addPlayer()}>
    <input bind:value={newPlayer}/>
    <button disabled={!isValidPlayer}>+ Player</button>
  </form>

  <div>
    <button on:click={() => handleGenerateRoles()} disabled={!roleRatio}>
      Generate Roles!
    </button>

    <button on:click={() => assignRoles()} disabled={!gameRoles}>
      Assign Roles!
    </button>

    <button on:click={() => resetForm()} disabled={players.length === 0}>
      Reset
    </button>
  </div>

  <p>Total player count: {playerCount}</p>
  {#if assignments.length === 0}
    {#if roleRatio}
      <div>
        <p>Townsfolk: {roleRatio.t}</p>
        <p>Outsider: {roleRatio.o}</p>
        <p>Minion: {roleRatio.d}</p>
        <p>Demon: {roleRatio.d}</p>      
      </div>
    {/if}
    <ul>
      {#each players as p}
        <li>{p}</li>
      {/each}
    </ul>
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
  {#if bluffs}
    <p>Demon Bluffs</p>
    <ul>
      {#each bluffs as b}
        <li>{b.name}</li>
      {/each}
    </ul>
  {/if}
</div>

</div>

<style lang='scss'>
  $bg-dark: #231616;
  $bg-light: #ffd7d78d; 
  
  :global(*) {
    margin: 0;
    font-family: Georgia, 'Times New Roman', Times, serif;
    margin: 4px;

    & > ul {
      list-style-position: inside;
      padding-left: 0;
    }
  }
  .app {
    width: 100%;
    height: 100vh;
  }
  .container {
    margin-left: auto;
    margin-right: auto;
    width: 300px;
    height: 100vh;
  }
</style>
