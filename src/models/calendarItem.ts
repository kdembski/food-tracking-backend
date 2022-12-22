import { MemberCalendarItemsController } from "@/controllers/members/memberCalendarItems";
import {
  CalendarItemDTO,
  ICalendarItem,
} from "@/interfaces/calendar/calendarItem";

export class CalendarItem implements ICalendarItem {
  private _id?: number;
  private _date?: Date;
  private _recipeId?: number;
  private _orderedFoodId?: number;
  private _members?: number[];
  private _sortOrder?: number;

  constructor(data: CalendarItemDTO) {
    this.setFromDTO(data);
  }

  get id() {
    return this._id;
  }

  get date() {
    return this._date;
  }

  get recipeId() {
    return this._recipeId;
  }

  get orderedFoodId() {
    return this._orderedFoodId;
  }

  get members() {
    return this._members;
  }

  get sortOrder() {
    return this._sortOrder;
  }

  set date(value) {
    this._date = value ? new Date(value) : undefined;
  }

  set members(value) {
    this._members = value || [];
  }

  setFromDTO(data: CalendarItemDTO) {
    this._id = data.id;
    this.date = data.date;
    this._recipeId = data.recipeId;
    this._orderedFoodId = data.orderedFoodId;
    this._members = data.members;
    this._sortOrder = data.sortOrder;
  }

  getDTO() {
    return {
      id: this.id,
      date: this.date,
      recipeId: this.recipeId,
      orderedFoodId: this.orderedFoodId,
      members: this.members,
      sortOrder: this.sortOrder,
    };
  }

  async loadMembers() {
    const id = this.id;
    if (!id) {
      return;
    }

    const results = await new MemberCalendarItemsController().getByItemId(id);

    this.members = results
      .map((result) => result.memberId)
      .filter((id): id is number => !!id);
  }
}
