import Database from "../../config/database.js";
import RecipeController from "./../recipe.js";
import OrderedFoodController from "./../ordered-food.js";
import calendarQueries from "../../queries/calendar.js";
import { isEqual } from "date-fns";
import lodash from "lodash";
import { convertKeysToCamelCase } from "../../utils/convert-keys-to-camel-case.js";

export const getCalendar = (fromDate, toDate) => {
  return new Promise((resolve, reject) => {
    Database.sendQuery(calendarQueries.select, [fromDate, toDate])
      .then(async (items) => {
        resolve(await mergeItemsWithSameDate(items));
      })
      .catch((error) => reject(error));
  });
};

const mergeItemsWithSameDate = async (items) => {
  const mergedItems = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const mergedItem = mergedItems.find((mergedItem) =>
      isEqual(mergedItem.date, item.date)
    );
    const calendarItem = await getCalendarItem(
      lodash.cloneDeep(convertKeysToCamelCase(item))
    );

    if (mergedItem) {
      mergedItem.items.push(calendarItem);
      continue;
    }

    mergedItems.push({
      date: item.date,
      items: [calendarItem],
    });
  }

  return mergedItems;
};

const getCalendarItem = async (item) => {
  delete item.date;

  if (item.recipeId) {
    delete item.orderedFoodId;
    const recipe = await RecipeController.getRecipeById(item.recipeId);

    return {
      ...item,
      isRecipe: true,
      name: recipe.recipeName,
      tags: recipe.tags,
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
  };
};
