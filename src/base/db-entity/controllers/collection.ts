import { IDbEntityCollection } from "@/interfaces/base/db-entity/dbEntityCollection";
import { IDbEntityController } from "@/interfaces/base/db-entity/dbEntityController";
import { IDbEntityModel } from "@/interfaces/base/db-entity/dbEntityModel";

export abstract class DbEntityCollectionController<
  CollectionItem extends IDbEntityModel,
  Collection extends IDbEntityCollection<CollectionItem>
> {
  private collectionItemController: IDbEntityController<CollectionItem>;

  constructor(collectionItemController: IDbEntityController<CollectionItem>) {
    this.collectionItemController = collectionItemController;
  }

  abstract getCollection(selectorId: number): Promise<Collection>;
  abstract setSelectorId(item: CollectionItem, selectorId: number): void;
  protected callback(selectorId: number) {
    return;
  }

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
        return this.collectionItemController.create(item);
      }

      return this.collectionItemController.update(item);
    });

    const deletePromises = itemIdsToBeRemoved.map((id) => {
      if (!id) {
        return;
      }
      return this.collectionItemController.delete(id);
    });

    await Promise.all([...promises, ...deletePromises]);
    this.callback(selectorId);
  }

  async create(collection: Collection | undefined, selectorId: number) {
    if (!collection) {
      return;
    }

    const promises = collection.items.map((item) => {
      this.setSelectorId(item, selectorId);
      return this.collectionItemController.create(item);
    });

    await Promise.all(promises);
    this.callback(selectorId);
  }
}
