import { IngredientUnitsCollection } from "@/main/ingredients/collections/ingredientUnits";
import { IngredientUnit } from "@/main/ingredients/models/ingredientUnit";
import { IngredientUnitsCollectionValidator } from "@/main/ingredients/validators/ingredientUnitsCollection";

describe("Ingredient Validator", () => {
  let validator: IngredientUnitsCollectionValidator;
  let collection: IngredientUnitsCollection;

  beforeEach(() => {
    validator = new IngredientUnitsCollectionValidator();

    collection = new IngredientUnitsCollection([
      new IngredientUnit({
        unitId: 1,
        kcalPerUnit: 1,
        isPrimary: true,
        converterToPrimary: 1,
      }),
      new IngredientUnit({}),
    ]);
  });

  it("Should validate each ingredient unit from collection", async () => {
    expect(validator.validate(collection).errors?.length).toEqual(1);
  });
});
