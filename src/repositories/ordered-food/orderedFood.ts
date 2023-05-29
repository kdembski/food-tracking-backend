import { OrderedFood } from "@/main/ordered-food/models/orderedFood";
import { CRUDRepository } from "../_shared/crud";
import { OrderedFoodListFilters } from "@/types/ordered-food/orderedFood";
import { OrderedFoodDTO } from "@/dtos/ordered-food/orderedFood";
import { ITagsRepository } from "@/interfaces/_shared/tags/tagsRepository";
import { OrderedFoodQueries } from "@/queries/ordered-food/orderedFood";
import { ListRepository } from "../_shared/list";
import { Database } from "@/config/database";

export class OrderedFoodRepository
  extends CRUDRepository<OrderedFood, OrderedFoodDTO>
  implements ITagsRepository<OrderedFoodListFilters>
{
  protected queries: OrderedFoodQueries;
  list: ListRepository<OrderedFoodDTO, OrderedFoodListFilters>;

  constructor(
    database = Database.getInstance(),
    queries = new OrderedFoodQueries(),
    list = new ListRepository<OrderedFoodDTO, OrderedFoodListFilters>(
      database,
      queries
    )
  ) {
    super(database, queries);
    this.list = list;
    this.queries = queries;
  }

  async selectAll(filters: OrderedFoodListFilters) {
    const query = this.queries.getSelectAll(filters);
    const results = await this.database.sendQuery(query);

    return results as OrderedFoodDTO[];
  }

  async selectTags(filters: OrderedFoodListFilters) {
    const results = await this.selectAll(filters);

    return results
      .map((result) => result.tags)
      .filter((tags): tags is string => !!tags);
  }

  getFieldsToInsert(model: OrderedFood) {
    return [model.foodName, model.placeName, model.tags, model.placeLink];
  }

  getFieldsToUpdate(model: OrderedFood) {
    return [
      model.foodName,
      model.placeName,
      model.tags,
      model.placeLink,
      model.orderedDate,
      model.id,
    ];
  }
}
