export type ExtendedCalendarItemDTO = {
  id?: number;
  date?: Date;
  recipeId?: number;
  recipeName?: string;
  recipeTags?: string;
  orderedFoodId?: number;
  orderedFoodName?: string;
  orderedFoodTags?: string;
  sortOrder?: number;
};
