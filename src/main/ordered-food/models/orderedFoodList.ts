import { List } from "@/base/list/models/list";
import { OrderedFood } from "./orderedFood";
import { OrderedFoodRepository } from "@/repositories/orderedFood";
import { OrderedFoodDTO } from "@/dtos/ordered-food/orderedFood";

export class OrderedFoodList extends List<OrderedFood, OrderedFoodDTO> {
  constructor() {
    super(new OrderedFoodRepository());
  }

  createListItem(data: OrderedFoodDTO) {
    return new OrderedFood(data);
  }
}
