import {
  IIngredientCategory,
  IngredientCategoryDTO,
} from "@/interfaces/ingredients/ingredientCategories";

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
    this.setFromDTO(dto);
  }

  setFromDTO(data: IngredientCategoryDTO) {
    this._id = data.id;
    this._name = data.name;
  }

  getDTO() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
