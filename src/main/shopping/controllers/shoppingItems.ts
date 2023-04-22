import { IShoppingItemsController } from "@/interfaces/shopping/shopping-items/shoppingItemsController";
import { ShoppingItemQueryResultMapper } from "@/mappers/shopping/shoppingItemQueryResult";
import { ShoppingItemsRepository } from "@/repositories/shopping/shoppingItems";
import { ShoppingItem } from "../models/shoppingItem";
import { RecipeIngredientsCollectionController } from "@/main/recipes/controllers/recipeIngredientsCollection";

export class ShoppingItemsController implements IShoppingItemsController {
  async getById(id: number) {
    const dto = await new ShoppingItemsRepository().selectById(id);
    return new ShoppingItemQueryResultMapper().toDomain(dto);
  }

  async getNotRemovedByShoppingListId(shoppingListId: number) {
    const dtos =
      await new ShoppingItemsRepository().selectNotRemovedByShoppingListId(
        shoppingListId
      );
    return dtos.map((dto) => new ShoppingItemQueryResultMapper().toDomain(dto));
  }

  getNotRemovedCountByShoppingListId(shoppingListId: number) {
    return new ShoppingItemsRepository().selectNotRemovedCountByShoppingListId(
      shoppingListId
    );
  }

  async getUniqueNotRemovedRecipeIdsByShoppingListId(shoppingListId: number) {
    const items = await this.getNotRemovedByShoppingListId(shoppingListId);
    const recipeIds = items
      .map((item) => item.recipeId)
      .filter((item): item is number => !!item);
    return [...new Set(recipeIds)];
  }

  create(item: ShoppingItem) {
    return new ShoppingItemsRepository().insert(item);
  }

  async createFromRecipeIngredients(
    shoppingListId: number,
    recipeId: number,
    portions: number
  ) {
    const collection =
      await new RecipeIngredientsCollectionController().getByRecipeId(recipeId);
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

      return this.create(item);
    });

    await Promise.all(promises);
  }

  update(item: ShoppingItem) {
    return new ShoppingItemsRepository().update(item);
  }

  updateIsChecked(id: number, isChecked: boolean) {
    return new ShoppingItemsRepository().updateIsChecked(id, isChecked);
  }

  updateIsRemoved(id: number, isRemoved: boolean) {
    return new ShoppingItemsRepository().updateIsRemoved(id, isRemoved);
  }

  delete(id: number) {
    return new ShoppingItemsRepository().delete(id);
  }

  deleteByRecipeId(recipeId: number) {
    return new ShoppingItemsRepository().deleteByRecipeId(recipeId);
  }
}
