import { Unit } from "@/main/ingredients/models/unit";
import { DbEntityRoutesBuilder } from "../_shared/dbEntity";
import { UnitDTO } from "@/dtos/ingredients/unit";
import { UnitsController } from "@/controllers/ingredients/units";
import { IRoutesBuilder } from "@/interfaces/_shared/routesBuilder";

export class UnitsRoutesBuilder
  extends DbEntityRoutesBuilder<Unit, UnitDTO, UnitDTO>
  implements IRoutesBuilder
{
  protected controller: UnitsController;
  readonly path = "/ingredients/units";

  constructor(controller = new UnitsController()) {
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
