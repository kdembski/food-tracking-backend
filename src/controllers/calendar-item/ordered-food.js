import calendarItemQueries from "../../queries/calendar-item.js";
import Database from "../../config/database.js";

export function getOrderedFoodOrderDates(
  orderedFoodId,
  fromDate = new Date(1970, 1, 1),
  toDate = new Date(2070, 1, 1)
) {
  return new Promise((resolve, reject) => {
    Database.sendQuery(calendarItemQueries.selectDatesByOrderedFoodId, [
      orderedFoodId,
      fromDate,
      toDate,
    ])
      .then((results) => {
        resolve(results.map((item) => item.date));
      })
      .catch((error) => reject(error));
  });
}

export function getOrderedFoodLastOrderDate(orderedFoodId) {
  return new Promise((resolve, reject) => {
    this.getOrderedFoodOrderDates(orderedFoodId)
      .then((dates) => {
        const sortedDates = dates.sort((a, b) => b - a);
        resolve(sortedDates[0]);
      })
      .catch((error) => reject(error));
  });
}
