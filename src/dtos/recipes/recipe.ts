export type RecipeDTO = {
  id?: number;
  recipeName?: string;
  preparationTime?: number;
  tags?: string;
  kcal?: number;
  cookedDate?: Date;
  cookidooLink?: string;
  datesFromLastYear?: Date[][];
};

export type RecipeQueryResult = {
  id?: number;
  recipeName?: string;
  preparationTime?: number;
  tags?: string;
  kcal?: number;
  cookedDate?: Date;
  cookidooLink?: string;
};

export type RecipePayload = {
  id?: number;
  recipeName?: string;
  preparationTime?: number;
  tags?: string;
  kcal?: number;
  cookedDate?: Date;
  cookidooLink?: string;
};
