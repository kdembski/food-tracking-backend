import { IList, ListConfig, ListItem } from "@/interfaces/base/list";
import { Pagination } from "@/base/list/models/pagination";

export abstract class List<Item extends ListItem<ItemDTO>, ItemDTO>
  implements IList<Item, ItemDTO>
{
  private _data?: Item[];
  private _pagination?: Pagination;
  private _config?: ListConfig;

  abstract getListData(config: ListConfig): Promise<ItemDTO[]>;
  abstract getListCount(searchPhrase: string, tags: string): Promise<number>;
  abstract createListItem(data: ItemDTO): Item;

  get data() {
    if (!this._data) {
      throw Error("List data is missing");
    }
    return this._data;
  }

  get pagination() {
    if (!this._pagination) {
      throw Error("List pagination is missing");
    }
    return this._pagination;
  }

  get config() {
    if (!this._config) {
      throw Error("List config is missing");
    }
    return this._config;
  }

  set data(data: Item[]) {
    this._data = data;
  }

  set pagination(pagination: Pagination) {
    this._pagination = pagination;
  }

  set config(config: ListConfig) {
    this._config = config;
  }

  getListDTO() {
    const dataDTOs = this.data?.map((item) => item.getDTO());
    return { data: dataDTOs, pagination: this.pagination };
  }

  getDataLength() {
    return this.data?.length;
  }

  iterate(callback: (item: Item) => any) {
    return this.data?.map((item) => {
      return callback(item);
    });
  }
}
