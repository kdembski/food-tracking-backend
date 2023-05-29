import { Request, Response } from "express";
import {
  ShoppingItemDTO,
  ShoppingItemQueryResult,
} from "@/dtos/shopping/shoppingItems";
import { RequestParamsHelper } from "@/helpers/requestParams";
import { ShoppingItemsService } from "@/main/shopping/services/shoppingItems";
import { ShoppingItemsCollectionService } from "@/main/shopping/services/shoppingItemsCollection";
import { ShoppingItemValidator } from "@/main/shopping/validators/shoppingItem";
import { ShoppingItemMapper } from "@/mappers/shopping/shoppingItem";
import { ShoppingItemsCollectionMapper } from "@/mappers/shopping/shoppingItemsCollection";
import { ShoppingItem } from "@/main/shopping/models/shoppingItem";
import { DbEntityController } from "../_shared/dbEntity";
import { ApiError } from "@/_shared/errors/models/apiError";

export class ShoppingItemsController extends DbEntityController<
  ShoppingItem,
  ShoppingItemDTO,
  ShoppingItemQueryResult
> {
  private collectionService: ShoppingItemsCollectionService;
  private collectionMapper: ShoppingItemsCollectionMapper;
  protected service: ShoppingItemsService;
  protected mapper: ShoppingItemMapper;
  protected validator: ShoppingItemValidator;

  constructor(
    service = new ShoppingItemsService(),
    mapper = new ShoppingItemMapper(),
    validator = new ShoppingItemValidator(),
    collectionService = new ShoppingItemsCollectionService(),
    collectionMapper = new ShoppingItemsCollectionMapper()
  ) {
    super(service, mapper, validator);
    this.service = service;
    this.mapper = mapper;
    this.validator = validator;
    this.collectionService = collectionService;
    this.collectionMapper = collectionMapper;
  }

  async createCollection(
    request: Request<{}, {}, ShoppingItemDTO[]>,
    response: Response
  ) {
    try {
      const data = request.body;
      const collection = this.collectionMapper.toDomain(data);

      const results = await this.collectionService.create(collection);
      response.json(results);
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }

  async createFromRecipeIngredients(
    request: Request<
      {},
      {},
      { shoppingListId: number; recipeId: number; portions: number }
    >,
    response: Response
  ) {
    try {
      const { shoppingListId, recipeId, portions } = request.body;
      const results = await this.collectionService.createFromRecipeIngredients(
        shoppingListId,
        recipeId,
        portions
      );

      response.json(results);
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }

  async updateIsChecked(
    request: Request<{ id: string }, {}, { isChecked: boolean }>,
    response: Response
  ) {
    try {
      const id = new RequestParamsHelper(request.params).id;
      const isChecked = request.body.isChecked;

      const results = await this.service.updateIsChecked(id, isChecked);
      response.json(results);
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }

  async updateIsRemoved(
    request: Request<{ id: string }, {}, { isRemoved: boolean }>,
    response: Response
  ) {
    try {
      const id = new RequestParamsHelper(request.params).id;
      const isRemoved = request.body.isRemoved;

      const results = await this.service.updateIsRemoved(id, isRemoved);
      response.json(results);
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }

  async deleteByRecipeId(request: Request<{ id: string }>, response: Response) {
    try {
      const recipeId = new RequestParamsHelper(request.params).id;

      const results = await this.service.deleteByRecipeId(recipeId);
      response.json(results);
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }
}
