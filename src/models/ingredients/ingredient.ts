import { IngredientUnitsController } from "@/controllers/ingredients/ingredientUnits";
import { IngredientDTO } from "@/interfaces/ingredients/ingredients";
import { IIngredient } from "@/interfaces/ingredients/ingredients";

export class Ingredient implements IIngredient {
  private _id?: number;
  private _name?: string;
  private _categoryId?: number;
  private _unitNames?: string[];

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get categoryId() {
    return this._categoryId;
  }

  get unitNames() {
    return this._unitNames;
  }

  constructor(dto: IngredientDTO) {
    this.setFromDTO(dto);
  }

  setFromDTO(data: IngredientDTO) {
    this._id = data.id;
    this._name = data.name;
    this._categoryId = data.categoryId;
    this._unitNames = data.unitNames;
  }

  getDTO() {
    return {
      id: this.id,
      name: this.name,
      categoryId: this.categoryId,
      unitNames: this.unitNames,
    };
  }

  async loadUnitNames() {
    if (!this.id) {
      return;
    }

    this._unitNames =
      await new IngredientUnitsController().getUnitNamesByIngredientId(this.id);
  }
}
