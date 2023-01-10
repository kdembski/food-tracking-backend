type CalendarItemBase = {
  id?: number;
  date?: Date;
  recipeId?: number;
  orderedFoodId?: number;
  members?: number[];
  sortOrder?: number;
};
export type CalendarItemDTO = CalendarItemBase & {
  name?: string;
  tags?: string;
};

export type CalendarItemQueryResult = {
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

export type CalendarDayDTO = {
  date: Date;
  items: CalendarItemDTO[];
};
