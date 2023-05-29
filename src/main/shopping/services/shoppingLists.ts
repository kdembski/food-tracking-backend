import { ShoppingListsRepository } from "@/repositories/shopping/shoppingLists";
import { ShoppingList } from "../models/shoppingList";
import { ShoppingItemsCollectionService } from "./shoppingItemsCollection";
import { ShoppingListsCollectionBuilder } from "../builders/shoppingListsCollection";
import { ShoppingListMapper } from "@/mappers/shopping/shoppingList";
import { CRUDService } from "@/main/_shared/crud/services/crud";
import { ShoppingListDTO } from "@/dtos/shopping/shoppingLists";
import { ShoppingListsCollectionMapper } from "@/mappers/shopping/shoppingListsCollection";

export class ShoppingListsService extends CRUDService<
  ShoppingList,
  ShoppingListDTO
> {
  protected repository: ShoppingListsRepository;
  protected mapper: ShoppingListMapper;
  private itemsCollectionService: ShoppingItemsCollectionService;
  private collectionBuilder: ShoppingListsCollectionBuilder;
  private collectionMapper: ShoppingListsCollectionMapper;

  constructor(
    repository = new ShoppingListsRepository(),
    mapper = new ShoppingListMapper(),
    itemsCollectionService = new ShoppingItemsCollectionService(),
    collectionBuilder = new ShoppingListsCollectionBuilder(),
    collectionMapper = new ShoppingListsCollectionMapper()
  ) {
    super(repository, mapper);
    this.repository = repository;
    this.mapper = mapper;
    this.itemsCollectionService = itemsCollectionService;
    this.collectionBuilder = collectionBuilder;
    this.collectionMapper = collectionMapper;
  }

  async getAll() {
    const dtos = await this.repository.selectAll();
    this.collectionBuilder.collection = this.collectionMapper.toDomain(dtos);
    await this.collectionBuilder.build();

    return this.collectionBuilder.collection;
  }

  async delete(id: number) {
    await this.itemsCollectionService.deleteByShoppingListId(id);
    return this.repository.delete(id);
  }
}
