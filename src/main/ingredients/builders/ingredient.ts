import { IngredientPayload } from "@/dtos/ingredients/ingredient";
import { Ingredient } from "@/main/ingredients/models/ingredient";
import { IngredientUnitsCollectionService } from "../services/ingredientUnitsCollection";

export class IngredientBuilder {
  private _ingredient: Ingredient;

  constructor(payload: IngredientPayload) {
    this._ingredient = new Ingredient(payload);
  }

  async produceUnits() {
    const units =
      await new IngredientUnitsCollectionService().getByIngredientId(
        this._ingredient.id as number
      );

    this._ingredient.units = units;
  }

  getIngredient() {
    return this._ingredient;
  }
}
