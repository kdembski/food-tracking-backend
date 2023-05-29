import { IList } from "@/interfaces/_shared/list/list";
import { Pagination } from "./pagination";
import { ListConfig } from "@/types/_shared/list";
import { IListRepository } from "@/interfaces/_shared/list/listRepository";
import { IMapper } from "@/interfaces/_shared/mapper";
import { CustomError } from "@/_shared/errors/models/customError";
import { RequestQueryHelper } from "@/helpers/requestQuery";

export abstract class List<Item, ItemDTO, ItemQueryResult, Filters>
  implements IList<Item, ItemQueryResult, Filters>
{
  private _data?: Item[];
  private _pagination?: Pagination;
  private _config?: ListConfig<Filters>;

  private repository: IListRepository<ItemQueryResult, Filters>;
  private mapper: IMapper<Item, ItemDTO>;

  constructor(
    repository: IListRepository<ItemQueryResult, Filters>,
    mapper: IMapper<Item, ItemDTO>
  ) {
    this.repository = repository;
    this.mapper = mapper;
  }

  abstract createListItem(data: ItemQueryResult): Promise<Item> | Item;
  abstract createFilters(query: RequestQueryHelper): Filters;

  getListData(config: ListConfig<Filters>) {
    return this.repository.selectList(config);
  }

  getListCount(filters: Filters) {
    return this.repository.selectCount(filters);
  }

  get data() {
    return this._data || [];
  }

  get pagination() {
    if (!this._pagination) {
      throw new CustomError({ message: "List pagination is missing" });
    }
    return this._pagination;
  }

  get config() {
    if (!this._config) {
      throw new CustomError({ message: "List config is missing" });
    }
    return this._config;
  }

  set data(data: Item[]) {
    this._data = data;
  }

  set pagination(pagination: Pagination) {
    this._pagination = pagination;
  }

  set config(config: ListConfig<Filters>) {
    this._config = config;
  }

  getDataLength() {
    return this.data?.length;
  }

  toDTO() {
    return {
      data: this.data.map((item) => this.mapper.toDTO(item)),
      pagination: this.pagination,
    };
  }
}
