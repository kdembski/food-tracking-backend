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
    await validator.validate(collection);
    expect(validator.errors?.length).toEqual(2);
    expect(validator.errors?.[0].unitId).toEqual(undefined);
    expect(validator.errors?.[1].unitId).toEqual(
      validator.getRequiredFieldError()
    );
  });
});
