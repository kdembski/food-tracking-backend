import { MemberCalendarItemDTO } from "@/dtos/members/memberCalendarItem";
import { MemberCalendarItem } from "@/main/members/models/memberCalendarItem";
import { OkPacket } from "mysql2";
import { IDbEntityController, IRepository } from "../base/dbEntity";

export interface IMemberCalendarItem {}

export interface IMemberCalendarItemsRepository
  extends IRepository<MemberCalendarItem, MemberCalendarItemDTO> {
  selectByItemId: (itemId: number) => Promise<MemberCalendarItemDTO[]>;
  selectByMemberId: (memberId: number) => Promise<MemberCalendarItemDTO[]>;
  deleteByMemberIdAndItemId: (
    itemId: number,
    memberId: number
  ) => Promise<OkPacket>;
}

export interface IMemberCalendarItemsController
  extends IDbEntityController<MemberCalendarItem, MemberCalendarItemDTO> {
  getByItemId: (itemId: number) => Promise<MemberCalendarItem[]>;
  getByMemberId: (memberId: number) => Promise<MemberCalendarItem[]>;
}
