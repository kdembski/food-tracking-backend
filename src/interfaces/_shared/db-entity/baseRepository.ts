import { OkPacket } from "mysql2";

export interface IBaseRepository<Item, ItemDTO> {
  selectById: (id: number) => Promise<ItemDTO>;
  insert: (data: Item) => Promise<OkPacket>;
  update: (data: Item) => Promise<OkPacket>;
  delete: (id: number) => Promise<OkPacket>;
}
