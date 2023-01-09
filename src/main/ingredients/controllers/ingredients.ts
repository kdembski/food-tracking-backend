import { IngredientMapper } from "@/main/ingredients/mappers/ingredient";
import { IngredientsRepository } from "@/repositories/ingredients/ingredients";
import { IIngredientsController } from "@/interfaces/ingredients/ingredients";
import { RequestQueryData } from "@/types/helpers/requestQuery";
import { IngredientsList } from "../models/ingredientsList";
import { ListBuilder } from "@/base/list/builders/list";
import { IngredientDTO } from "@/dtos/ingredients/ingredient";
import { IngredientBuilder } from "../builders/ingredient";
import { IngredientUnitsCollectionController } from "./ingredientUnitsCollection";

export class IngredientsController implements IIngredientsController {
  async getList(query: RequestQueryData) {
    const ingredientsList = new IngredientsList();
    const listBuilder = new ListBuilder(ingredientsList);
    await listBuilder.build(query);

    return ingredientsList;
  }

  getOptions() {
    return new IngredientsRepository().selectOptions();
  }

  getCount(searchPhrase: string, tags?: string) {
    return new IngredientsRepository().selectCount(searchPhrase, tags);
  }

  async getById(id: number) {
    const dto = await new IngredientsRepository().selectById(id);
    const builder = new IngredientBuilder(dto);
    await builder.buildUnits();
    return builder.getIngredient();
  }

  create(data: IngredientDTO) {
    const ingredient = new IngredientMapper().toDomain(data);
    new IngredientUnitsCollectionController().create(ingredient.units);
    return new IngredientsRepository().insert(ingredient);
  }

  update(data: IngredientDTO) {
    const ingredient = new IngredientMapper().toDomain(data);
    new IngredientUnitsCollectionController().update(
      ingredient.id,
      ingredient.units
    );
    return new IngredientsRepository().update(ingredient);
  }

  delete(id: number) {
    return new IngredientsRepository().delete(id);
  }
}
