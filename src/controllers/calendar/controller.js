import calendarQueries from "../../queries/calendar.js";
import Database from "../../config/database.js";
import { getCalendar } from "./get-calendar.js";
import RecipeController from "../recipe.js";
import OrderedFoodController from "../ordered-food.js";
import { convertKeysToCamelCase } from "../../utils/convert-keys-to-camel-case.js";
import { getRecipeCookedDates, getRecipeLastCookedDate } from "./recipe.js";
import {
  getOrderedFoodOrderDates,
  getOrderedFoodLastOrderDate,
} from "./ordered-food.js";

class CalendarController {
  static getCalendarDate(id) {
    return new Promise((resolve, reject) => {
      Database.sendQuery(calendarQueries.selectById, [id])
        .then((results) => {
          resolve(convertKeysToCamelCase(results[0]));
        })
        .catch((error) => reject(error));
    });
  }

  static addDateToCalendar(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const results = await Database.sendQuery(calendarQueries.insert, [
          data.date,
          data.recipeId,
          data.orderedFoodId,
          data.portions,
          data.sortOrder,
        ]);
        resolve(results);

        this.updateAddedItemDate(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static updateDateInCalendar(id, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const results = await Database.sendQuery(calendarQueries.update, [
          data.date,
          data.recipeId,
          data.orderedFoodId,
          data.portions,
          data.sortOrder,
          id,
        ]);
        resolve(results);

        this.updateAddedItemDate(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static deleteDateFromCalendar(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const itemData = await this.getCalendarDate(id);
        const results = await Database.sendQuery(calendarQueries.delete, [id]);
        resolve(results);

        this.updateAddedItemDate(itemData);
      } catch (error) {
        reject(error);
      }
    });
  }

  static updateAddedItemDate(data) {
    if (data.recipeId) {
      RecipeController.updateRecipeCookedDate(data.recipeId);
    }
    if (data.orderedFoodId) {
      OrderedFoodController.updateOrderedFoodOrderDate(data.orderedFoodId);
    }
  }

  static getCalendar = getCalendar;
  static getRecipeCookedDates = getRecipeCookedDates;
  static getRecipeLastCookedDate = getRecipeLastCookedDate;
  static getOrderedFoodOrderDates = getOrderedFoodOrderDates;
  static getOrderedFoodLastOrderDate = getOrderedFoodLastOrderDate;
}

export default CalendarController;
