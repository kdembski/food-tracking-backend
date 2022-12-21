import { OrderedFoodController } from "@/controllers/orderedFood";
import { RecipesController } from "@/controllers/recipes/recipes";
import { CalendarDay } from "@/interfaces/calendar/calendarDay";
import { CalendarItem } from "@/models/calendarItem";
import { isEqual } from "date-fns";
import { CalendarItemsRepository } from "@/repositories/calendarItems";

export class GetCalendarItemsController {
  async getDays(fromDate: Date, toDate: Date, members?: number[]) {
    const dtos = await new CalendarItemsRepository().selectAll(
      fromDate,
      toDate
    );
    const calendarItems = dtos.map((dto) => new CalendarItem(dto));
    const filteredItems = await this.filterByMembers(calendarItems, members);
    const calendarDays = await this.mergeItemsWithSameDate(filteredItems);
    return calendarDays;
  }

  private filterByMembers = async (
    items: CalendarItem[],
    members?: number[]
  ) => {
    const promises = items.map((item) => item.loadMembers());
    await Promise.all(promises);

    if (!members) {
      return items;
    }

    return items.filter((item) => {
      return members.some((id) => item.members?.includes(id));
    });
  };

  private mergeItemsWithSameDate = async (items: CalendarItem[]) => {
    const calendarDays: CalendarDay[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (!item?.date) {
        continue;
      }

      const day = this.getCalendarDayByDate(calendarDays, item.date);
      const preparedItem = await this.getPreparedItemData(item);

      if (!preparedItem) {
        throw Error("Failed to prepare calendar item");
      }

      if (day) {
        day.items.push(preparedItem);
        continue;
      }

      calendarDays.push({
        date: item.date,
        items: [preparedItem],
      });
    }

    return calendarDays;
  };

  private getCalendarDayByDate(calendarDays: CalendarDay[], date: Date) {
    return calendarDays.find((day) => isEqual(day.date, date));
  }

  private async getPreparedItemData(item: CalendarItem) {
    const data = {
      id: item.id,
      sortOrder: item.sortOrder,
      members: item.members,
    };

    if (item.recipeId) {
      return {
        ...data,
        ...(await this.getCalendarItemRecipeData(item.recipeId)),
      };
    }

    if (item.orderedFoodId) {
      return {
        ...data,
        ...(await this.getCalendarItemOrderedFoodData(item.orderedFoodId)),
      };
    }

    return;
  }

  private async getCalendarItemRecipeData(recipeId: number) {
    const recipe = await new RecipesController().getById(recipeId);

    return {
      isRecipe: true,
      recipeId: recipe.id,
      name: recipe.recipeName,
      tags: recipe.tags,
    };
  }

  private async getCalendarItemOrderedFoodData(orderedFoodId: number) {
    const orderedFood = await new OrderedFoodController().getById(
      orderedFoodId
    );

    return {
      isOrderedFood: true,
      orderedFoodId: orderedFood.id,
      name: orderedFood.foodName,
      tags: orderedFood.tags,
    };
  }
}
