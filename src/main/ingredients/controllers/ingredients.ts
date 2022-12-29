import { Ingredient } from "@/main/ingredients/models/ingredient";
import { IngredientsRepository } from "@/repositories/ingredients/ingredients";
import {
  IIngredientsController,
  IngredientDTO,
} from "@/interfaces/ingredients/ingredients";
import { RequestQueryData } from "@/interfaces/helpers/requestQuery";
import { IngredientsList } from "../models/ingredientsList";
import { ListBuilder } from "@/base/list/builders/list";

export class IngredientsController implements IIngredientsController {
  async getList(query: RequestQueryData) {
    const ingredientsList = new IngredientsList();
    const listBuilder = new ListBuilder(ingredientsList);
    await listBuilder.build(query);
    await ingredientsList.setUnitNames();

    return ingredientsList;
  }

  async getOptions(query: RequestQueryData) {
    const ingredientsList = new IngredientsList();
    const listBuilder = new ListBuilder(ingredientsList);
    await listBuilder.build(query);

    const options = ingredientsList.iterate((item) => ({
      id: item.id,
      name: item.name,
    }));

    return options;
  }

  getCount(searchPhrase: string, tags?: string) {
    return new IngredientsRepository().selectCount(searchPhrase, tags);
  }

  async getById(id: number) {
    const dto = await new IngredientsRepository().selectById(id);
    return new Ingredient(dto);
  }

  create(data: IngredientDTO) {
    const ingredient = new Ingredient(data);
    return new IngredientsRepository().insert(ingredient);
  }

  update(data: IngredientDTO) {
    const ingredient = new Ingredient(data);
    return new IngredientsRepository().update(ingredient);
  }

  delete(id: number) {
    return new IngredientsRepository().delete(id);
  }
}
