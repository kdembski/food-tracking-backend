import { ListBuilder } from "@/base/list/builders/list";
import { IUnitsController } from "@/interfaces/ingredients/units";
import { UnitsRepository } from "@/repositories/ingredients/units";
import { RequestQueryData } from "@/types/helpers/requestQuery";
import { Unit } from "../models/unit";
import { UnitsList } from "../models/unitsList";

export class UnitsController implements IUnitsController {
  async getList(query: RequestQueryData) {
    const ingredientsList = new UnitsList();
    const listBuilder = new ListBuilder(ingredientsList);
    await listBuilder.build(query);

    return ingredientsList;
  }

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
