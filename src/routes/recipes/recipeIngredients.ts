import { RecipeIngredientsController } from "@/controllers/recipes/recipeIngredients";
import { CRUDRoutesBuilder } from "../_shared/crud";
import { RecipeIngredient } from "@/main/recipes/models/recipeIngredient";
import {
  RecipeIngredientDTO,
  RecipeIngredientQueryResult,
} from "@/dtos/recipes/recipeIngredient";
import { IRoutesBuilder } from "@/interfaces/_shared/routesBuilder";

export class RecipeIngredientsRoutesBuilder
  extends CRUDRoutesBuilder<
    RecipeIngredient,
    RecipeIngredientDTO,
    RecipeIngredientQueryResult
  >
  implements IRoutesBuilder
{
  protected controller: RecipeIngredientsController;
  readonly path = "/recipes/ingredients";

  constructor(controller = new RecipeIngredientsController()) {
    super(controller);
    this.controller = controller;
  }

  override build() {
    this.router.get("/options", (req, res) =>
      this.controller.getOptions(req, res)
    );
    super.build();
  }
}
