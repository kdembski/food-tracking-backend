import { RequestQueryHelper } from "@/helpers/requestQuery";

export interface IList<Item, ItemQueryResult, Filters> {
  createListItem(data: ItemQueryResult): Promise<Item> | Item;
  createFilters(query: RequestQueryHelper): Filters;
  getDataLength: () => number;
}
