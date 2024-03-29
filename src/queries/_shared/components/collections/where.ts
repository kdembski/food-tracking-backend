import { WhereOperators, WheresCollectionItems } from "@/types/_shared/queries";
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

    const lastWhere = this.items.at(-1);
    if (lastWhere === WhereOperators.AND || lastWhere === WhereOperators.OR) {
      this.items.pop();
    }

    if (this.items.length === 0) {
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
