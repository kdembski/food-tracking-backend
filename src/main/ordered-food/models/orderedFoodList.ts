import { OrderedFoodMapper } from "../../../mappers/ordered-food/orderedFood";
import { List } from "@/base/list/models/list";
import { OrderedFood } from "./orderedFood";
import { OrderedFoodRepository } from "@/repositories/orderedFood";
import { OrderedFoodDTO } from "@/dtos/ordered-food/orderedFood";

export class OrderedFoodList extends List<
  OrderedFood,
  OrderedFoodDTO,
  OrderedFoodDTO
> {
  constructor() {
    super(new OrderedFoodRepository(), new OrderedFoodMapper());
  }

  createListItem(data: OrderedFoodDTO) {
    return new OrderedFood(data);
  }
}
