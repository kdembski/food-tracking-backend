import { ShoppingListsCollection } from "../models/shoppingListsCollection";
import { ShoppingListDTO } from "@/dtos/shopping/shoppingLists";
import { ShoppingItemsCollectionController } from "../controllers/shoppingItemsCollection";
import { ShoppingListsCollectionMapper } from "@/mappers/shopping/shoppingListsCollection";

export class ShoppingListsCollectionBuilder {
  _collection: ShoppingListsCollection;

  constructor(items: ShoppingListDTO[]) {
    this._collection = new ShoppingListsCollectionMapper().toDomain(items);
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
      return new ShoppingItemsCollectionController().getNotRemovedCountByShoppingListId(
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
      return new ShoppingItemsCollectionController().getUniqueNotRemovedRecipeIdsByShoppingListId(
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
