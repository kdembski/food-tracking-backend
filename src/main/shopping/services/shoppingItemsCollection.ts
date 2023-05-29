import { RecipeIngredientsCollectionService } from "@/main/recipes/services/recipe-ingredients-collection/recipeIngredientsCollection";
import { ShoppingItemsRepository } from "@/repositories/shopping/shoppingItems";
import { ShoppingItem } from "../models/shoppingItem";
import { ShoppingItemsService } from "./shoppingItems";
import { ShoppingItemsCollectionMapper } from "@/mappers/shopping/shoppingItemsCollection";
import { ShoppingItemsCollection } from "../models/shoppingItemsCollection";

export class ShoppingItemsCollectionService {
  private service: ShoppingItemsService;
  private repository: ShoppingItemsRepository;
  private collectionMapper: ShoppingItemsCollectionMapper;
  private recipeIngredientsCollectionService: RecipeIngredientsCollectionService;

  constructor(
    service = new ShoppingItemsService(),
    repository = new ShoppingItemsRepository(),
    collectionMapper = new ShoppingItemsCollectionMapper(),
    recipeIngredientsCollectionService = new RecipeIngredientsCollectionService()
  ) {
    this.service = service;
    this.repository = repository;
    this.collectionMapper = collectionMapper;
    this.recipeIngredientsCollectionService =
      recipeIngredientsCollectionService;
  }

  async getNotRemovedByShoppingListId(shoppingListId: number) {
    const dtos = await this.repository.selectNotRemovedByShoppingListId(
      shoppingListId
    );
    return this.collectionMapper.fromQueryResultToDomain(dtos);
  }

  getNotRemovedCountByShoppingListId(shoppingListId: number) {
    return this.repository.selectNotRemovedCountByShoppingListId(
      shoppingListId
    );
  }

  async getUniqueNotRemovedRecipeIdsByShoppingListId(shoppingListId: number) {
    const collection = await this.getNotRemovedByShoppingListId(shoppingListId);
    const recipeIds = collection.items
      ?.map((item) => item.recipeId)
      .filter((item): item is number => !!item);
    return [...new Set(recipeIds)];
  }

  async create(collection: ShoppingItemsCollection) {
    const promises =
      collection.items?.map((item) => this.service.create(item)) || [];
    await Promise.all(promises);
  }

  async createFromRecipeIngredients(
    shoppingListId: number,
    recipeId: number,
    portions: number
  ) {
    const collection =
      await this.recipeIngredientsCollectionService.getByRecipeId(recipeId);
    const promises = collection.items.map((ingredient) => {
      const amount = ingredient.amount
        ? ingredient.amount * portions
        : undefined;

      const item = new ShoppingItem({
        recipeId,
        shoppingListId,
        ingredientUnitId: ingredient.ingredientUnitId,
        amount,
      });

      return this.service.create(item);
    });

    await Promise.all(promises);
  }

  async deleteByShoppingListId(shoppingListId: number) {
    const collection = await this.getNotRemovedByShoppingListId(shoppingListId);

    if (!collection.items) {
      return;
    }

    const promises = collection.items.map((item) => {
      if (!item.id) {
        return;
      }

      if (item.isChecked) {
        return this.service.updateIsRemoved(item.id, true);
      }

      return this.service.delete(item.id);
    });

    await Promise.all(promises);
  }
}
