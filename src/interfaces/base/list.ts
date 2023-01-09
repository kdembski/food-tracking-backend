import { RequestQueryData } from "@/types/helpers/requestQuery";
import { ListConfig } from "@/types/base/list";

export interface IListBuilder {
  buildConfig(query: RequestQueryData): void;
  build(query: RequestQueryData): void;
  buildData(): void;
  buildPagination(): void;
}

export interface IList<Item, ItemQueryResult> {
  createListItem(data: ItemQueryResult): Promise<Item> | Item;
  getListData(config: ListConfig): Promise<ItemQueryResult[]>;
  getListCount(searchPhrase: string, tags: string): Promise<number>;
  getDataLength: () => number;
}

export interface IListRepository<ItemQueryResult> {
  selectList: (config: ListConfig) => Promise<ItemQueryResult[]>;
  selectCount: (searchPhrase: string, tags?: string) => Promise<number>;
}
