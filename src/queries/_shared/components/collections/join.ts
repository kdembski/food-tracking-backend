import { Join } from "../models/join";

export class JoinsCollection {
  private joins: Join[];

  constructor(joins?: Join[]) {
    this.joins = joins || [];
  }

  prepare() {
    return (
      this.joins
        ?.reduce((accum, join) => {
          accum += `${join.prepare()} `;
          return accum;
        }, "")
        .slice(0, -1) || ""
    );
  }
}
