import { ShoppingItemsRepository } from "@/repositories/shopping/shoppingItems";
import { ShoppingItem } from "../models/shoppingItem";
import { ShoppingItemQueryResult } from "@/dtos/shopping/shoppingItems";
import { CRUDService } from "@/main/_shared/crud/services/crud";
import { ShoppingItemQueryResultMapper } from "@/mappers/shopping/shoppingItemQueryResult";

export class ShoppingItemsService extends CRUDService<
  ShoppingItem,
  ShoppingItemQueryResult
> {
  protected repository: ShoppingItemsRepository;
  protected mapper: ShoppingItemQueryResultMapper;

  constructor(
    repository = new ShoppingItemsRepository(),
    mapper = new ShoppingItemQueryResultMapper()
  ) {
    super(repository, mapper);
    this.repository = repository;
    this.mapper = mapper;
  }

  updateIsChecked(id: number, isChecked: boolean) {
    return this.repository.updateIsChecked(id, isChecked);
  }

  updateIsRemoved(id: number, isRemoved: boolean) {
    return this.repository.updateIsRemoved(id, isRemoved);
  }

  deleteByRecipeId(recipeId: number) {
    return this.repository.deleteByRecipeId(recipeId);
  }
}
