import { WheresCollectionItems } from "@/types/base/queries";
import { Where } from "../models/where";

export class WheresCollection {
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
    }, "WHERE");
  }
}
