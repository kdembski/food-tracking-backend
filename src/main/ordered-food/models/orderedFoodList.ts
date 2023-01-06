import { List } from "@/base/list/models/list";
import { OrderedFood } from "./orderedFood";
import { OrderedFoodController } from "@/main/ordered-food/controllers/orderedFood";
import { OrderedFoodRepository } from "@/repositories/orderedFood";
import { ListConfig } from "@/interfaces/base/list";
import { OrderedFoodDTO } from "@/dtos/ordered-food/orderedFood";

export class OrderedFoodList extends List<OrderedFood, OrderedFoodDTO> {
  async getListData(config: ListConfig) {
    return new OrderedFoodRepository().selectList(config);
  }

  getListCount(searchPhrase: string, tags: string): Promise<number> {
    return new OrderedFoodController().getCount(searchPhrase, tags);
  }

  createListItem(data: OrderedFoodDTO) {
    return new OrderedFood(data);
  }
}
