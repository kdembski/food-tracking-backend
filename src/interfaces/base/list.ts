import { RequestQueryData } from "@/types/helpers/requestQuery";
import { ListConfig } from "@/types/base/list";

export interface IListBuilder<Filters> {
  build(query: RequestQueryData, filters: Filters): void;
  produceConfig(query: RequestQueryData, filters: Filters): void;
  produceData(): void;
  producePagination(): void;
}

export interface IList<Item, ItemQueryResult, Filters> {
  createListItem(data: ItemQueryResult): Promise<Item> | Item;
  getListData(config: ListConfig<Filters>): Promise<ItemQueryResult[]>;
  getListCount(filters: Filters): Promise<number>;
  getDataLength: () => number;
}

export interface IListRepository<ItemQueryResult, Filters> {
  selectList: (config: ListConfig<Filters>) => Promise<ItemQueryResult[]>;
  selectCount: (filters: Filters) => Promise<number>;
}
