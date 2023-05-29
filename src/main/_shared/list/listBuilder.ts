import { RequestQueryHelper } from "@/helpers/requestQuery";
import { RequestQueryData } from "@/types/helpers/requestQuery";
import { Pagination } from "./models/pagination";
import { IListBuilder } from "@/interfaces/_shared/list/listBuilder";
import { List } from "./models/list";

export class ListBuilder<Item, ItemDTO, ItemQueryResult, Filters>
  implements IListBuilder<Filters>
{
  protected list: List<Item, ItemDTO, ItemQueryResult, Filters>;

  constructor(list: List<Item, ItemDTO, ItemQueryResult, Filters>) {
    this.list = list;
  }

  async build(query: RequestQueryData) {
    this.produceConfig(query);
    await this.produceData();
    await this.producePagination();
  }

  produceConfig(query: RequestQueryData) {
    const queryHelper = new RequestQueryHelper(query);

    const { size, page, sortAttribute, sortDirection } = queryHelper;
    const filters = this.list.createFilters(queryHelper);

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
