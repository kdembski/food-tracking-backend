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
