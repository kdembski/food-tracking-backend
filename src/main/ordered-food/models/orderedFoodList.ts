import { OrderedFood } from "./orderedFood";
import { OrderedFoodDTO } from "@/dtos/ordered-food/orderedFood";
import { OrderedFoodListFilters } from "@/types/ordered-food/orderedFood";
import { RequestQueryHelper } from "@/helpers/requestQuery";
import { List } from "@/main/_shared/list/models/list";

export class OrderedFoodList extends List<
  OrderedFood,
  OrderedFoodDTO,
  OrderedFoodListFilters
> {
  createListItem(data: OrderedFoodDTO) {
    return new OrderedFood(data);
  }

  createFilters(query: RequestQueryHelper) {
    const { searchPhrase, tags } = query;
    return { searchPhrase, tags };
  }
}
