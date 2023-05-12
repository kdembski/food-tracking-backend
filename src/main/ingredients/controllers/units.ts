import { ListBuilder } from "@/base/list/builders/list";
import { UnitsRepository } from "@/repositories/ingredients/units";
import { RequestQueryData } from "@/types/helpers/requestQuery";
import { Unit } from "../models/unit";
import { UnitsList } from "../models/unitsList";
import { RequestQueryHelper } from "@/helpers/requestQuery";
import { IDbEntityController } from "@/interfaces/base/db-entity/dbEntityController";

export class UnitsController implements IDbEntityController<Unit> {
  async getList(query: RequestQueryData) {
    const { searchPhrase } = new RequestQueryHelper(query);
    const ingredientsList = new UnitsList();
    const listBuilder = new ListBuilder(ingredientsList);
    await listBuilder.build(query, { searchPhrase });

    return ingredientsList;
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
