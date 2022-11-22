import calendarItemQueries from "../../queries/calendar-item.js";
import CalendarItem from "../../models/calendar-item.js";
import Database from "../../config/database.js";
import { getCalendarItems } from "./get-calendar-items.js";
import RecipeController from "../recipe.js";
import OrderedFoodController from "../ordered-food.js";
import { convertKeysToCamelCase } from "../../utils/convert-keys-to-camel-case.js";
import { getRecipeCookedDates, getRecipeLastCookedDate } from "./recipe.js";
import {
  getOrderedFoodOrderDates,
  getOrderedFoodLastOrderDate,
} from "./ordered-food.js";
import {
  addCalendarItemToMembers,
  updateCalendarItemForMembers,
} from "./member-calendar-item.js";

class CalendarItemController {
  static getCalendarItem(id) {
    return new Promise((resolve, reject) => {
      Database.sendQuery(calendarItemQueries.selectById, [id])
        .then((results) => {
          resolve(convertKeysToCamelCase(results[0]));
        })
        .catch((error) => reject(error));
    });
  }

  static addCalendarItem(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const item = new CalendarItem(
          data.date,
          data.recipeId,
          data.orderedFoodId,
          data.members,
          data.sortOrder
        );

        const results = await Database.sendQuery(
          calendarItemQueries.insert,
          item.getValues()
        );
        await addCalendarItemToMembers(results.insertId, item.members);
        resolve(results);

        this.updateLinkedDates(item);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  static updateCalendarItem(id, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const item = new CalendarItem(
          data.date,
          data.recipeId,
          data.orderedFoodId,
          data.members,
          data.sortOrder
        );

        const results = await Database.sendQuery(calendarItemQueries.update, [
          ...item.getValues(),
          id,
        ]);
        resolve(results);

        this.updateLinkedDates(item);
      } catch (error) {
        reject(error);
      }
    });
  }

  static deleteCalendarItem(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const itemData = await this.getCalendarItem(id);
        const results = await Database.sendQuery(calendarItemQueries.delete, [
          id,
        ]);
        resolve(results);

        this.updateLinkedDates(itemData);
      } catch (error) {
        reject(error);
      }
    });
  }

  static updateLinkedDates(data) {
    if (data.recipeId) {
      RecipeController.updateRecipeCookedDate(data.recipeId);
    }
    if (data.orderedFoodId) {
      OrderedFoodController.updateOrderedFoodOrderDate(data.orderedFoodId);
    }
  }

  static getCalendarItems = getCalendarItems;

  static getRecipeCookedDates = getRecipeCookedDates;
  static getRecipeLastCookedDate = getRecipeLastCookedDate;

  static getOrderedFoodOrderDates = getOrderedFoodOrderDates;
  static getOrderedFoodLastOrderDate = getOrderedFoodLastOrderDate;

  static updateCalendarItemForMembers = updateCalendarItemForMembers;
}

export default CalendarItemController;
