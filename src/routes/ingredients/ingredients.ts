import { Ingredient } from "@/main/ingredients/models/ingredient";
import { CRUDRoutesBuilder } from "../_shared/crud";
import { IngredientDTO } from "@/dtos/ingredients/ingredient";
import { IngredientsController } from "@/controllers/ingredients/ingredients";
import { IRoutesBuilder } from "@/interfaces/_shared/routesBuilder";

export class IngredientsRoutesBuilder
  extends CRUDRoutesBuilder<Ingredient, IngredientDTO, IngredientDTO>
  implements IRoutesBuilder
{
  protected controller: IngredientsController;
  readonly path = "/ingredients";

  constructor(controller = new IngredientsController()) {
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
