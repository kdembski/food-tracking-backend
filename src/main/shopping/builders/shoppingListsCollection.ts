import { ShoppingListsCollection } from "../models/shoppingListsCollection";
import { ShoppingItemsCollectionService } from "../services/shoppingItemsCollection";

export class ShoppingListsCollectionBuilder {
  private _collection: ShoppingListsCollection;
  private itemsService: ShoppingItemsCollectionService;

  constructor(itemsService = new ShoppingItemsCollectionService()) {
    this._collection = new ShoppingListsCollection([]);
    this.itemsService = itemsService;
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
      return this.itemsService.getNotRemovedCountByShoppingListId(list.id);
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
      return this.itemsService.getUniqueNotRemovedRecipeIdsByShoppingListId(
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

  set collection(value) {
    this._collection = value;
  }
}
