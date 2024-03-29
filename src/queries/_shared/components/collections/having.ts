import { WheresCollectionItems } from "@/types/_shared/queries";
import { Where } from "../models/where";

export class HavingCollection {
  private items?: WheresCollectionItems[];

  constructor(items?: WheresCollectionItems[]) {
    this.items = items;
  }

  prepare() {
    if (!this.items || this.items.length === 0) {
      return "";
    }

    return this.items.reduce((accum, item) => {
      if (item instanceof Where) {
        accum += " " + item.prepare();
        return accum;
      }

      accum += " " + item;
      return accum;
    }, "HAVING");
  }
}
