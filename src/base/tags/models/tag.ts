export class Tag {
  private _name: string;
  private _count: number;

  constructor(name: string, count = 1) {
    this._name = name;
    this._count = count;
  }

  get name() {
    return this._name;
  }

  get count() {
    return this._count;
  }

  set count(value) {
    this._count = value;
  }
}
