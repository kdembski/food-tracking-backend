import { IngredientCategoryDTO } from "@/dtos/ingredients/ingredientCategory";
import { IIngredientCategoriesController } from "@/interfaces/ingredients/ingredientCategories";
import { IngredientCategoriesRepository } from "@/repositories/ingredients/ingredientCategories";
import { IngredientCategory } from "../models/ingredientCategory";

export class IngredientCategoriesController
  implements IIngredientCategoriesController
{
  async getAll() {
    const dtos = await new IngredientCategoriesRepository().selectAll();
    return dtos.map((dto) => new IngredientCategory(dto));
  }

  getOptions() {
    return new IngredientCategoriesRepository().selectOptions();
  }

  async getById(id: number) {
    const dto = await new IngredientCategoriesRepository().selectById(id);
    return new IngredientCategory(dto);
  }

  create(data: IngredientCategoryDTO) {
    const ingredient = new IngredientCategory(data);
    return new IngredientCategoriesRepository().insert(ingredient);
  }

  update(data: IngredientCategoryDTO) {
    const ingredient = new IngredientCategory(data);
    return new IngredientCategoriesRepository().update(ingredient);
  }

  delete(id: number) {
    return new IngredientCategoriesRepository().delete(id);
  }
}
