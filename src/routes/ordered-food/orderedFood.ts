import { OrderedFood } from "@/main/ordered-food/models/orderedFood";
import { DbEntityRoutesBuilder } from "../_shared/dbEntity";
import { OrderedFoodDTO } from "@/dtos/ordered-food/orderedFood";
import { OrderedFoodController } from "@/controllers/ordered-food/orderedFood";
import { IRoutesBuilder } from "@/interfaces/_shared/routesBuilder";

export class OrderedFoodRoutesBuilder
  extends DbEntityRoutesBuilder<OrderedFood, OrderedFoodDTO, OrderedFoodDTO>
  implements IRoutesBuilder
{
  protected controller: OrderedFoodController;
  readonly path = "/ordered";

  constructor(controller = new OrderedFoodController()) {
    super(controller);
    this.controller = controller;
  }

  override build() {
    this.router.get("/", (req, res) => this.controller.list.getList(req, res));
    this.router.get("/tags", (req, res) => this.controller.getTags(req, res));
    super.build();
  }
}
