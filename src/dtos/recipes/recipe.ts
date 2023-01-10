export type RecipeBase = {
  id?: number;
  recipeName?: string;
  preparationTime?: number;
  tags?: string;
  cookidooLink?: string;
};

export type RecipeDTO = RecipeBase;

export type ExtendedRecipeDTO = RecipeBase & {
  kcal?: number;
  cookedDate?: Date;
  datesFromLastYear?: Date[][];
};
