import { MemberCalendarItemDTO } from "@/dtos/members/memberCalendarItem";

export class MemberCalendarItem {
  private _id?: number;
  private _itemId?: number;
  private _memberId?: number;

  constructor(data: MemberCalendarItemDTO) {
    this._id = data.id;
    this._itemId = data.itemId;
    this._memberId = data.memberId;
  }

  get id() {
    return this._id;
  }

  get itemId() {
    return this._itemId;
  }

  get memberId() {
    return this._memberId;
  }
}
