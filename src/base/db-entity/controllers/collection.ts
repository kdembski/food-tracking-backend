import {
  IDBEntityCollection,
  IDbEntityController,
  IDBEntityModel,
} from "@/interfaces/base/dbEntity";

export abstract class DBEntityCollectionController<
  CollectionItem extends IDBEntityModel,
  Collection extends IDBEntityCollection<CollectionItem>
> {
  private collectionItemController: IDbEntityController<CollectionItem>;

  constructor(collectionItemController: IDbEntityController<CollectionItem>) {
    this.collectionItemController = collectionItemController;
  }

  abstract getCollection(selectorId: number): Promise<Collection>;
  abstract setSelectorId(item: CollectionItem, selectorId: number): void;

  async update(
    newCollection: Collection | undefined,
    selectorId: number | undefined
  ) {
    if (!newCollection || !selectorId) {
      return;
    }

    const oldCollection = await this.getCollection(selectorId);
    const oldIds = oldCollection.items.map((item) => item.id);
    const newIds = newCollection.items.map((item) => item.id);

    const itemIdsToBeRemoved = oldIds.filter((id) => !newIds.includes(id));

    const promises = newCollection.items.map((item) => {
      if (!item.id) {
        this.setSelectorId(item, selectorId);
        this.collectionItemController.create(item);
        return;
      }

      this.collectionItemController.update(item);
    });

    const deletePromises = itemIdsToBeRemoved.map((id) => {
      if (!id) {
        return;
      }
      return this.collectionItemController.delete(id);
    });

    await Promise.all([...promises, ...deletePromises]);
  }

  async create(collection: Collection, selectorId: number) {
    if (!collection) {
      return;
    }

    const promises = collection.items.map((item) => {
      this.setSelectorId(item, selectorId);
      return this.collectionItemController.create(item);
    });

    await Promise.all(promises);
  }
}
