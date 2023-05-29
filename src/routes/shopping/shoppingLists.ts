import { ShoppingList } from "@/main/shopping/models/shoppingList";
import { DbEntityRoutesBuilder } from "../_shared/dbEntity";
import { ShoppingListDTO } from "@/dtos/shopping/shoppingLists";
import { ShoppingListsController } from "@/controllers/shopping/shoppingLists";
import { IRoutesBuilder } from "@/interfaces/_shared/routesBuilder";

export class ShoppingListsRoutesBuilder
  extends DbEntityRoutesBuilder<ShoppingList, ShoppingListDTO, ShoppingListDTO>
  implements IRoutesBuilder
{
  protected controller: ShoppingListsController;
  readonly path = "/shopping/lists";

  constructor(controller = new ShoppingListsController()) {
    super(controller);
    this.controller = controller;
  }

  override build() {
    this.router.get("/:id/items", (req, res) =>
      this.controller.getItemsById(req, res)
    );
    this.router.get("/", (req, res) => this.controller.getAll(req, res));
    this.router.delete("/:id/items", (req, res) =>
      this.controller.deleteItemsById(req, res)
    );
    super.build();
  }
}
