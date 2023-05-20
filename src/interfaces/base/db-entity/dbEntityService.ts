import { OkPacket } from "mysql2";

export interface IDbEntityService<Model> {
  getById: (id: number) => Promise<Model>;
  create: (data: Model) => Promise<OkPacket>;
  update: (data: Model) => Promise<OkPacket>;
  delete: (id: number) => Promise<OkPacket>;
}
