import { Pagination } from "@/base/list/models/pagination";
import { RequestQueryData } from "@/types/helpers/requestQuery";
import { ListConfig } from "@/types/base/list";

export type IListItem<T> = {
  getDTO: () => T;
};

export interface IListBuilder {
  buildConfig(query: RequestQueryData): void;
  build(query: RequestQueryData): void;
  buildData(): void;
  buildPagination(): void;
}

export interface IList<Item, ItemDTO> {
  createListItem(data: ItemDTO): Item;
  getListData(config: ListConfig): Promise<ItemDTO[]>;
  getListCount(searchPhrase: string, tags: string): Promise<number>;
  getListDTO: () => {
    data: ItemDTO[];
    pagination: Pagination;
  };
  getDataLength: () => number;
}

export interface IListRepository<ItemDTO> {
  selectList: (config: ListConfig) => Promise<ItemDTO[]>;
  selectCount: (searchPhrase: string, tags?: string) => Promise<number>;
}
