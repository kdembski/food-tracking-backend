import { Where } from "../models/where";

export class WheresCollection {
  private wheres: Where[];

  constructor(wheres?: Where[]) {
    this.wheres = wheres || [];
  }

  getAnds() {
    return this.wheres.filter((where) => where.operator === "AND");
  }

  getOrs() {
    return this.wheres.filter((where) => where.operator === "OR");
  }

  prepare() {
    const ands = this.getAnds()
      .reduce((accum, where) => {
        accum += `${where.prepare()} AND `;
        return accum;
      }, "")
      .slice(0, -5);

    const ors = this.getOrs()
      .reduce((accum, where) => {
        accum += `${where.prepare()} OR `;
        return accum;
      }, "")
      .slice(0, -4);

    if (ands && ors) {
      return `WHERE (${ands}) OR ${ors}`;
    }

    if (ands) {
      return `WHERE ${ands}`;
    }

    if (ors) {
      return `WHERE ${ors}`;
    }

    return "";
  }
}
