import { IList } from "@/interfaces/_shared/list/list";
import { Pagination } from "./pagination";
import { ListConfig } from "@/types/_shared/list";
import { CustomError } from "@/_shared/errors/models/customError";
import { RequestQueryHelper } from "@/helpers/requestQuery";

export abstract class List<Item, ItemQueryResult, Filters>
  implements IList<Item, ItemQueryResult, Filters>
{
  private _data?: Item[];
  private _pagination?: Pagination;
  private _config?: ListConfig<Filters>;

  abstract createListItem(data: ItemQueryResult): Promise<Item> | Item;
  abstract createFilters(query: RequestQueryHelper): Filters;

  get data() {
    return this._data || [];
  }

  set data(data: Item[]) {
    this._data = data;
  }

  get pagination() {
    if (!this._pagination) {
      throw new CustomError({ message: "List pagination is missing" });
    }
    return this._pagination;
  }

  set pagination(pagination: Pagination) {
    this._pagination = pagination;
  }

  get config() {
    if (!this._config) {
      throw new CustomError({ message: "List config is missing" });
    }
    return this._config;
  }

  set config(config: ListConfig<Filters>) {
    this._config = config;
  }

  getDataLength() {
    return this.data.length;
  }
}
