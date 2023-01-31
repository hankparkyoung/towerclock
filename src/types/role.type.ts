/*
A role looks like:
{
  // MVP attributes
  name: 'Washerwoman',
  team: 'Townsfolk',
  setup: false, // <-- refers to requiring a change to normal role distribution

  // v2 attributes
  firstNight, firstNightReminder, otherNight, otherNightReminder, reminders, ability
}
*/

export type Role = {
  name: string;
  team: 't' | 'o' | 'm' | 'd',
};
