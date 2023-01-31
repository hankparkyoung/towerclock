/*
A ratio looks like:
{
  count: 5, (player count)
  t: 3, (townsfolk)
  o: 0, (outsider)
  m: 1, (minion)
  d: 1, (demon)
}
*/

export type Ratio = {
  count: number;
  t: number;
  o: number;
  m: number;
  d: number;
};
