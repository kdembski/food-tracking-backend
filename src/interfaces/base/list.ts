import { Pagination } from "@/base/list/models/pagination";
import { RequestQueryData } from "@/types/helpers/requestQuery";
import { ListConfig } from "@/types/base/list";

export type ListItem<T> = {
  getDTO: () => T;
};

export interface IListBuilder {
  buildConfig(query: RequestQueryData): void;
  build(query: RequestQueryData): void;
  buildData(): void;
  buildPagination(): void;
}

export interface IList<Item extends ListItem<ItemDTO>, ItemDTO> {
  getListDTO: () => {
    data: ItemDTO[];
    pagination: Pagination;
  };
  getDataLength: () => number;
  iterate: (callback: (item: Item) => void) => void;
}

export interface IListRepository<ItemDTO> {
  selectList: (config: ListConfig) => Promise<ItemDTO[]>;
  selectCount: (searchPhrase: string, tags?: string) => Promise<number>;
}

export interface IListController<List> {
  getList: (query: RequestQueryData) => Promise<List>;
  getCount: (searchPhrase: string, tags?: string) => Promise<number>;
}
