import { ApiError } from "@/base/errors/models/apiError";
import { RequestParamsHelper } from "@/helpers/requestParams";
import { ShoppingItemsController } from "@/main/shopping/controllers/shoppingItems";
import { ShoppingItemMapper } from "@/mappers/shopping/shoppingItem";
import { Router } from "express";

const shoppingListsRouter = Router();
const shoppingItemsController = new ShoppingItemsController();

shoppingListsRouter.get("/:id/items", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const shoppingItems =
      await shoppingItemsController.getNotRemovedByShoppingListId(id);
    const dto = shoppingItems.map((shoppingItem) =>
      new ShoppingItemMapper().toDTO(shoppingItem)
    );

    response.json(dto);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default shoppingListsRouter;
