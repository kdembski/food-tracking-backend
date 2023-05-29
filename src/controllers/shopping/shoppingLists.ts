import { Request, Response } from "express";
import { ShoppingListDTO } from "@/dtos/shopping/shoppingLists";
import { RequestParamsHelper } from "@/helpers/requestParams";
import { ShoppingItemsCollectionService } from "@/main/shopping/services/shoppingItemsCollection";
import { ShoppingListsService } from "@/main/shopping/services/shoppingLists";
import { ShoppingListValidator } from "@/main/shopping/validators/shoppingList";
import { ShoppingItemsCollectionMapper } from "@/mappers/shopping/shoppingItemsCollection";
import { ShoppingListMapper } from "@/mappers/shopping/shoppingList";
import { ShoppingListsCollectionMapper } from "@/mappers/shopping/shoppingListsCollection";
import { CRUDController } from "../_shared/crud";
import { ShoppingList } from "@/main/shopping/models/shoppingList";
import { ApiError } from "@/_shared/errors/models/apiError";

export class ShoppingListsController extends CRUDController<
  ShoppingList,
  ShoppingListDTO,
  ShoppingListDTO
> {
  private itemsCollectionService: ShoppingItemsCollectionService;
  private itemsCollectionMapper: ShoppingItemsCollectionMapper;
  private collectionMapper: ShoppingListsCollectionMapper;
  protected service: ShoppingListsService;
  protected mapper: ShoppingListMapper;
  protected validator: ShoppingListValidator;

  constructor(
    service = new ShoppingListsService(),
    mapper = new ShoppingListMapper(),
    validator = new ShoppingListValidator(),
    itemsCollectionService = new ShoppingItemsCollectionService(),
    itemsCollectionMapper = new ShoppingItemsCollectionMapper(),
    collectionMapper = new ShoppingListsCollectionMapper()
  ) {
    super(service, mapper, validator);
    this.service = service;
    this.mapper = mapper;
    this.validator = validator;
    this.itemsCollectionService = itemsCollectionService;
    this.itemsCollectionMapper = itemsCollectionMapper;
    this.collectionMapper = collectionMapper;
  }

  async getItemsById(request: Request<{ id: string }>, response: Response) {
    try {
      const id = new RequestParamsHelper(request.params).id;
      const items =
        await this.itemsCollectionService.getNotRemovedByShoppingListId(id);
      const dtos = this.itemsCollectionMapper.toDTO(items);

      response.json(dtos);
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }

  async getAll(request: Request, response: Response) {
    try {
      const collection = await this.service.getAll();
      const dtos = this.collectionMapper.toDTO(collection);

      response.json(dtos);
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }

  async deleteItemsById(request: Request<{ id: string }>, response: Response) {
    try {
      const id = new RequestParamsHelper(request.params).id;

      const results = await this.itemsCollectionService.deleteByShoppingListId(
        id
      );
      response.json(results);
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }
}
