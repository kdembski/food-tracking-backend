import { UnitDTO, UnitOptionDTO } from "@/dtos/ingredients/unit";
import { Unit } from "@/main/ingredients/models/unit";
import {
  IDbEntityController,
  IDbEntityModel,
  IRepository,
} from "../base/dbEntity";

export interface IUnit extends IDbEntityModel<UnitDTO> {}

export interface IUnitsRepository extends IRepository<Unit, UnitDTO> {
  selectAll: () => Promise<UnitDTO[]>;
  selectOptions: () => Promise<UnitOptionDTO[]>;
}

export interface IUnitsController extends IDbEntityController<Unit, UnitDTO> {
  getAll: () => Promise<Unit[]>;
  getOptions: () => Promise<UnitOptionDTO[]>;
}
