import { RecipeIngredient } from "@/main/recipes/models/recipeIngredient";
import { CRUDRepository } from "../_shared/crud";
import { RecipeIngredientQueryResult } from "@/dtos/recipes/recipeIngredient";
import { RecipeIngredientsQueries } from "@/queries/recipes/recipeIngredients";
import { Database } from "@/config/database";

export class RecipeIngredientsRepository extends CRUDRepository<
  RecipeIngredient,
  RecipeIngredientQueryResult
> {
  protected queries: RecipeIngredientsQueries;

  constructor(
    database = Database.getInstance(),
    queries = new RecipeIngredientsQueries()
  ) {
    super(database, queries);
    this.queries = queries;
  }

  async selectByRecipeId(recipeId: number) {
    const query = this.queries.getSelectByRecipeId();
    const results = await this.database.sendQuery(query, [recipeId]);

    return results as RecipeIngredientQueryResult[];
  }

  async selectByIngredientUnitId(recipeId: number) {
    const query = this.queries.getSelectByIngredientUnitId();
    const results = await this.database.sendQuery(query, [recipeId]);

    return results as RecipeIngredientQueryResult[];
  }

  getFieldsToInsert(model: RecipeIngredient) {
    return [model.recipeId, model.ingredientUnitId, model.amount];
  }

  getFieldsToUpdate(model: RecipeIngredient) {
    return [model.recipeId, model.ingredientUnitId, model.amount, model.id];
  }
}
