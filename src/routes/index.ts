import { RoutesBuilder } from "./main";
import { CalendarItemsRoutesBuilder } from "./calendar/calendarItems";
import { OrderedFoodRoutesBuilder } from "./ordered-food/orderedFood";
import { UsersRoutesBuilder } from "./users";
import { IngredientCategoriesRoutesBuilder } from "./ingredients/ingredientCategories";
import { UnitsRoutesBuilder } from "./ingredients/units";
import { IngredientsRoutesBuilder } from "./ingredients/ingredients";
import { RecipeIngredientsRoutesBuilder } from "./recipes/recipeIngredients";
import { RecipesRoutesBuilder } from "./recipes/recipes";
import { ShoppingListsRoutesBuilder } from "./shopping/shoppingLists";
import { ShoppingItemsRoutesBuilder } from "./shopping/shoppingItems";
import { ShoppingCustomItemsRoutesBuilder } from "./shopping/shoppingCustomItem";
import { MembersRoutesBuilder } from "./members";

export function useRouter() {
  const subRoutesBuilders = [
    new CalendarItemsRoutesBuilder(),
    new OrderedFoodRoutesBuilder(),
    new UsersRoutesBuilder(),
    new MembersRoutesBuilder(),
    new IngredientCategoriesRoutesBuilder(),
    new UnitsRoutesBuilder(),
    new IngredientsRoutesBuilder(),
    new RecipeIngredientsRoutesBuilder(),
    new RecipesRoutesBuilder(),
    new ShoppingListsRoutesBuilder(),
    new ShoppingItemsRoutesBuilder(),
    new ShoppingCustomItemsRoutesBuilder(),
  ];

  const routesBuilder = new RoutesBuilder(subRoutesBuilders);
  routesBuilder.build();

  return { router: routesBuilder.router };
}
