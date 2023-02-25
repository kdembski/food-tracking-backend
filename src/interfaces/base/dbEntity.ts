import { OkPacket } from "mysql2";

export interface IDBEntityModel {
  get id(): number | undefined;
  set id(value: number | undefined);
}

export interface IDBEntityCollection<Item> {
  get items(): Item[];
  set items(value: Item[]);
}

export interface IDbEntityController<Model> {
  getById: (id: number) => Promise<Model>;
  create: (data: Model) => Promise<OkPacket>;
  update: (data: Model) => Promise<OkPacket>;
  delete: (id: number) => Promise<OkPacket>;
}

export interface IRepository<Item, ItemDTO> {
  selectById: (id: number) => Promise<ItemDTO>;
  insert: (data: Item) => Promise<OkPacket>;
  update: (data: Item) => Promise<OkPacket>;
  delete: (id: number) => Promise<OkPacket>;
}
