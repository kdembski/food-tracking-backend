import { IMapper } from "./../../../interfaces/base/mapper";
import { IListRepository } from "@/interfaces/base/list";
import { IList } from "@/interfaces/base/list";
import { Pagination } from "@/base/list/models/pagination";
import { ListConfig } from "@/types/base/list";

export abstract class List<Item, ItemDTO> implements IList<Item, ItemDTO> {
  private _data?: Item[];
  private _pagination?: Pagination;
  private _config?: ListConfig;

  private repository: IListRepository<ItemDTO>;
  private mapper: IMapper<Item, ItemDTO>;

  constructor(
    repository: IListRepository<ItemDTO>,
    mapper: IMapper<Item, ItemDTO>
  ) {
    this.repository = repository;
    this.mapper = mapper;
  }

  abstract createListItem(data: ItemDTO): Item;

  getListData(config: ListConfig) {
    return this.repository.selectList(config);
  }

  getListCount(searchPhrase: string, tags: string) {
    return this.repository.selectCount(searchPhrase, tags);
  }

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
