import {
  IIngredientCategoriesController,
  IngredientCategoryDTO,
} from "@/interfaces/ingredients/ingredientCategories";
import { IngredientCategory } from "@/models/ingredients/ingredientCategory";
import { IngredientCategoriesRepository } from "@/repositories/ingredients/ingredientCategories";

export class IngredientCategoriesController
  implements IIngredientCategoriesController
{
  async getAll() {
    const dtos = await new IngredientCategoriesRepository().selectAll();
    return dtos.map((dto) => new IngredientCategory(dto));
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
