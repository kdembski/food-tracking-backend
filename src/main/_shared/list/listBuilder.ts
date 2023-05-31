import { RequestQueryHelper } from "@/helpers/requestQuery";
import { RequestQueryData } from "@/types/helpers/requestQuery";
import { Pagination } from "./models/pagination";
import { IListBuilder } from "@/interfaces/_shared/list/listBuilder";
import { List } from "./models/list";
import { CustomError } from "@/_shared/errors/models/customError";
import { ListService } from "./listService";

export class ListBuilder<Item, ItemQueryResult, Filters>
  implements IListBuilder
{
  private _list?: List<Item, ItemQueryResult, Filters>;
  private _service?: ListService<Item, ItemQueryResult, Filters>;

  async build(query: RequestQueryData) {
    this.produceConfig(query);
    await this.produceData();
    await this.producePagination(query);
  }

  produceConfig(query: RequestQueryData) {
    const { size, page, sortAttribute, sortDirection } = new RequestQueryHelper(
      query
    );
    const filters = this.service.getFilters(query);
    const offset = (page - 1) * size;

    this.list.config = {
      sortAttribute,
      sortDirection,
      size,
      page,
      offset,
      filters,
    };
  }

  async produceData() {
    const config = this.list.config;
    const data = await this.service.getData(config);

    const promises = data.map(
      async (item) => await this.list.createListItem(item)
    );
    this.list.data = await Promise.all(promises);
  }

  async producePagination(query: RequestQueryData) {
    const { page, size, offset } = this.list.config;
    const dataLength = this.list.getDataLength();
    const count = await this.service.getCount(query);

    this.list.pagination = new Pagination(
      count,
      page,
      size,
      dataLength,
      offset
    );
  }

  get list() {
    if (!this._list) {
      throw new CustomError({ message: "List is required" });
    }
    return this._list;
  }

  set list(value) {
    this._list = value;
  }

  get service() {
    if (!this._service) {
      throw new CustomError({ message: "List service is required" });
    }
    return this._service;
  }

  set service(value) {
    this._service = value;
  }
}
