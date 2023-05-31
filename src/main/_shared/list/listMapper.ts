import { IToDTOMapper } from "@/interfaces/_shared/mappers/toDtoMapper";
import { List } from "./models/list";
import { Pagination } from "./models/pagination";

export class ListMapper<Item, ItemDTO>
  implements
    IToDTOMapper<
      List<Item, unknown, unknown>,
      { data: ItemDTO[]; pagination: Pagination }
    >
{
  private mapper: IToDTOMapper<Item, ItemDTO>;

  constructor(mapper: IToDTOMapper<Item, ItemDTO>) {
    this.mapper = mapper;
  }

  toDTO(list: List<Item, unknown, unknown>) {
    return {
      data: list.data.map((item) => this.mapper.toDTO(item)),
      pagination: list.pagination,
    };
  }
}
