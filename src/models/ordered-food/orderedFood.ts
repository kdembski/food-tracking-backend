import { CalendarItemOrderedFoodController } from "@/controllers/calendar/calendarItemOrderedFood";
import { IOrderedFood, OrderedFoodDTO } from "@/interfaces/orderedFood";
import { isEqual } from "date-fns";
import { OrderedFoodRepository } from "@/repositories/orderedFood";

export class OrderedFood implements IOrderedFood {
  private _id?: number;
  private _foodName?: string;
  private _placeName?: string;
  private _tags?: string;
  private _placeLink?: string;
  private _orderedDate?: Date;

  constructor(data: OrderedFoodDTO) {
    this.setFromDTO(data);
  }

  get id() {
    return this._id;
  }

  get foodName() {
    return this._foodName;
  }

  get placeName() {
    return this._placeName;
  }

  get tags() {
    return this._tags;
  }

  get placeLink() {
    return this._placeLink;
  }

  get orderedDate() {
    return this._orderedDate;
  }

  set orderedDate(value) {
    this._orderedDate = value ? new Date(value) : undefined;
  }

  setFromDTO(data: OrderedFoodDTO) {
    this._id = data.id;
    this._foodName = data.foodName;
    this._placeName = data.placeName;
    this._tags = data.tags;
    this._placeLink = data.placeLink;
    this.orderedDate = data.orderedDate;
  }

  getDTO() {
    return {
      id: this.id,
      foodName: this.foodName,
      placeName: this.placeName,
      tags: this.tags,
      placeLink: this.placeLink,
      orderedDate: this.orderedDate,
    };
  }

  async updateOrderedDate() {
    if (!this.id) {
      return;
    }

    const orderedFoodRepositiory = new OrderedFoodRepository();
    const orderedFoodDTO = await orderedFoodRepositiory.selectById(this.id);

    if (!orderedFoodDTO) {
      return;
    }

    await this.setFromDTO(orderedFoodDTO);
    const lastDate = await new CalendarItemOrderedFoodController().getLastDate(
      this.id
    );

    if (this.orderedDate && lastDate && isEqual(lastDate, this.orderedDate)) {
      return;
    }

    this.orderedDate = lastDate;
    await orderedFoodRepositiory.update(this);
  }
}
