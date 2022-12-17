import { OkPacket } from "mysql2";

export interface ICalendarItemMembersController {
  addCalendarItemToMembers: (
    itemId: number,
    memberIds: number[]
  ) => Promise<OkPacket[]>;
  removeCalendarItemFromMembers: (
    itemId: number,
    memberIds: number[]
  ) => Promise<OkPacket[]>;
  updateCalendarItemForMembers: (
    itemId: number,
    memberIds: number[]
  ) => Promise<OkPacket[]>;
}
