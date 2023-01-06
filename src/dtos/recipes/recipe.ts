export type RecipeDTO = {
  id?: number;
  recipeName?: string;
  preparationTime?: number;
  tags?: string;
  kcal?: number;
  cookedDate?: Date;
  cookidooLink?: string;
  getFromLastYear?: Date[][];
};
