import { Request, Response } from "express";
import { ShoppingCustomItemMapper } from "@/mappers/shopping/shoppingCustomItem";
import { ShoppingCustomItemDTO } from "@/dtos/shopping/shoppingCustomItems";
import { ShoppingCustomItem } from "@/main/shopping/models/shoppingCustomItem";
import { ShoppingCustomItemsService } from "@/main/shopping/services/shoppingCustomItems";
import { ShoppingCustomItemValidator } from "@/main/shopping/validators/shoppingCustomItem";
import { ApiError } from "@/_shared/errors/models/apiError";
import { DbEntityController } from "../_shared/dbEntity";

export class ShoppingCustomItemsController extends DbEntityController<
  ShoppingCustomItem,
  ShoppingCustomItemDTO,
  ShoppingCustomItemDTO
> {
  protected service: ShoppingCustomItemsService;
  protected mapper: ShoppingCustomItemMapper;
  protected validator: ShoppingCustomItemValidator;

  constructor(
    service = new ShoppingCustomItemsService(),
    mapper = new ShoppingCustomItemMapper(),
    validator = new ShoppingCustomItemValidator()
  ) {
    super(service, mapper, validator);
    this.service = service;
    this.mapper = mapper;
    this.validator = validator;
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
