import calendarQueries from "../../queries/calendar.js";
import Database from "../../config/database.js";
import { getCalendar } from "./get-calendar.js";
import RecipeController from "../recipe.js";

class CalendarController {
  static getCalendar(fromDate, toDate) {
    return getCalendar(fromDate, toDate);
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

        if (data.recipeId) {
          await RecipeController.updateRecipeCookedDate(data.recipeId);
        }
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

        if (data.recipeId) {
          await RecipeController.updateRecipeCookedDate(data.recipeId);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  static getRecipeLastCookedDate(recipeId) {
    return new Promise((resolve, reject) => {
      Database.sendQuery(calendarQueries.selectDatesByRecipeId, [recipeId])
        .then((results) => {
          const dates = results.sort((a, b) => b.date - a.date);
          resolve(dates[0]?.date);
        })
        .catch((error) => reject(error));
    });
  }

  static getOrderedFoodLastOrderDate(orderedFoodId) {
    return new Promise((resolve, reject) => {
      Database.sendQuery(calendarQueries.selectDatesByOrderedFoodId, [
        orderedFoodId,
      ])
        .then((results) => {
          const dates = results.sort((a, b) => b.date - a.date);
          resolve(dates[0]?.date);
        })
        .catch((error) => reject(error));
    });
  }
}

export default CalendarController;
