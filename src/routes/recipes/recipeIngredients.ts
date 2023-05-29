import { RecipeIngredientsController } from "@/controllers/recipes/recipeIngredients";
import { DbEntityRoutesBuilder } from "../_shared/dbEntity";
import { RecipeIngredient } from "@/main/recipes/models/recipeIngredient";
import {
  RecipeIngredientDTO,
  RecipeIngredientQueryResult,
} from "@/dtos/recipes/recipeIngredient";
import { IRoutesBuilder } from "@/interfaces/_shared/routesBuilder";

export class RecipeIngredientsRoutesBuilder
  extends DbEntityRoutesBuilder<
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
