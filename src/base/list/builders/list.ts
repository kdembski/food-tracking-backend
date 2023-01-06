import { List } from "@/base/list/models/list";
import { RequestQueryHelper } from "@/helpers/requestQuery";
import { IListBuilder, ListItem } from "@/interfaces/base/list";
import { RequestQueryData } from "@/types/helpers/requestQuery";
import { Pagination } from "../models/pagination";

export class ListBuilder<Item extends ListItem<ItemDTO>, ItemDTO>
  implements IListBuilder
{
  private list: List<Item, ItemDTO>;

  constructor(list: List<Item, ItemDTO>) {
    this.list = list;
  }

  async build(query: RequestQueryData) {
    this.buildConfig(query);
    await this.buildData();
    await this.buildPagination();
  }

  buildConfig(query: RequestQueryData) {
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

  async buildData() {
    const data = await this.list.getListData(this.list.config);
    this.list.data = data.map((item) => this.list.createListItem(item));
  }

  async buildPagination() {
    const { searchPhrase, tags, page, size, offset } = this.list.config;
    const dataLength = this.list.getDataLength();
    const count = await this.list.getListCount(searchPhrase || "", tags);
    this.list.pagination = new Pagination(
      count,
      page,
      size,
      dataLength,
      offset
    );
  }
}
