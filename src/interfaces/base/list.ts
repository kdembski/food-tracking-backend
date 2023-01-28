import { RequestQueryData } from "@/types/helpers/requestQuery";
import { ListConfig } from "@/types/base/list";

export interface IListBuilder {
  build(query: RequestQueryData): void;
  produceConfig(query: RequestQueryData): void;
  produceData(): void;
  producePagination(): void;
}

export interface IList<Item, ItemQueryResult> {
  createListItem(data: ItemQueryResult): Promise<Item> | Item;
  getListData(config: ListConfig): Promise<ItemQueryResult[]>;
  getListCount(searchPhrase: string, tags: string): Promise<number>;
  getDataLength: () => number;
}

export interface IListRepository<ItemQueryResult> {
  selectList: (config: ListConfig) => Promise<ItemQueryResult[]>;
  selectCount: (searchPhrase: string, tags: string) => Promise<number>;
}
