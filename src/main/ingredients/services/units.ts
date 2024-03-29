import { UnitDTO } from "@/dtos/ingredients/unit";
import { CRUDService } from "@/main/_shared/crud/services/crud";
import { Unit } from "../models/unit";
import { UnitsRepository } from "@/repositories/ingredients/units";
import { UnitMapper } from "@/mappers/ingredients/unit";
import { UnitsListFilters } from "@/types/ingredients/units";
import { ListService } from "@/main/_shared/list/listService";
import { UnitsList } from "../models/unitsList";

export class UnitsService extends CRUDService<Unit, UnitDTO> {
  protected repository: UnitsRepository;
  protected mapper: UnitMapper;
  list: ListService<Unit, UnitDTO, UnitsListFilters>;

  constructor(
    repository = new UnitsRepository(),
    mapper = new UnitMapper(),
    list = new ListService(new UnitsList(), repository.list)
  ) {
    super(repository, mapper);
    this.repository = repository;
    this.mapper = mapper;
    this.list = list;
  }

  getOptions() {
    return this.repository.selectOptions();
  }
}
