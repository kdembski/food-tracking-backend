import { List } from "@/abstract/models/list";
import { OrderedFood } from "./orderedFood";
import { OrderedFoodController } from "@/controllers/orderedFood";
import { OrderedFoodRepository } from "@/repositories/orderedFood";
import { OrderedFoodDTO } from "@/interfaces/orderedFood";

export class OrderedFoodList extends List<OrderedFood, OrderedFoodDTO> {
  protected async getListData(
    searchPhrase: string,
    sortAttribute: string,
    sortDirection: string,
    tags: string,
    size: number,
    offset: number
  ) {
    return new OrderedFoodRepository().selectList(
      searchPhrase,
      sortAttribute,
      sortDirection,
      tags,
      size,
      offset
    );
  }

  protected getListCount(searchPhrase: string, tags: string): Promise<number> {
    return new OrderedFoodController().getOrderedFoodCount(searchPhrase, tags);
  }

  protected createListItem(data: OrderedFoodDTO) {
    return new OrderedFood(data);
  }
}
