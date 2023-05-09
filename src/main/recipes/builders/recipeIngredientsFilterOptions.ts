import { recipeIngredientsFilterOption } from "../models/recipeIngredientsFilterOption";

export class recipeIngredientsFilterOptionBuilder {
  options: recipeIngredientsFilterOption[] = [];

  build(stringifiedIds: string[]) {
    const splittedIds = this.splitIds(stringifiedIds);
    this.options = this.countIds(splittedIds).sort((a, b) => b.count - a.count);

    return this;
  }

  private countIds(ids: string[]) {
    return ids.reduce((accum: recipeIngredientsFilterOption[], id) => {
      const duplicateIndex = accum.findIndex(
        (option: recipeIngredientsFilterOption) => option.id === parseInt(id)
      );
      const isDuplicate = duplicateIndex !== -1;

      if (isDuplicate) {
        accum[duplicateIndex].count++;
        return accum;
      }

      accum.push(new recipeIngredientsFilterOption(parseInt(id)));
      return accum;
    }, []);
  }

  private splitIds(stringifiedIds: string[]) {
    return stringifiedIds.flatMap((ids) => {
      return ids.split(",");
    });
  }
}
