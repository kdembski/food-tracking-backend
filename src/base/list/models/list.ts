import { RequestQueryHelper } from "@/helpers/requestQuery";
import { RequestQueryData } from "@/interfaces/helpers/requestQuery";
import { IList, ListConfig, ListItem } from "@/interfaces/base/list";
import { Pagination } from "@/base/list/models/pagination";

export abstract class List<Item extends ListItem<ItemDTO>, ItemDTO>
  implements IList<Item, ItemDTO>
{
  protected data?: Item[];
  private pagination?: Pagination;

  protected abstract getListData(config: ListConfig): Promise<ItemDTO[]>;

  protected abstract getListCount(
    searchPhrase: string,
    tags: string
  ): Promise<number>;

  protected abstract createListItem(data: ItemDTO): Item;

  getListDTO() {
    if (!this.data || !this.pagination) {
      throw Error("List data or pagination is missing");
    }

    const dataDTOs = this.data?.map((item) => item.getDTO());
    return { data: dataDTOs, pagination: this.pagination };
  }

  async loadList(query: RequestQueryData) {
    const { size, page, sortAttribute, sortDirection, searchPhrase, tags } =
      new RequestQueryHelper(query).getQueryValues();
    const offset = (page - 1) * size;

    await this.setListData({
      searchPhrase,
      sortAttribute,
      sortDirection,
      tags,
      size,
      offset,
    });
    await this.setPagination(
      searchPhrase,
      tags,
      page,
      size,
      offset,
      this.getDataLength()
    );
  }

  private async setListData(config: ListConfig) {
    const data = await this.getListData(config);
    this.data = data.map((item) => this.createListItem(item));
  }

  private async setPagination(
    searchPhrase: string,
    tags: string,
    page: number,
    size: number,
    offset: number,
    listLength: number
  ) {
    const count = await this.getListCount(searchPhrase, tags);
    this.pagination = new Pagination(count, page, size, listLength, offset);
  }

  getDataLength() {
    return this.data?.length || 0;
  }

  iterate(callback: (item: Item) => any) {
    return this.data?.map((item) => {
      return callback(item);
    });
  }
}
