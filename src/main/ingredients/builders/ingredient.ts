import { Ingredient } from "@/main/ingredients/models/ingredient";
import { IngredientUnitsCollectionService } from "../services/ingredientUnitsCollection";

export class IngredientBuilder {
  private _ingredient: Ingredient;
  private unitsCollectionService: IngredientUnitsCollectionService;

  constructor(unitsCollectionService = new IngredientUnitsCollectionService()) {
    this._ingredient = new Ingredient();
    this.unitsCollectionService = unitsCollectionService;
  }

  async produceUnits() {
    if (!this.ingredient.id) {
      return;
    }

    const units = await this.unitsCollectionService.getByIngredientId(
      this.ingredient.id
    );
    this.ingredient.units = units;
  }

  get ingredient() {
    return this._ingredient;
  }

  set ingredient(value) {
    this._ingredient = value;
  }
}
