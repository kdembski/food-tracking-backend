export type BaseCalendarItemDTO = {
  id?: number;
  date?: Date;
  recipeId?: number;
  orderedFoodId?: number;
  name?: string;
  tags?: string;
  members?: number[];
  sortOrder?: number;
};

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

export type CalendarDayDTO = {
  date: Date;
  items: BaseCalendarItemDTO[];
};
