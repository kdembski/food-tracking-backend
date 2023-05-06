import { List } from "@/base/list/models/list";
import { RequestQueryHelper } from "@/helpers/requestQuery";
import { IListBuilder } from "@/interfaces/base/list";
import { RequestQueryData } from "@/types/helpers/requestQuery";
import { Pagination } from "../models/pagination";

export class ListBuilder<Item, ItemDTO, ItemQueryResult, Filters>
  implements IListBuilder<Filters>
{
  protected list: List<Item, ItemDTO, ItemQueryResult, Filters>;

  constructor(list: List<Item, ItemDTO, ItemQueryResult, Filters>) {
    this.list = list;
  }

  async build(query: RequestQueryData, filters: Filters) {
    this.produceConfig(query, filters);
    await this.produceData();
    await this.producePagination();
  }

  produceConfig(query: RequestQueryData, filters: Filters) {
    const { size, page, sortAttribute, sortDirection } = new RequestQueryHelper(
      query
    );
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
    const data = await this.list.getListData(this.list.config);
    const promises = data.map(
      async (item) => await this.list.createListItem(item)
    );
    this.list.data = await Promise.all(promises);
  }

  async producePagination() {
    const { filters, page, size, offset } = this.list.config;
    const dataLength = this.list.getDataLength();
    const count = await this.list.getListCount(filters);
    this.list.pagination = new Pagination(
      count,
      page,
      size,
      dataLength,
      offset
    );
  }
}
