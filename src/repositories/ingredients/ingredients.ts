import { Ingredient } from "@/main/ingredients/models/ingredient";
import { CRUDRepository } from "../_shared/crud";
import {
  IngredientDTO,
  IngredientOptionDTO,
  IngredientQueryResult,
} from "@/dtos/ingredients/ingredient";
import { ListRepository } from "../_shared/list";
import { IngredientsListFilters } from "@/types/ingredients/ingredients";
import { Database } from "@/config/database";
import { IngredientsQueries } from "@/queries/ingredients/ingredients";

export class IngredientsRepository extends CRUDRepository<
  Ingredient,
  IngredientDTO
> {
  list: ListRepository<IngredientQueryResult, IngredientsListFilters>;
  protected queries: IngredientsQueries;

  constructor(
    database = Database.getInstance(),
    queries = new IngredientsQueries(),
    list = new ListRepository<IngredientQueryResult, IngredientsListFilters>(
      database,
      queries
    )
  ) {
    super(database, queries);
    this.list = list;
    this.queries = queries;
  }

  async selectOptions() {
    const query = this.queries.getSelectOptions();
    const data = await this.database.sendQuery(query);

    return data as IngredientOptionDTO[];
  }

  getFieldsToInsert(model: Ingredient) {
    return [model.name, model.categoryId];
  }

  getFieldsToUpdate(model: Ingredient) {
    return [model.name, model.categoryId, model.id];
  }
}
