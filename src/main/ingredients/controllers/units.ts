import { IUnitsController } from "@/interfaces/ingredients/units";
import { UnitsRepository } from "@/repositories/ingredients/units";
import { Unit } from "../models/unit";

export class UnitsController implements IUnitsController {
  async getAll() {
    const dtos = await new UnitsRepository().selectAll();
    return dtos.map((dto) => new Unit(dto));
  }

  getOptions() {
    return new UnitsRepository().selectOptions();
  }

  async getById(id: number) {
    const dto = await new UnitsRepository().selectById(id);
    return new Unit(dto);
  }

  create(unit: Unit) {
    return new UnitsRepository().insert(unit);
  }

  update(unit: Unit) {
    return new UnitsRepository().update(unit);
  }

  delete(id: number) {
    return new UnitsRepository().delete(id);
  }
}
