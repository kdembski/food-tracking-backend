import { Recipe } from "@/main/recipes/models/recipe";
import { ICalendarItemChildAdapter } from "@/interfaces/calendar/calendarItemChildAdapter";
import { CustomError } from "@/base/errors/models/customError";
import { RecipesController } from "@/main/recipes/controllers/recipes";

export class CalendarItemRecipeAdapter
  implements ICalendarItemChildAdapter<Recipe>
{
  private _item?: Recipe;
  private _itemId: number;

  constructor(itemId: number) {
    this._itemId = itemId;
  }

  async loadItem() {
    this.item = await new RecipesController().getById(this._itemId);
  }

  async updateItem() {
    await new RecipesController().update(this.item);
  }

  get item() {
    if (!this._item) {
      throw new CustomError({
        message: "Calendar child adapter item not loaded",
      });
    }

    return this._item;
  }

  set item(value) {
    this._item = value;
  }

  getDate() {
    return this.item.cookedDate;
  }

  setDate(date: Date): void {
    this.item.cookedDate = date;
  }
}
