import { List } from "@/abstract/models/list";
import { OrderedFood } from "./orderedFood";
import { OrderedFoodController } from "@/controllers/orderedFood";
import { OrderedFoodRepository } from "@/repositories/orderedFood";
import { OrderedFoodDTO } from "@/interfaces/orderedFood";
import { ListConfig } from "@/interfaces/base/models/list";

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
