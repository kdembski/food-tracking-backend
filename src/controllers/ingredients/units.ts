import { Request, Response } from "express";
import { UnitsService } from "@/main/ingredients/services/units";
import { UnitDTO } from "@/dtos/ingredients/unit";
import { UnitMapper } from "@/mappers/ingredients/unit";
import { Unit } from "@/main/ingredients/models/unit";
import { UnitValidator } from "@/main/ingredients/validators/unit";
import { ApiError } from "@/_shared/errors/models/apiError";
import { UnitsListFilters } from "@/types/ingredients/units";
import { ListController } from "../_shared/list";
import { CRUDController } from "../_shared/crud";

export class UnitsController extends CRUDController<Unit, UnitDTO, UnitDTO> {
  protected service: UnitsService;
  protected mapper: UnitMapper;
  protected validator: UnitValidator;
  list: ListController<Unit, UnitDTO, UnitDTO, UnitsListFilters>;

  constructor(
    service = new UnitsService(),
    mapper = new UnitMapper(),
    validator = new UnitValidator(),
    list = new ListController(service.list)
  ) {
    super(service, mapper, validator);
    this.service = service;
    this.mapper = mapper;
    this.validator = validator;
    this.list = list;
  }

  async getOptions(request: Request, response: Response) {
    try {
      const unitOptions = await this.service.getOptions();
      response.json(unitOptions);
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }
}
