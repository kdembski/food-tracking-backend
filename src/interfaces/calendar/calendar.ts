export type CalendarDay = {
  date: Date;
  items: {
    id?: number;
    recipeId?: number;
    orderedFoodId?: number;
    sortOrder?: number;
    isRecipe?: boolean;
    isOrderedFood?: boolean;
    name?: string;
    tags?: string;
    members?: number[];
  }[];
};
