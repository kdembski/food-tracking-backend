import { ListConfig } from "@/types/_shared/list";

export interface IList<Item, ItemQueryResult, Filters> {
  createListItem(data: ItemQueryResult): Promise<Item> | Item;
  getListData(config: ListConfig<Filters>): Promise<ItemQueryResult[]>;
  getListCount(filters: Filters): Promise<number>;
  getDataLength: () => number;
}
