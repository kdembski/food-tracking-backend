class CalendarItem {
  constructor(date, recipeId, orderedFoodId, members, sortOrder) {
    this.date = date;
    this.recipeId = recipeId;
    this.orderedFoodId = orderedFoodId;
    this.members = members;
    this.sortOrder = sortOrder;
  }

  getValues() {
    return [this.date, this.recipeId, this.orderedFoodId, this.sortOrder];
  }
}

export default CalendarItem;
