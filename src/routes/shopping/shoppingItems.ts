import { ApiError } from "@/base/errors/models/apiError";
import { ShoppingItemDTO } from "@/dtos/shopping/shoppingItems";
import { RequestParamsHelper } from "@/helpers/requestParams";
import { ShoppingItemsController } from "@/main/shopping/controllers/shoppingItems";
import { ShoppingItemsCollectionController } from "@/main/shopping/controllers/shoppingItemsCollection";
import { ShoppingItemMapper } from "@/mappers/shopping/shoppingItem";
import { Router } from "express";

const shoppingItemsRouter = Router();
const shoppingItemsController = new ShoppingItemsController();
const shoppingItemsCollectionController =
  new ShoppingItemsCollectionController();

shoppingItemsRouter.get("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const shoppingItem = await shoppingItemsController.getById(id);
    const dto = new ShoppingItemMapper().toDTO(shoppingItem);
    response.json(dto);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingItemsRouter.post("/", async (request, response) => {
  try {
    const data: ShoppingItemDTO = request.body;
    const shoppingItem = new ShoppingItemMapper().toDomain(data);

    const results = await shoppingItemsController.create(shoppingItem);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingItemsRouter.post("/recipes", async (request, response) => {
  try {
    const {
      shoppingListId,
      recipeId,
      portions,
    }: { shoppingListId: number; recipeId: number; portions: number } =
      request.body;

    const results =
      await shoppingItemsCollectionController.createFromRecipeIngredients(
        shoppingListId,
        recipeId,
        portions
      );

    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingItemsRouter.put("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;
    const data: ShoppingItemDTO = request.body;
    data.id = id;

    const shoppingItem = new ShoppingItemMapper().toDomain(data);

    const results = await shoppingItemsController.update(shoppingItem);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingItemsRouter.put("/:id/set-checked", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;
    const isChecked: boolean = request.body?.isChecked;

    const results = await shoppingItemsController.updateIsChecked(
      id,
      isChecked
    );
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingItemsRouter.put("/:id/set-removed", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;
    const isRemoved: boolean = request.body.isRemoved;

    const results = await shoppingItemsController.updateIsRemoved(
      id,
      isRemoved
    );
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingItemsRouter.delete("/:id", async (request, response) => {
  try {
    const id = new RequestParamsHelper(request.params).id;

    const results = await shoppingItemsController.delete(id);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

shoppingItemsRouter.delete("/recipes/:id", async (request, response) => {
  try {
    const recipeId = new RequestParamsHelper(request.params).id;

    const results = await shoppingItemsController.deleteByRecipeId(recipeId);
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default shoppingItemsRouter;
