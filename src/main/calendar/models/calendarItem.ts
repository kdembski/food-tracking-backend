import { MemberCalendarItemsController } from "@/main/members/controllers/memberCalendarItems";
import { ICalendarItem } from "@/interfaces/calendar/calendarItem";
import { BaseCalendarItemDTO } from "../dtos/baseCalendarItem";

export class CalendarItem implements ICalendarItem {
  private _id?: number;
  private _date?: Date;
  private _recipeId?: number;
  private _orderedFoodId?: number;
  private _name?: string;
  private _tags?: string;
  private _members?: number[];
  private _sortOrder?: number;

  constructor(data: BaseCalendarItemDTO) {
    this._id = data.id;
    this._date = data.date ? new Date(data.date) : undefined;
    this._recipeId = data.recipeId;
    this._orderedFoodId = data.orderedFoodId;
    this._name = data.name;
    this._tags = data.tags;
    this._members = data.members;
    this._sortOrder = data.sortOrder;
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

  get name() {
    return this._name;
  }

  get tags() {
    return this._tags;
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
