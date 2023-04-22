import { ShoppingListCollectionMapper } from "@/mappers/shopping/shoppingListCollection";
import { ShoppingItemsController } from "../controllers/shoppingItems";
import { ShoppingListCollection } from "../models/shoppingListCollection";
import { ShoppingListDTO } from "@/dtos/shopping/shoppingLists";

export class ShoppingListCollectionBuilder {
  _collection: ShoppingListCollection;

  constructor(items: ShoppingListDTO[]) {
    this._collection = new ShoppingListCollectionMapper().toDomain(items);
  }

  async build() {
    await Promise.all([this.produceCounts(), this.produceRecipeIds()]);
  }

  async produceCounts() {
    const items = this.collection.items;
    if (!items) {
      return;
    }

    const counts = items.map((list) => {
      if (!list.id) {
        return;
      }
      return new ShoppingItemsController().getNotRemovedCountByShoppingListId(
        list.id
      );
    });

    await Promise.all(counts).then((counts) => {
      items.forEach(async (list, index) => {
        list.count = counts[index];
      });
    });
  }

  async produceRecipeIds() {
    const items = this.collection.items;
    if (!items) {
      return;
    }

    const recipeIds = items.map((list) => {
      if (!list.id) {
        return;
      }
      return new ShoppingItemsController().getUniqueNotRemovedRecipeIdsByShoppingListId(
        list.id
      );
    });

    await Promise.all(recipeIds).then((recipeIds) => {
      items.forEach(async (list, index) => {
        list.recipeIds = recipeIds[index];
      });
    });
  }

  get collection() {
    return this._collection;
  }
}
