import { Request, Response } from "express";
import { IngredientsService } from "@/main/ingredients/services/ingredients";
import { IngredientDTO } from "@/dtos/ingredients/ingredient";
import { IngredientMapper } from "@/mappers/ingredients/ingredient";
import { IngredientValidator } from "@/main/ingredients/validators/ingredient";
import { ApiError } from "@/_shared/errors/models/apiError";
import { DbEntityController } from "../_shared/dbEntity";
import { Ingredient } from "@/main/ingredients/models/ingredient";
import { ListController } from "../_shared/list";
import { IngredientsListFilters } from "@/types/ingredients/ingredients";

export class IngredientsController extends DbEntityController<
  Ingredient,
  IngredientDTO,
  IngredientDTO
> {
  protected service: IngredientsService;
  protected mapper: IngredientMapper;
  protected validator: IngredientValidator;
  list: ListController<
    Ingredient,
    IngredientDTO,
    IngredientDTO,
    IngredientsListFilters
  >;

  constructor(
    service = new IngredientsService(),
    mapper = new IngredientMapper(),
    validator = new IngredientValidator(),
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
      const options = await this.service.getOptions();
      response.json(options);
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }
}
