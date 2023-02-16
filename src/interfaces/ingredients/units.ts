import { UnitDTO, UnitOptionDTO } from "@/dtos/ingredients/unit";
import { Unit } from "@/main/ingredients/models/unit";
import { IDbEntityController, IRepository } from "../base/dbEntity";
import { IListRepository } from "../base/list";

export interface IUnit {}

export interface IUnitsRepository
  extends IRepository<Unit, UnitDTO>,
    IListRepository<UnitDTO> {
  selectAll: () => Promise<UnitDTO[]>;
  selectOptions: () => Promise<UnitOptionDTO[]>;
}

export interface IUnitsController extends IDbEntityController<Unit> {
  getAll: () => Promise<Unit[]>;
  getOptions: () => Promise<UnitOptionDTO[]>;
}
