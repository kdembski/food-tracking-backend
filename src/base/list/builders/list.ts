import { List } from "@/base/list/models/list";
import { RequestQueryHelper } from "@/helpers/requestQuery";
import { IListBuilder } from "@/interfaces/base/list";
import { RequestQueryData } from "@/types/helpers/requestQuery";
import { Pagination } from "../models/pagination";

export class ListBuilder<Item, ItemDTO, ItemQueryResult>
  implements IListBuilder
{
  private list: List<Item, ItemDTO, ItemQueryResult>;

  constructor(list: List<Item, ItemDTO, ItemQueryResult>) {
    this.list = list;
  }

  async build(query: RequestQueryData) {
    this.produceConfig(query);
    await this.produceData();
    await this.producePagination();
  }

  produceConfig(query: RequestQueryData) {
    const { size, page, sortAttribute, sortDirection, searchPhrase, tags } =
      new RequestQueryHelper(query).getQueryValues();
    const offset = (page - 1) * size;

    this.list.config = {
      searchPhrase,
      sortAttribute,
      sortDirection,
      tags,
      size,
      page,
      offset,
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
    const { searchPhrase, tags, page, size, offset } = this.list.config;
    const dataLength = this.list.getDataLength();
    const count = await this.list.getListCount(searchPhrase || "", tags || "");
    this.list.pagination = new Pagination(
      count,
      page,
      size,
      dataLength,
      offset
    );
  }
}
