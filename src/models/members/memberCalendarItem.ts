import {
  IMemberCalendarItem,
  MemberCalendarItemDTO,
} from "@/interfaces/members/memberCalendarItem";

export class MemberCalendarItem implements IMemberCalendarItem {
  private _id?: number;
  private _itemId?: number;
  private _memberId?: number;

  constructor(data: MemberCalendarItemDTO) {
    this.setFromDTO(data);
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

  setFromDTO(data: MemberCalendarItemDTO) {
    this._id = data.id;
    this._itemId = data.itemId;
    this._memberId = data.memberId;
  }

  getDTO() {
    return {
      id: this.id,
      itemId: this.itemId,
      memberId: this.memberId,
    };
  }
}
