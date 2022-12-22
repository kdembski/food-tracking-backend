import { MemberCalendarItem } from "@/models/members/memberCalendarItem";
import { OkPacket } from "mysql2";
import {
  IDbEntityController,
  IDbEntityModel,
  IRepository,
} from "../base/dbEntity";

export type MemberCalendarItemDTO = {
  id?: number;
  itemId?: number;
  memberId?: number;
};

export interface IMemberCalendarItem
  extends IDbEntityModel<MemberCalendarItemDTO> {}

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
