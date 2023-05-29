import { ShoppingItem } from "@/main/shopping/models/shoppingItem";
import { CRUDRoutesBuilder } from "../_shared/crud";
import {
  ShoppingItemDTO,
  ShoppingItemQueryResult,
} from "@/dtos/shopping/shoppingItems";
import { ShoppingItemsController } from "@/controllers/shopping/shoppingItems";
import { IRoutesBuilder } from "@/interfaces/_shared/routesBuilder";

export class ShoppingItemsRoutesBuilder
  extends CRUDRoutesBuilder<
    ShoppingItem,
    ShoppingItemDTO,
    ShoppingItemQueryResult
  >
  implements IRoutesBuilder
{
  protected controller: ShoppingItemsController;
  readonly path = "/shopping/items";

  constructor(controller = new ShoppingItemsController()) {
    super(controller);
    this.controller = controller;
  }

  override build() {
    this.router.post("/collection", (req, res) =>
      this.controller.createCollection(req, res)
    );
    this.router.post("/recipes", (req, res) =>
      this.controller.createFromRecipeIngredients(req, res)
    );
    this.router.put("/:id/set-checked", (req, res) =>
      this.controller.updateIsChecked(req, res)
    );
    this.router.put("/:id/set-removed", (req, res) =>
      this.controller.updateIsRemoved(req, res)
    );
    this.router.delete("/recipes/:id", (req, res) =>
      this.controller.deleteByRecipeId(req, res)
    );
    super.build();
  }
}
