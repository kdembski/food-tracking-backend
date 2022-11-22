import Database from "../../config/database.js";
import RecipeController from "../recipe.js";
import OrderedFoodController from "../ordered-food.js";
import calendarQueries from "../../queries/calendar-item.js";
import { isEqual } from "date-fns";
import lodash from "lodash";
import { convertKeysToCamelCase } from "../../utils/convert-keys-to-camel-case.js";
import MemberCalendarItemController from "../member-calendar-item.js";

export const getCalendarItems = (fromDate, toDate) => {
  return new Promise((resolve, reject) => {
    Database.sendQuery(calendarQueries.select, [fromDate, toDate])
      .then(async (items) => {
        resolve(await mergeItemsWithSameDate(items));
      })
      .catch((error) => reject(error));
  });
};

const mergeItemsWithSameDate = async (items) => {
  const calendarDays = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const day = calendarDays.find((day) => isEqual(day.date, item.date));
    const preparedItem = await prepareCalendarItem(
      lodash.cloneDeep(convertKeysToCamelCase(item))
    );

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

const prepareCalendarItem = async (item) => {
  delete item.date;
  const members = await getItemMembers(item);

  if (item.recipeId) {
    delete item.orderedFoodId;
    const recipe = await RecipeController.getRecipeById(item.recipeId);

    return {
      ...item,
      isRecipe: true,
      name: recipe.recipeName,
      tags: recipe.tags,
      members,
    };
  }

  delete item.recipeId;
  const orderedFood = await OrderedFoodController.getOrderedFoodById(
    item.orderedFoodId
  );

  return {
    ...item,
    isOrderedFood: true,
    name: orderedFood.foodName,
    tags: orderedFood.tags,
    members,
  };
};

const getItemMembers = async (item) => {
  const results =
    await MemberCalendarItemController.getMemberCalendarItemsByItemId(item.id);
  return results.map((result) => result.memberId);
};
