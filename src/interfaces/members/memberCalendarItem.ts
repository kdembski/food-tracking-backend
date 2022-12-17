import { MemberCalendarItem } from "@/models/members/memberCalendarItem";
import { OkPacket } from "mysql2";

export type MemberCalendarItemDTO = {
  id?: number;
  itemId?: number;
  memberId?: number;
};

export interface IMemberCalendarItem {
  setFromDTO: (data: MemberCalendarItemDTO) => void;
  getDTO: () => MemberCalendarItemDTO;
}

export interface IMemberCalendarItemsRepository {
  selectByItemId: (itemId: number) => Promise<MemberCalendarItemDTO[]>;
  selectByMemberId: (memberId: number) => Promise<MemberCalendarItemDTO[]>;
  insert: (data: MemberCalendarItem) => Promise<OkPacket>;
  delete: (id: number) => Promise<OkPacket>;
  deleteByMemberIdAndItemId: (
    itemId: number,
    memberId: number
  ) => Promise<OkPacket>;
}

export interface IMemberCalendarItemsController {
  getMemberCalendarItemsByItemId: (
    itemId: number
  ) => Promise<MemberCalendarItem[]>;
  getMemberCalendarItemsByMemberId: (
    memberId: number
  ) => Promise<MemberCalendarItem[]>;
}
