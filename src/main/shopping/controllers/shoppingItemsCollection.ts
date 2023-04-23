import { RecipeIngredientsCollectionController } from "@/main/recipes/controllers/recipeIngredientsCollection";
import { ShoppingItemsRepository } from "@/repositories/shopping/shoppingItems";
import { ShoppingItem } from "../models/shoppingItem";
import { ShoppingItemsController } from "./shoppingItems";
import { ShoppingItemsCollectionMapper } from "@/mappers/shopping/shoppingItemsCollection";

export class ShoppingItemsCollectionController {
  async getNotRemovedByShoppingListId(shoppingListId: number) {
    const dtos =
      await new ShoppingItemsRepository().selectNotRemovedByShoppingListId(
        shoppingListId
      );
    return new ShoppingItemsCollectionMapper().fromQueryResultToDomain(dtos);
  }

  getNotRemovedCountByShoppingListId(shoppingListId: number) {
    return new ShoppingItemsRepository().selectNotRemovedCountByShoppingListId(
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

      return new ShoppingItemsController().create(item);
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
        return new ShoppingItemsController().updateIsRemoved(item.id, true);
      }

      return new ShoppingItemsController().delete(item.id);
    });

    await Promise.all(promises);
  }
}
