import { Pagination } from "@/models/pagination";
import { RequestQueryData } from "./helpers/requestQuery";

export type ListItem<T> = {
  getDTO: () => T;
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
