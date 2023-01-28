export class Field {
  private table: string;
  private name: string;
  private alias: string;

  constructor(data: { table?: string; name: string; alias?: string }) {
    this.table = data.table || "";
    this.name = data.name;
    this.alias = data.alias || "";
  }

  prepare() {
    if (this.table && this.alias) {
      return `${this.table}.${this.name} AS ${this.alias}`;
    }

    if (this.table) {
      return `${this.table}.${this.name}`;
    }

    return `${this.name}`;
  }
}
