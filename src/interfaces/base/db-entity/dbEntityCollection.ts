export interface IDbEntityCollection<Item> {
  get items(): Item[];
  set items(value: Item[]);
}
