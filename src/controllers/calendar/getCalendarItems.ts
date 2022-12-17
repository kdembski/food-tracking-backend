import { CalendarDay } from "@/interfaces/calendar/calendarDay";
import { CalendarItem } from "@/models/calendarItem";
import { isEqual } from "date-fns";
import { OrderedFood } from "@/models/ordered-food/orderedFood";
import { Recipe } from "@/models/recipes/recipe";
import { CalendarItemsRepository } from "@/repositories/calendarItem";
import { RecipesRepository } from "@/repositories/recipes/recipes";
import { OrderedFoodRepository } from "@/repositories/orderedFood";

export class GetCalendarItemsController {
  async getCalendarItems(fromDate: Date, toDate: Date, members?: number[]) {
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
  }

  private async getCalendarItemRecipeData(recipeId: number) {
    const recipeDto = await new RecipesRepository().selectById(recipeId);
    const recipe = new Recipe(recipeDto);

    return {
      isRecipe: true,
      recipeId: recipe.id,
      name: recipe.recipeName,
      tags: recipe.tags,
    };
  }

  private async getCalendarItemOrderedFoodData(orderedFoodId: number) {
    const orderedFoodDto = await new OrderedFoodRepository().selectById(
      orderedFoodId
    );
    const orderedFood = new OrderedFood(orderedFoodDto);

    return {
      isOrderedFood: true,
      orderedFoodId: orderedFood.id,
      name: orderedFood.foodName,
      tags: orderedFood.tags,
    };
  }
}