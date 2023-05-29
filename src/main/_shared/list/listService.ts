import { RequestQueryData } from "@/types/helpers/requestQuery";
import { ListBuilder } from "./listBuilder";
import { List } from "./models/list";
import { RequestQueryHelper } from "@/helpers/requestQuery";

export class ListService<Item, ItemDTO, ItemQueryResult, Filters> {
  private list: List<Item, ItemDTO, ItemQueryResult, Filters>;

  constructor(list: List<Item, ItemDTO, ItemQueryResult, Filters>) {
    this.list = list;
  }

  async getList(query: RequestQueryData) {
    const listBuilder = new ListBuilder(this.list);
    await listBuilder.build(query);
    return this.list;
  }

  getCount(query: RequestQueryData) {
    const filters = this.list.createFilters(new RequestQueryHelper(query));
    return this.list.getListCount(filters);
  }
}
