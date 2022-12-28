import { List } from "@/base/list/models/list";
import { OrderedFood } from "./orderedFood";
import { OrderedFoodController } from "@/main/ordered-food/controllers/orderedFood";
import { OrderedFoodRepository } from "@/repositories/orderedFood";
import { OrderedFoodDTO } from "@/interfaces/orderedFood";
import { ListConfig } from "@/interfaces/base/list";

export class OrderedFoodList extends List<OrderedFood, OrderedFoodDTO> {
  protected async getListData(config: ListConfig) {
    return new OrderedFoodRepository().selectList(config);
  }

  protected getListCount(searchPhrase: string, tags: string): Promise<number> {
    return new OrderedFoodController().getCount(searchPhrase, tags);
  }

  protected createListItem(data: OrderedFoodDTO) {
    return new OrderedFood(data);
  }
}
