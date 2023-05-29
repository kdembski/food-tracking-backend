import { OrderedFoodMapper } from "@/mappers/ordered-food/orderedFood";
import { OrderedFood } from "./orderedFood";
import { OrderedFoodDTO } from "@/dtos/ordered-food/orderedFood";
import { OrderedFoodListFilters } from "@/types/ordered-food/orderedFood";
import { RequestQueryHelper } from "@/helpers/requestQuery";
import { OrderedFoodRepository } from "@/repositories/ordered-food/orderedFood";
import { List } from "@/main/_shared/list/models/list";

export class OrderedFoodList extends List<
  OrderedFood,
  OrderedFoodDTO,
  OrderedFoodDTO,
  OrderedFoodListFilters
> {
  constructor(
    repository = new OrderedFoodRepository(),
    mapper = new OrderedFoodMapper()
  ) {
    super(repository.list, mapper);
  }

  createListItem(data: OrderedFoodDTO) {
    return new OrderedFood(data);
  }

  createFilters(query: RequestQueryHelper) {
    const { searchPhrase, tags } = query;
    return { searchPhrase, tags };
  }
}
