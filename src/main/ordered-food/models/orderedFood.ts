import { OrderedFoodDTO } from "@/dtos/ordered-food/orderedFood";
import { IOrderedFood } from "@/interfaces/orderedFood";

export class OrderedFood implements IOrderedFood {
  private _id?: number;
  private _foodName?: string;
  private _placeName?: string;
  private _tags?: string;
  private _placeLink?: string;
  private _orderedDate?: Date;

  constructor(data: OrderedFoodDTO) {
    this._id = data.id;
    this._foodName = data.foodName;
    this._placeName = data.placeName;
    this._tags = data.tags;
    this._placeLink = data.placeLink;
    this.orderedDate = data.orderedDate;
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
}
