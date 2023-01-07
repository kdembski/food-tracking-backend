import { IngredientCategoryDTO } from "@/dtos/ingredients/ingredientCategory";
import { IIngredientCategory } from "@/interfaces/ingredients/ingredientCategories";

export class IngredientCategory implements IIngredientCategory {
  private _id?: number;
  private _name?: string;

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  constructor(dto: IngredientCategoryDTO) {
    this._id = dto.id;
    this._name = dto.name;
  }
}
