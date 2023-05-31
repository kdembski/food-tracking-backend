import { RequestQueryData } from "@/types/helpers/requestQuery";
import { ListBuilder } from "./listBuilder";
import { List } from "./models/list";
import { IListRepository } from "@/interfaces/_shared/list/listRepository";
import { ListConfig } from "@/types/_shared/list";
import { RequestQueryHelper } from "@/helpers/requestQuery";

export class ListService<Item, ItemQueryResult, Filters> {
  private repository: IListRepository<ItemQueryResult, Filters>;
  private builder: ListBuilder<Item, ItemQueryResult, Filters>;
  private list: List<Item, ItemQueryResult, Filters>;

  constructor(
    list: List<Item, ItemQueryResult, Filters>,
    repository: IListRepository<ItemQueryResult, Filters>,
    builder = new ListBuilder<Item, ItemQueryResult, Filters>()
  ) {
    this.list = list;
    this.repository = repository;
    this.builder = builder;
  }

  async getList(query: RequestQueryData) {
    this.builder.service = this;
    this.builder.list = this.list;
    await this.builder.build(query);
    return this.builder.list;
  }

  getData(config: ListConfig<Filters>) {
    return this.repository.selectList(config);
  }

  getCount(query: RequestQueryData) {
    const filters = this.getFilters(query);
    return this.repository.selectCount(filters);
  }

  getFilters(query: RequestQueryData) {
    return this.list.createFilters(new RequestQueryHelper(query));
  }
}
