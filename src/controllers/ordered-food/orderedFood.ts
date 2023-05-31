import { Request, Response } from "express";
import { OrderedFoodDTO } from "@/dtos/ordered-food/orderedFood";
import { OrderedFoodMapper } from "@/mappers/ordered-food/orderedFood";
import { OrderedFood } from "@/main/ordered-food/models/orderedFood";
import { RequestQueryHelper } from "@/helpers/requestQuery";
import { OrderedFoodService } from "@/main/ordered-food/services/orderedFood";
import { OrderedFoodValidator } from "@/main/ordered-food/validators/orderedFood";
import { ListController } from "../_shared/list";
import { CRUDController } from "../_shared/crud";
import { OrderedFoodListFilters } from "@/types/ordered-food/orderedFood";
import { TagsMapper } from "@/mappers/_shared/tags";
import { ApiError } from "@/_shared/errors/models/apiError";
import { ListMapper } from "@/main/_shared/list/listMapper";

export class OrderedFoodController extends CRUDController<
  OrderedFood,
  OrderedFoodDTO,
  OrderedFoodDTO
> {
  protected service: OrderedFoodService;
  protected mapper: OrderedFoodMapper;
  protected validator: OrderedFoodValidator;
  list: ListController<
    OrderedFood,
    OrderedFoodDTO,
    OrderedFoodDTO,
    OrderedFoodListFilters
  >;

  constructor(
    service = new OrderedFoodService(),
    mapper = new OrderedFoodMapper(),
    validator = new OrderedFoodValidator(),
    list = new ListController(service.list, new ListMapper(mapper))
  ) {
    super(service, mapper, validator);
    this.service = service;
    this.mapper = mapper;
    this.validator = validator;
    this.list = list;
  }

  async getTags(request: Request, response: Response) {
    try {
      const { searchPhrase, tags } = new RequestQueryHelper(request.query);
      const results = await this.service.getTags({ searchPhrase, tags });
      response.json(new TagsMapper().toDTO(results));
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }
}
