import { UnitDTO, UnitOptionDTO } from "@/dtos/ingredients/unit";
import { Unit } from "@/main/ingredients/models/unit";
import { IDbEntityController, IRepository } from "../base/dbEntity";
import { IListRepository } from "../base/list";
import { UnitsListFilters } from "@/types/ingredients/units";

export interface IUnit {}

export interface IUnitsRepository
  extends IRepository<Unit, UnitDTO>,
    IListRepository<UnitDTO, UnitsListFilters> {
  selectOptions: () => Promise<UnitOptionDTO[]>;
}

export interface IUnitsController extends IDbEntityController<Unit> {
  getOptions: () => Promise<UnitOptionDTO[]>;
}
