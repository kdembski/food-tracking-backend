import { IngredientPayload } from "@/dtos/ingredients/ingredient";
import { Ingredient } from "@/main/ingredients/models/ingredient";
import { IngredientUnitsCollectionController } from "../controllers/ingredientUnitsCollection";

export class IngredientBuilder {
  private _ingredient: Ingredient;

  constructor(payload: IngredientPayload) {
    this._ingredient = new Ingredient(payload);
  }

  async buildUnits() {
    const units =
      await new IngredientUnitsCollectionController().getByIngredientId(
        this._ingredient.id as number
      );

    this._ingredient.units = units;
  }

  getIngredient() {
    return this._ingredient;
  }
}
