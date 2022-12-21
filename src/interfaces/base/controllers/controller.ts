import { OkPacket } from "mysql2";

export interface IController<Model, ModelDto> {
  getById: (id: number) => Promise<Model>;
  create: (data: ModelDto) => Promise<OkPacket>;
  update: (data: ModelDto) => Promise<OkPacket>;
  delete: (id: number) => Promise<OkPacket>;
}
