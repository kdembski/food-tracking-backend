import { OkPacket } from "mysql2";

export interface IRepository<Item> {
  insert: (data: Item) => Promise<OkPacket>;
  update: (data: Item) => Promise<OkPacket>;
  delete: (id: number) => Promise<OkPacket>;
}
