import { Recipe } from "@/main/recipes/models/recipe";
import { DbEntityRoutesBuilder } from "../_shared/dbEntity";
import { ExtendedRecipeDTO, RecipeQueryResult } from "@/dtos/recipes/recipe";
import { RecipesController } from "@/controllers/recipes/recipes";
import { IRoutesBuilder } from "@/interfaces/_shared/routesBuilder";

export class RecipesRoutesBuilder
  extends DbEntityRoutesBuilder<Recipe, ExtendedRecipeDTO, RecipeQueryResult>
  implements IRoutesBuilder
{
  protected controller: RecipesController;
  readonly path = "/recipes";

  constructor(controller = new RecipesController()) {
    super(controller);
    this.controller = controller;
  }

  override build() {
    this.router.get("/", (req, res) => this.controller.list.getList(req, res));
    this.router.get("/tags", (req, res) => this.controller.getTags(req, res));
    this.router.get("/suggestions", (req, res) =>
      this.controller.getSuggestions(req, res)
    );
    this.router.get("/options", (req, res) =>
      this.controller.getOptions(req, res)
    );
    this.router.get("/count", (req, res) =>
      this.controller.list.getCount(req, res)
    );
    this.router.get("/:id/ingredients", (req, res) =>
      this.controller.getIngredients(req, res)
    );
    this.router.post("/:id/ingredients", (req, res) =>
      this.controller.createIngredients(req, res)
    );
    this.router.put("/:id/ingredients", (req, res) =>
      this.controller.updateIngredients(req, res)
    );
    super.build();
  }
}
