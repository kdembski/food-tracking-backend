import { ShoppingCustomItem } from "@/main/shopping/models/shoppingCustomItem";
import { CRUDRoutesBuilder } from "../_shared/crud";
import { ShoppingCustomItemDTO } from "@/dtos/shopping/shoppingCustomItems";
import { ShoppingCustomItemsController } from "@/controllers/shopping/shoppingCustomItem";
import { IRoutesBuilder } from "@/interfaces/_shared/routesBuilder";

export class ShoppingCustomItemsRoutesBuilder
  extends CRUDRoutesBuilder<
    ShoppingCustomItem,
    ShoppingCustomItemDTO,
    ShoppingCustomItemDTO
  >
  implements IRoutesBuilder
{
  protected controller: ShoppingCustomItemsController;
  readonly path = "/shopping/custom-items";

  constructor(controller = new ShoppingCustomItemsController()) {
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
