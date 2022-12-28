import { Pagination } from "@/base/list/models/pagination";
import { RequestQueryData } from "@/interfaces/helpers/requestQuery";

export type ListItem<T> = {
  getDTO: () => T;
};

export type ListConfig = {
  searchPhrase?: string;
  sortAttribute: string;
  sortDirection: string;
  tags: string;
  size: number;
  offset: number;
};

export interface IList<Item extends ListItem<ItemDTO>, ItemDTO> {
  getListDTO: () => {
    data: ItemDTO[];
    pagination: Pagination;
  };
  loadList: (query: RequestQueryData) => void;
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
