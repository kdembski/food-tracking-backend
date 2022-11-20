import calendarItemQueries from "../../queries/calendar-item.js";
import Database from "../../config/database.js";

export function getRecipeCookedDates(
  recipeId,
  fromDate = new Date(1970, 1, 1),
  toDate = new Date(2070, 1, 1)
) {
  return new Promise((resolve, reject) => {
    Database.sendQuery(calendarItemQueries.selectDatesByRecipeId, [
      recipeId,
      fromDate,
      toDate,
    ])
      .then((results) => {
        resolve(results.map((item) => item.date));
      })
      .catch((error) => reject(error));
  });
}

export function getRecipeLastCookedDate(recipeId) {
  return new Promise((resolve, reject) => {
    this.getRecipeCookedDates(recipeId)
      .then((dates) => {
        const sortedDates = dates.sort((a, b) => b - a);
        resolve(sortedDates[0]);
      })
      .catch((error) => reject(error));
  });
}
