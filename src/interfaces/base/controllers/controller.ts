import { OkPacket } from "mysql2";

export interface IController<ModelDto> {
  create: (data: ModelDto) => Promise<OkPacket>;
  update: (data: ModelDto) => Promise<OkPacket>;
  delete: (id: number) => Promise<OkPacket>;
}
