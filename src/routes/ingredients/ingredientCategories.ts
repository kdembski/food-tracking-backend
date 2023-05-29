import { IngredientCategory } from "@/main/ingredients/models/ingredientCategory";
import { CRUDRoutesBuilder } from "../_shared/crud";
import { IngredientCategoryDTO } from "@/dtos/ingredients/ingredientCategory";
import { IngredientCategoriesController } from "@/controllers/ingredients/ingredientCategories";
import { IRoutesBuilder } from "@/interfaces/_shared/routesBuilder";

export class IngredientCategoriesRoutesBuilder
  extends CRUDRoutesBuilder<
    IngredientCategory,
    IngredientCategoryDTO,
    IngredientCategoryDTO
  >
  implements IRoutesBuilder
{
  protected controller: IngredientCategoriesController;
  readonly path = "/ingredients/categories";

  constructor(controller = new IngredientCategoriesController()) {
    super(controller);
    this.controller = controller;
  }

  override build() {
    this.router.get("/", (req, res) => this.controller.list.getList(req, res));
    this.router.get("/options", (req, res) =>
      this.controller.getOptions(req, res)
    );
    super.build();
  }
}
